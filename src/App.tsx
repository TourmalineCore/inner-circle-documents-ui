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
import { PayslipsState } from './features/documents/sections/state/PayslipsState';
import { PayslipsStateContext } from './features/documents/sections/state/PayslipsStateContext';

const WithPrivateRoute = withPrivateRoute(Template);

export default function App() {
  const routesState = useMemo(
    () => new AccessBasedOnPemissionsState(),
    [],
  );

  const payslipsState = useMemo(
    () => new PayslipsState(),
    [],
  );

  return (
    <AccessBasedOnPemissionsStateContext.Provider value={routesState}>
      <PayslipsStateContext.Provider value={payslipsState}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/documents/*"
              element={<WithPrivateRoute />}
            />
          </Routes>
        </BrowserRouter>
      </PayslipsStateContext.Provider>
    </AccessBasedOnPemissionsStateContext.Provider>
  );
}
