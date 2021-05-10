import React, { FC, useMemo } from 'react';
import { index, range } from 'mathjs';

import { useAppContext } from 'utilities/hooks';

interface GeneratedInformationProps {}

export const GeneratedInformation: FC<GeneratedInformationProps> = () => {
  const { generatedDisplacement } = useAppContext();

  const info = useMemo(() => {
    if (typeof generatedDisplacement !== 'undefined') {
      const sampleSize = generatedDisplacement.size()[0];

      const t = generatedDisplacement
        .subset(index(range(0, sampleSize), 0))
        .toArray()
        .flat();
      const travelTime = t[sampleSize - 1] - t[0];

      const startPoint = generatedDisplacement
        .subset(index(0, [1, 2, 3]))
        .toArray() as Array<number>;
      const endPoint = generatedDisplacement
        .subset(index(sampleSize - 1, [1, 2, 3]))
        .toArray() as Array<number>;

      return { sampleSize, travelTime, startPoint, endPoint };
    }
    return {
      sampleSize: 0,
      travelTime: 0,
      startPoint: [0, 0, 0],
      endPoint: [0, 0, 0],
    };
  }, [generatedDisplacement]);

  const enumeratePoint = (point: Array<number>): string =>
    point.reduce((a, c, i) => (i === 0 ? `${c}` : `${a}, ${c}`), '');

  return (
    <div className={'space-y-4'}>
      <p>Sample size: {info.sampleSize}</p>
      <p>Travel time: {info.travelTime}</p>
      <p>{`Start point (x,y,z): ${enumeratePoint(info.startPoint)}`}</p>
      <p>{`End point (x,y,z): ${enumeratePoint(info.endPoint)}`}</p>
    </div>
  );
};
