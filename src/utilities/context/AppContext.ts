import { createContext } from 'react';

type AppContext = {
  zipFile: File | undefined;
  setZipFile: (zipFile: File) => void;
};

const initialAppContext: AppContext = {
  zipFile: undefined,
  setZipFile: () => {},
};

export const AppContext = createContext(initialAppContext);
