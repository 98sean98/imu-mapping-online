import React, { FC, useEffect } from 'react';
import { matrix } from 'mathjs';

import { useAppContext } from 'utilities/hooks';

interface PerformAlgorithmProps {}

export const PerformAlgorithm: FC<PerformAlgorithmProps> = () => {
  const { rotationMatrixData, setGeneratedDisplacement } = useAppContext();

  useEffect(() => {
    if (typeof rotationMatrixData !== 'undefined')
      console.log(rotationMatrixData);
  }, [rotationMatrixData]);

  const onClick = () => {
    // perform algorithm
    setGeneratedDisplacement(matrix([1, 0]));
  };

  return (
    <button className={'button'} onClick={onClick}>
      Run Algorithm
    </button>
  );
};
