export type AlgorithmParameters = {
  shouldCorrectWithBiasRotM: boolean;
  frequency: number;
  assumedConstantVelocity: number;
  biasTimeCutOff: [number, number];
  timeCutOff: [number, number];
};
