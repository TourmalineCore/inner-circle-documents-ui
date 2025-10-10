import {BrowserRouter,
  Routes,
  Route} from 'react-router-dom'

import { useMemo } from 'react'
import { withPrivateRoute } from './common/withPrivateRoute'
import Template from './template/Template'
import { AccessBasedOnPermissionsState } from './routes/state/AccessBasedOnPermissionsState'
import { AccessBasedOnPermissionsStateContext } from './routes/state/AccessBasedOnPermissionsStateContext'
import { PayslipsState } from './features/documents/sections/state/PayslipsState'
import { PayslipsStateContext } from './features/documents/sections/state/PayslipsStateContext'
  
const WithPrivateRoute = withPrivateRoute(Template)

// eslint-disable-next-line import/no-default-export
export default function App() {
  const routesState = useMemo(
    () => new AccessBasedOnPermissionsState(),
    [],
  )

  const payslipsState = useMemo(
    () => new PayslipsState(),
    [],
  )

  return (
    <AccessBasedOnPermissionsStateContext.Provider value={routesState}>
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
    </AccessBasedOnPermissionsStateContext.Provider>
  )
}
