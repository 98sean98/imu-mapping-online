import React, { useEffect, useState } from 'react';
import JSZip from 'jszip';

import { DragAndDropUpload } from 'components/DragAndDropUpload';

import { AppContext } from 'utilities/context';

type UnzippedFile = {
  name: string;
  date: Date;
  content: string;
};

function App() {
  const [zipFile, setZipFile] = useState<File>();
  const [unzippedFiles, setUnzippedFiles] = useState<Array<UnzippedFile>>([]);

  useEffect(() => {
    if (typeof zipFile !== 'undefined') {
      const zip = new JSZip();
      zip.loadAsync(zipFile).then(async (unzipped) => {
        const newUnzippedFiles: Array<UnzippedFile> = await Promise.all(
          Object.values(unzipped.files).map(async (file) => {
            const fileContent = await file.async('text');
            return {
              name: file.name,
              date: file.date,
              content: fileContent,
            };
          }),
        );
        setUnzippedFiles(newUnzippedFiles);
      });
    }
  }, [zipFile]);

  useEffect(() => {
    console.log({ unzippedFiles });
  }, [unzippedFiles]);

  return (
    <AppContext.Provider value={{ zipFile, setZipFile }}>
      <div className={'container mx-auto py-8'}>
        <DragAndDropUpload />
      </div>
    </AppContext.Provider>
  );
}

export default App;
