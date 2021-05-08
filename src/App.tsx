import React, { useState } from 'react';

import { DragAndDropUpload } from 'components/DragAndDropUpload';
import { FileReadingAndDataParsing } from 'components/FileReadingAndDataParsing';
import { PerformAlgorithm } from 'components/PerformAlgorithm';

import { RotationMatrixData } from 'models/RotationMatrixData';

import { AppContext } from 'utilities/context';

function App() {
  const [zipFile, setZipFile] = useState<File>();
  const [
    rotationMatrixData,
    setRotationMatrixData,
  ] = useState<RotationMatrixData>();

  return (
    <AppContext.Provider
      value={{
        zipFile,
        setZipFile,
        rotationMatrixData,
        setRotationMatrixData,
      }}>
      <div className={'container mx-auto py-8'}>
        <DragAndDropUpload />
      </div>
      <FileReadingAndDataParsing />
      <PerformAlgorithm />
    </AppContext.Provider>
  );
}

export default App;
