import React, { FC, useCallback } from 'react';
import {
  index,
  matrix,
  multiply,
  add,
  divide,
  subtract,
  inv,
  zeros,
  range,
  Matrix,
} from 'mathjs';

import { useAppContext } from 'utilities/hooks';

interface PerformAlgorithmProps {}

export const PerformAlgorithm: FC<PerformAlgorithmProps> = () => {
  const {
    rotationMatrixData,
    setGeneratedDisplacement,
    setDataRevision,
    algorithmParameters,
  } = useAppContext();

  const onClick = useCallback(() => {
    if (typeof rotationMatrixData !== 'undefined') {
      // perform algorithm
      const { time, rotationMatrix } = rotationMatrixData;

      // parameters
      const {
        shouldCorrectWithBiasRotM,
        frequency,
        assumedConstantVelocity,
        biasTimeCutOff,
        timeCutOff,
      } = algorithmParameters;

      // obtain rotation matrix for bias correction
      const biasRowIndexCutoff = multiply(biasTimeCutOff, frequency);
      const stationaryRotM = rotationMatrix.slice(
        biasRowIndexCutoff[0],
        biasRowIndexCutoff[1],
      );
      const stationaryRotMSum = stationaryRotM.reduce(
        (accumulator, current) => add(accumulator, current) as Matrix,
        zeros(3, 3),
      );
      const meanStationaryRotM = divide(
        stationaryRotMSum,
        stationaryRotM.length,
      ) as Matrix;
      const inverseMeanStationaryRotM = inv(meanStationaryRotM);
      const biasCorrectionRotM = inverseMeanStationaryRotM.subset(
        index(2, [0, 1, 2]),
        [0, 0, 1],
      );
      console.log({
        meanStationaryRotM,
        inverseMeanStationaryRotM,
        biasCorrectionRotM,
      });

      // remove first and last few seconds of data
      const rowIndexCutOffStart = time.findIndex((t) => t > timeCutOff[0]);
      const rowIndexCutOffEnd = time.findIndex(
        (t) => t > timeCutOff[1],
        rowIndexCutOffStart,
      );
      const slicedTime = time.slice(rowIndexCutOffStart, rowIndexCutOffEnd);
      const slicedRotM = rotationMatrix.slice(
        rowIndexCutOffStart,
        rowIndexCutOffEnd,
      );

      // adjust time due to cut off
      const adjustedTime = subtract(slicedTime, slicedTime[0]) as Array<number>;

      // calculate distance scalars
      const distance = adjustedTime.map((t, index) => {
        const v1 = assumedConstantVelocity,
          v2 = v1;
        const d =
          0.5 * (v1 + v2) * (t - (index > 0 ? adjustedTime[index - 1] : 0));

        return d;
      });

      // propagate position vectors
      const positions: Array<Matrix> = [];
      for (let i = 0; i < slicedRotM.length; i++) {
        if (i === 0) {
          positions.push(matrix([[0], [0], [0]]));
          continue;
        }

        const p1 = positions[i - 1];
        const d = distance[i];
        const R = slicedRotM[i];

        const aggregateRotM = shouldCorrectWithBiasRotM
          ? multiply(biasCorrectionRotM, R)
          : R;

        const travelVector = multiply(aggregateRotM, matrix([[d], [0], [0]]));

        const p2 = add(p1, travelVector) as Matrix;
        positions.push(p2);
      }

      // parse into displacement data
      const displacement = matrix([]);
      for (let i = 0; i < positions.length; i++) {
        const t = adjustedTime[i],
          pArray = positions[i].toArray().flat();
        // flip y-axis data along x = 0
        pArray[1] = -1 * pArray[1];
        const row = matrix([t, ...pArray]);
        displacement.subset(index(i, range(0, 4)), row);
      }

      setGeneratedDisplacement(displacement);
      setDataRevision((current) => current + 1);
    }
  }, [
    rotationMatrixData,
    algorithmParameters,
    setGeneratedDisplacement,
    setDataRevision,
  ]);

  return (
    <>
      {typeof rotationMatrixData !== 'undefined' ? (
        <button className={'button'} onClick={onClick}>
          Run Algorithm
        </button>
      ) : null}
    </>
  );
};
