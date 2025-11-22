import { useSelector,TypedUseSelectorHook } from "react-redux";
import { RootState } from "../Adapter/redux/store";

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
