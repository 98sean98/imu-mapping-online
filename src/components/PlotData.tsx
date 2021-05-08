import React, { FC, useMemo } from 'react';
import Plot from 'react-plotly.js';

import { useAppContext } from 'utilities/hooks';

interface PlotDataProps {}

export const PlotData: FC<PlotDataProps> = () => {
  const { generatedDisplacement } = useAppContext();

  const showPlots = useMemo(
    () => typeof generatedDisplacement !== 'undefined',
    [generatedDisplacement],
  );

  const exampleDisplacement = useMemo(() => {
    const thirdPi = (2 * Math.PI) / 3,
      twoThirdsPi = thirdPi * 2;
    const t = Array(5000)
      .fill(null)
      .map((e, i) => i / 200);
    const x = t.map((e) => Math.sin(e));
    const y = t.map((e) => Math.sin(e + thirdPi));
    const z = t.map((e) => Math.sin(e + twoThirdsPi));
    return { t, x, y, z };
  }, []);

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
                  x: exampleDisplacement.t,
                  y: exampleDisplacement.x,
                  type: 'scatter',
                  mode: 'lines',
                  line: { color: 'red' },
                  name: 'x',
                },
                {
                  x: exampleDisplacement.t,
                  y: exampleDisplacement.y,
                  type: 'scatter',
                  mode: 'lines',
                  line: { color: 'blue' },
                  name: 'y',
                },
                {
                  x: exampleDisplacement.t,
                  y: exampleDisplacement.z,
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
                  x: exampleDisplacement.x,
                  y: exampleDisplacement.y,
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
                  x: exampleDisplacement.x,
                  y: exampleDisplacement.z,
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
                  x: exampleDisplacement.x,
                  y: exampleDisplacement.y,
                  z: exampleDisplacement.z,
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
