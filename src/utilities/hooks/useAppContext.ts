import { useContext } from 'react';
import { AppContext } from 'utilities/context';

export const useAppContext = () => useContext(AppContext);
