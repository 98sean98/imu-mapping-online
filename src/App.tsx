import React, { useState } from 'react';

import { DragAndDropUpload } from 'components/DragAndDropUpload';
import { FileReadingAndDataParsing } from 'components/FileReadingAndDataParsing';
import { PerformAlgorithm } from 'components/PerformAlgorithm';
import { PlotData } from 'components/PlotData';

import { RotationMatrixData } from 'models/RotationMatrixData';
import { Displacement } from 'models/Displacement';

import { AppContext } from 'utilities/context';

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

  return (
    <AppContext.Provider
      value={{
        zipFile,
        setZipFile,
        rotationMatrixData,
        setRotationMatrixData,
        generatedDisplacement,
        setGeneratedDisplacement,
      }}>
      <div className={'container mx-auto py-8 space-y-8'}>
        <DragAndDropUpload />
      </div>
      <FileReadingAndDataParsing />
      <PerformAlgorithm />
      <PlotData />
    </AppContext.Provider>
  );
}

export default App;
