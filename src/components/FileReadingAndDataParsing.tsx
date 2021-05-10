import React, { FC, useEffect, useState } from 'react';
import JSZip from 'jszip';
import { matrix, Matrix } from 'mathjs';
import { useAppContext } from '../utilities/hooks';

interface FileReadingAndDataParsingProps {}

type UnzippedFile = {
  name: string;
  date: Date;
  content: string;
};

export const FileReadingAndDataParsing: FC<FileReadingAndDataParsingProps> = () => {
  const {
    zipFile,
    setRotationMatrixData,
    setGeneratedDisplacement,
  } = useAppContext();

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
    if (typeof unzippedFiles !== 'undefined') {
      const matrixFile = unzippedFiles.find(({ name }) =>
        name.includes('matrix.csv'),
      );
      if (typeof matrixFile !== 'undefined') {
        // remove
        const rowStrings = matrixFile.content.split('\n');
        // remove headers, and the last row which is just an empty string
        rowStrings.splice(0, 1);
        rowStrings.splice(rowStrings.length - 1, 1);
        // parse data
        const time: Array<number> = [];
        const rotationMatrix: Array<Matrix> = [];
        const count = rowStrings.length;
        for (let i = 0; i < count; i++) {
          const rowString = rowStrings.splice(0, 1)[0];
          const row = rowString.split(',').map((e) => parseFloat(e));
          time.push(row.splice(0, 1)[0]);
          const rotationMatrixArray: Array<Array<number>> = [];
          for (let j = 0; j < 3; j++) {
            const matrixRow = row.splice(0, 3);
            rotationMatrixArray.push(matrixRow);
          }
          rotationMatrix.push(matrix(rotationMatrixArray));
        }
        setRotationMatrixData({ time, rotationMatrix });
        // reset generated displacement data to undefined
        setGeneratedDisplacement(undefined);
      }
    }
  }, [unzippedFiles, setRotationMatrixData, setGeneratedDisplacement]);

  return <></>;
};
