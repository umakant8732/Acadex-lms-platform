import { useDispatch, useSelector, useStore } from "react-redux";

// App-level typed dispatch hook.
export const useAppDispatch = useDispatch.withTypes();

// App-level typed selector hook.
export const useAppSelector = useSelector.withTypes();

// Optional typed store hook for advanced cases.
export const useAppStore = useStore.withTypes();
