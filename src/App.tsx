import React, { useState } from 'react';

import { DragAndDropUpload } from 'components/DragAndDropUpload';
import { FileReadingAndDataParsing } from 'components/FileReadingAndDataParsing';
import { PerformAlgorithm } from 'components/PerformAlgorithm';
import { PlotData } from 'components/PlotData';
import { ConfigureAlgorithmParameters } from 'components/ConfigureAlgorithmParameters';
import { GeneratedInformation } from 'components/GeneratedInformation';

import { RotationMatrixData } from 'models/RotationMatrixData';
import { Displacement } from 'models/Displacement';
import { AlgorithmParameters } from 'models/AlgorithmParameters';

import { AppContext } from 'utilities/context';
import { initialAlgorithmParameters } from 'utilities/initial-data/initialAlgorithmParameters';

function App() {
  const [zipFile, setZipFile] = useState<File>();
  const [
    rotationMatrixData,
    setRotationMatrixData,
  ] = useState<RotationMatrixData>();
  const [
    generatedDisplacement,
    setGeneratedDisplacement,
  ] = useState<Displacement>();
  const [dataRevision, setDataRevision] = useState<number>(0);
  const [
    algorithmParameters,
    setAlgorithmParameters,
  ] = useState<AlgorithmParameters>(initialAlgorithmParameters);

  return (
    <AppContext.Provider
      value={{
        zipFile,
        setZipFile,
        rotationMatrixData,
        setRotationMatrixData,
        generatedDisplacement,
        setGeneratedDisplacement,
        dataRevision,
        setDataRevision,
        algorithmParameters,
        setAlgorithmParameters,
      }}>
      <div className={'container mx-auto py-8 space-y-8'}>
        <div className={'space-y-4'}>
          <h3 className={'text-3xl'}>Zip File Upload</h3>
          <DragAndDropUpload />
        </div>
        <div className={'space-y-4'}>
          <h3 className={'text-3xl'}>Algorithm Parameters</h3>
          <ConfigureAlgorithmParameters />
        </div>

        <FileReadingAndDataParsing />

        <div className={'flex justify-center'}>
          <PerformAlgorithm />
        </div>

        {typeof generatedDisplacement !== 'undefined' ? (
          <div className={'space-y-4'}>
            <h3 className={'text-3xl'}>Results</h3>
            <h4 className={'text-xl'}>Information</h4>
            <GeneratedInformation />
            <h4 className={'text-xl'}>Plots</h4>
            <PlotData />
          </div>
        ) : null}
      </div>
    </AppContext.Provider>
  );
}

export default App;
