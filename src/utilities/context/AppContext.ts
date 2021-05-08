import { createContext, Dispatch, SetStateAction } from 'react';

import { RotationMatrixData } from 'models/RotationMatrixData';

type AppContext = {
  zipFile: File | undefined;
  setZipFile: Dispatch<SetStateAction<File | undefined>>;
  rotationMatrixData: RotationMatrixData | undefined;
  setRotationMatrixData: Dispatch<
    SetStateAction<RotationMatrixData | undefined>
  >;
};

const initialAppContext: AppContext = {
  zipFile: undefined,
  setZipFile: () => {},
  rotationMatrixData: undefined,
  setRotationMatrixData: () => {},
};

export const AppContext = createContext(initialAppContext);
