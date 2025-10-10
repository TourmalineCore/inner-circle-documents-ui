import { createContext } from 'react'
import { AccessBasedOnPermissionsState } from './AccessBasedOnPermissionsState'

export const AccessBasedOnPermissionsStateContext = createContext<AccessBasedOnPermissionsState>(null as unknown as AccessBasedOnPermissionsState)
