import React, { useState } from 'react';

import { DragAndDropUpload } from 'components/DragAndDropUpload';

import { AppContext } from 'utilities/context';

function App() {
  const [zipFile, setZipFile] = useState<File>();

  return (
    <AppContext.Provider value={{ zipFile, setZipFile }}>
      <div className={'container mx-auto py-8'}>
        <DragAndDropUpload />
      </div>
    </AppContext.Provider>
  );
}

export default App;
