import React, { FC, useEffect } from 'react';
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
  const { rotationMatrixData, setGeneratedDisplacement } = useAppContext();

  useEffect(() => {
    if (typeof rotationMatrixData !== 'undefined')
      console.log(rotationMatrixData);
  }, [rotationMatrixData]);

  const onClick = () => {
    if (typeof rotationMatrixData !== 'undefined') {
      // perform algorithm
      const { time, rotationMatrix } = rotationMatrixData;

      // parameters
      const shouldCorrectionBiasRotM = true;
      const frequency = 50;
      const assumedConstantVelocity = 0.1334;
      const biasRowIndexCutoff = multiply([0, 30], frequency);
      const timeCutOff = [62.5, 6];

      // obtain rotation matrix for bias correction
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
        (t) => t > time[time.length - 1] - timeCutOff[1],
        rowIndexCutOffStart,
      );
      time.splice(0, rowIndexCutOffStart);
      time.splice(rowIndexCutOffEnd - rowIndexCutOffStart);
      rotationMatrix.splice(0, rowIndexCutOffStart);
      rotationMatrix.splice(rowIndexCutOffEnd - rowIndexCutOffStart);

      // adjust time due to cut off
      const adjustedTime = subtract(time, time[0]) as Array<number>;

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
      for (let i = 0; i < rotationMatrix.length; i++) {
        if (i === 0) {
          positions.push(matrix([[0], [0], [0]]));
          continue;
        }

        const p1 = positions[i - 1];
        const d = distance[i];
        const R = rotationMatrix[i];

        const aggregateRotM = shouldCorrectionBiasRotM
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
    }
  };

  return (
    <button className={'button'} onClick={onClick}>
      Run Algorithm
    </button>
  );
};
