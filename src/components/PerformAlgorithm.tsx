import React, { FC, useEffect } from 'react';

import { useAppContext } from 'utilities/hooks';

interface PerformAlgorithmProps {}

export const PerformAlgorithm: FC<PerformAlgorithmProps> = () => {
  const { rotationMatrixData } = useAppContext();

  useEffect(() => {
    if (typeof rotationMatrixData !== 'undefined')
      console.log(rotationMatrixData);
  }, [rotationMatrixData]);

  return <div />;
};
