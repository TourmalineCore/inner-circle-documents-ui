import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { useMemo } from 'react';
import { withPrivateRoute } from './common/withPrivateRoute';
import Template from './template/Template';
import AccessBasedOnPemissionsState from './routes/state/AccessBasedOnPemissionsState';
import AccessBasedOnPemissionsStateContext from './routes/state/AccessBasedOnPemissionsStateContext';
import { AllDocumentsState } from './features/documents/components/AllDocumentsState/AllDocumentsState';
import { AllDocumentsStateContext } from './features/documents/components/AllDocumentsState/AllDocumentsStateContext';

const WithPrivateRoute = withPrivateRoute(Template);

export default function App() {
  const routesState = useMemo(
    () => new AccessBasedOnPemissionsState(),
    [],
  );

  const documentsState = useMemo(
    () => new AllDocumentsState(),
    [],
  );

  return (
    <AccessBasedOnPemissionsStateContext.Provider value={routesState}>
      <AllDocumentsStateContext.Provider value={documentsState}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/documents/*"
              element={<WithPrivateRoute />}
            />
          </Routes>
        </BrowserRouter>
      </AllDocumentsStateContext.Provider>
    </AccessBasedOnPemissionsStateContext.Provider>
  );
}
