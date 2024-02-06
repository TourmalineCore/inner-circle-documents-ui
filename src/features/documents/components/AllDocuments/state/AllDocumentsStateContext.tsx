import { createContext } from 'react';
import { AllDocumentsState } from './AllDocumentsState';

export const AllDocumentsStateContext = createContext<AllDocumentsState>(null as unknown as AllDocumentsState);
