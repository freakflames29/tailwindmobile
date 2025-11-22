import { useDispatch } from "react-redux";
import { AppDispatch } from "../Adapter/redux/store";

export const useAppDispatch = () => useDispatch<AppDispatch>();

