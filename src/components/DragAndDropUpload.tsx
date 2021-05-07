import React, {
  ChangeEventHandler,
  DragEventHandler,
  FC,
  useState,
} from 'react';

import { useAppContext } from 'utilities/hooks';

interface UploadZipProps {}

export const DragAndDropUpload: FC<UploadZipProps> = () => {
  const { zipFile, setZipFile } = useAppContext();

  const onFileChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    if (event.target.files != null) {
      setZipFile(event.target.files[0]);
    }
  };

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragCounter, setDragCounter] = useState<number>(0);

  const onDragEnter: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
    setDragCounter((dragCounter) => dragCounter + 1);
  };

  const onDragLeave: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const newDragCounter = dragCounter - 1;
    if (newDragCounter === 0) setIsDragging(false);
    setDragCounter(newDragCounter);
  };

  const onDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const onDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.items && event.dataTransfer.items.length > 0) {
      setZipFile(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
      setDragCounter(0);
    }
    setIsDragging(false);
  };

  return (
    <div
      className={
        'w-full h-64 border-2 border-gray-600 border-dashed rounded-lg flex flex-col items-center justify-center text-center relative overflow-hidden'
      }
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}>
      {isDragging ? (
        <div
          className={
            'absolute inset-0 z-10 bg-gray-300 bg-opacity-75 flex items-center justify-center'
          }>
          <p>Drop me!</p>
        </div>
      ) : null}

      <p>
        {typeof zipFile !== 'undefined'
          ? `Chosen ${zipFile.name}`
          : `Drop a .zip file`}{' '}
      </p>

      <div className={'mt-3'}>
        <label
          htmlFor="file"
          className={'text-xs border rounded bg-gray-100 p-2 cursor-pointer'}>
          {typeof zipFile === 'undefined'
            ? `Choose a file`
            : `Choose another file`}
        </label>
        <input
          id="file"
          className={'hidden'}
          type="file"
          onChange={onFileChange}
        />
      </div>
    </div>
  );
};
