import React, { FC, useMemo } from 'react';
import Plot from 'react-plotly.js';
import { index, range, subset } from 'mathjs';

import { useAppContext } from 'utilities/hooks';

interface PlotDataProps {}

export const PlotData: FC<PlotDataProps> = () => {
  const { generatedDisplacement } = useAppContext();

  const showPlots = useMemo(
    () => typeof generatedDisplacement !== 'undefined',
    [generatedDisplacement],
  );

  const parsedDisplacement = useMemo(() => {
    if (typeof generatedDisplacement !== 'undefined') {
      const sampleSize = generatedDisplacement.size()[0];
      const t = subset(generatedDisplacement, index(range(0, sampleSize), 0))
        .toArray()
        .flat();
      const x = subset(generatedDisplacement, index(range(0, sampleSize), 1))
        .toArray()
        .flat();
      const y = subset(generatedDisplacement, index(range(0, sampleSize), 2))
        .toArray()
        .flat();
      const z = subset(generatedDisplacement, index(range(0, sampleSize), 3))
        .toArray()
        .flat();
      return { t, x, y, z };
    }
    return { t: [], x: [], y: [], z: [] };
  }, [generatedDisplacement]);

  return (
    <>
      {showPlots ? (
        <div className={'flex flex-col items-center space-y-8 px-4'}>
          {/* dynamics */}
          <div className={'w-full md:w-4/5 lg:w-3/5'}>
            <Plot
              className={'w-full'}
              config={{ responsive: true }}
              data={[
                {
                  x: parsedDisplacement.t,
                  y: parsedDisplacement.x,
                  type: 'scatter',
                  mode: 'lines',
                  line: { color: 'red' },
                  name: 'x',
                },
                {
                  x: parsedDisplacement.t,
                  y: parsedDisplacement.y,
                  type: 'scatter',
                  mode: 'lines',
                  line: { color: 'blue' },
                  name: 'y',
                },
                {
                  x: parsedDisplacement.t,
                  y: parsedDisplacement.z,
                  type: 'scatter',
                  mode: 'lines',
                  line: { color: 'green' },
                  name: 'z',
                },
              ]}
              layout={{ title: 'Dynamics' }}
            />
          </div>

          {/* 2D map and elevation */}
          <div
            className={
              'w-full lg:flex lg:justify-around space-y-4 lg:space-x-4 lg:space-y-0'
            }>
            <Plot
              className={'w-full'}
              config={{ responsive: true }}
              data={[
                {
                  x: parsedDisplacement.y,
                  y: parsedDisplacement.x,
                  type: 'scatter',
                  line: { color: 'red' },
                },
              ]}
              layout={{ title: '2D Map' }}
            />
            <Plot
              className={'w-full'}
              config={{ responsive: true }}
              data={[
                {
                  x: parsedDisplacement.x,
                  y: parsedDisplacement.z,
                  type: 'scatter',
                  line: { color: 'blue' },
                },
              ]}
              layout={{ title: 'Elevation' }}
            />
          </div>

          <div className={'w-full md:w-4/5 lg:w-3/5'}>
            <Plot
              className={'w-full'}
              config={{ responsive: true }}
              data={[
                {
                  x: parsedDisplacement.x,
                  y: parsedDisplacement.y,
                  z: parsedDisplacement.z,
                  type: 'scatter3d',
                  line: { color: 'red' },
                },
              ]}
              layout={{ title: '3D Map' }}
            />
          </div>
        </div>
      ) : null}
    </>
  );
};
