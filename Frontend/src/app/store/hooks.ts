import { useDispatch, useSelector, useStore } from 'react-redux'

import type { AppDispatch, AppStore, RootState } from './store'

// App-level typed dispatch hook.
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

// App-level typed selector hook.
export const useAppSelector = useSelector.withTypes<RootState>()

// Optional typed store hook for advanced cases.
export const useAppStore = useStore.withTypes<AppStore>()
