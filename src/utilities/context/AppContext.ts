import { createContext, Dispatch, SetStateAction } from 'react';

import { RotationMatrixData } from 'models/RotationMatrixData';
import { Displacement } from 'models/Displacement';

type AppContext = {
  zipFile: File | undefined;
  setZipFile: Dispatch<SetStateAction<File | undefined>>;
  rotationMatrixData: RotationMatrixData | undefined;
  setRotationMatrixData: Dispatch<
    SetStateAction<RotationMatrixData | undefined>
  >;
  generatedDisplacement: Displacement | undefined;
  setGeneratedDisplacement: Dispatch<SetStateAction<Displacement | undefined>>;
};

const initialAppContext: AppContext = {
  zipFile: undefined,
  setZipFile: () => {},
  rotationMatrixData: undefined,
  setRotationMatrixData: () => {},
  generatedDisplacement: undefined,
  setGeneratedDisplacement: () => {},
};

export const AppContext = createContext(initialAppContext);
