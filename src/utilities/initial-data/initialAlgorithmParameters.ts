import { AlgorithmParameters } from 'models/AlgorithmParameters';

export const initialAlgorithmParameters: AlgorithmParameters = {
  shouldCorrectWithBiasRotM: true,
  frequency: 50,
  assumedConstantVelocity: 0.15,
  biasTimeCutOff: [0, 30],
  timeCutOff: [30, 60],
};
