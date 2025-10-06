import { createContext } from 'react'
import { PayslipsState } from './PayslipsState'

export const PayslipsStateContext = createContext<PayslipsState>(null as unknown as PayslipsState)
