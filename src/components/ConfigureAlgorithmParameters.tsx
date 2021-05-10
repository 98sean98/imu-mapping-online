import React, { FC } from 'react';

import { useAppContext } from 'utilities/hooks';

interface ConfigureAlgorithmParametersProps {}

export const ConfigureAlgorithmParameters: FC<ConfigureAlgorithmParametersProps> = () => {
  const { algorithmParameters, setAlgorithmParameters } = useAppContext();

  return (
    <div className={'space-y-4'}>
      <div className={'space-x-2'}>
        <label htmlFor={'shouldCorrectWithBiasRotM'}>
          Should correct with bias rotation matrix
        </label>
        <input
          id={'shouldCorrectWithBiasRotM'}
          type={'checkbox'}
          checked={algorithmParameters.shouldCorrectWithBiasRotM}
          onChange={(e) => {
            setAlgorithmParameters({
              ...algorithmParameters,
              shouldCorrectWithBiasRotM: e.target.checked,
            });
          }}
        />
      </div>

      <div className={'space-x-2'}>
        <label htmlFor={'frequency'}>Data collection frequency</label>
        <input
          id={'frequency'}
          type={'number'}
          min={1}
          max={400}
          value={algorithmParameters.frequency}
          onChange={(e) => {
            setAlgorithmParameters({
              ...algorithmParameters,
              frequency: parseInt(e.target.value),
            });
          }}
          className={'w-40 border border-gray-600 rounded py-1 px-2'}
        />
      </div>

      <div className={'space-x-2'}>
        <label htmlFor={'assumedConstantVelocity'}>
          Assumed constant velocity
        </label>
        <input
          id={'assumedConstantVelocity'}
          type={'number'}
          min={0}
          value={algorithmParameters.assumedConstantVelocity}
          onChange={(e) => {
            setAlgorithmParameters({
              ...algorithmParameters,
              assumedConstantVelocity: parseFloat(e.target.value),
            });
          }}
          className={'w-40 border border-gray-600 rounded py-1 px-2'}
        />
      </div>

      <div>
        <p>Bias time cut off (seconds)</p>
        <div className={'mt-2 flex space-x-4'}>
          <div className={'space-x-2'}>
            <label htmlFor={'biasTimeCutOffStart'}>Start</label>
            <input
              id={'biasTimeCutOffStart'}
              type={'number'}
              min={0}
              value={algorithmParameters.biasTimeCutOff[0]}
              onChange={(e) => {
                setAlgorithmParameters({
                  ...algorithmParameters,
                  biasTimeCutOff: [
                    parseFloat(e.target.value),
                    algorithmParameters.biasTimeCutOff[1],
                  ],
                });
              }}
              className={'w-40 border border-gray-600 rounded py-1 px-2'}
            />
          </div>
          <div className={'space-x-2'}>
            <label htmlFor={'biasTimeCutOffEnd'}>End</label>
            <input
              id={'biasTimeCutOffEnd'}
              type={'number'}
              min={0}
              value={algorithmParameters.biasTimeCutOff[1]}
              onChange={(e) => {
                setAlgorithmParameters({
                  ...algorithmParameters,
                  biasTimeCutOff: [
                    algorithmParameters.biasTimeCutOff[0],
                    parseFloat(e.target.value),
                  ],
                });
              }}
              className={'w-40 border border-gray-600 rounded py-1 px-2'}
            />
          </div>
        </div>
      </div>

      <div>
        <p>Useful data time cut off (seconds)</p>
        <div className={'mt-2 flex space-x-4'}>
          <div className={'space-x-2'}>
            <label htmlFor={'timeCutOffStart'}>Start</label>
            <input
              id={'timeCutOffStart'}
              type={'number'}
              min={0}
              value={algorithmParameters.timeCutOff[0]}
              onChange={(e) => {
                setAlgorithmParameters({
                  ...algorithmParameters,
                  timeCutOff: [
                    parseFloat(e.target.value),
                    algorithmParameters.timeCutOff[1],
                  ],
                });
              }}
              className={'w-40 border border-gray-600 rounded py-1 px-2'}
            />
          </div>
          <div className={'space-x-2'}>
            <label htmlFor={'timeCutOffEnd'}>End</label>
            <input
              id={'timeCutOffEnd'}
              type={'number'}
              min={0}
              value={algorithmParameters.timeCutOff[1]}
              onChange={(e) => {
                setAlgorithmParameters({
                  ...algorithmParameters,
                  timeCutOff: [
                    algorithmParameters.timeCutOff[0],
                    parseFloat(e.target.value),
                  ],
                });
              }}
              className={'w-40 border border-gray-600 rounded py-1 px-2'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
