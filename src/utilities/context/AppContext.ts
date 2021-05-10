import { createContext, Dispatch, SetStateAction } from 'react';

import { RotationMatrixData } from 'models/RotationMatrixData';
import { Displacement } from 'models/Displacement';
import { AlgorithmParameters } from 'models/AlgorithmParameters';
import { Stage } from 'models/Stage';

import { initialAlgorithmParameters } from '../initial-data/initialAlgorithmParameters';

type AppContext = {
  zipFile: File | undefined;
  setZipFile: Dispatch<SetStateAction<File | undefined>>;
  rotationMatrixData: RotationMatrixData | undefined;
  setRotationMatrixData: Dispatch<
    SetStateAction<RotationMatrixData | undefined>
  >;
  generatedDisplacement: Displacement | undefined;
  setGeneratedDisplacement: Dispatch<SetStateAction<Displacement | undefined>>;
  dataRevision: number;
  setDataRevision: Dispatch<SetStateAction<number>>;
  algorithmParameters: AlgorithmParameters;
  setAlgorithmParameters: Dispatch<SetStateAction<AlgorithmParameters>>;
  stage: Stage;
  setStage: Dispatch<SetStateAction<Stage>>;
};

const initialAppContext: AppContext = {
  zipFile: undefined,
  setZipFile: () => {},
  rotationMatrixData: undefined,
  setRotationMatrixData: () => {},
  generatedDisplacement: undefined,
  setGeneratedDisplacement: () => {},
  dataRevision: 0,
  setDataRevision: () => {},
  algorithmParameters: initialAlgorithmParameters,
  setAlgorithmParameters: () => {},
  stage: Stage.NO_DATA,
  setStage: () => {},
};

export const AppContext = createContext(initialAppContext);
