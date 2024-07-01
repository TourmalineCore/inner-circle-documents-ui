import { createContext } from 'react';
import { DocumentsState } from './DocumentsState';

export const DocumentsStateContext = createContext<DocumentsState>(null as unknown as DocumentsState);
