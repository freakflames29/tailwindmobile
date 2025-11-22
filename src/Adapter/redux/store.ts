import {
  combineReducers,
  configureStore,
  createAction,
  Reducer,
} from "@reduxjs/toolkit";
import testSlice from "./slices/testSlice";
import authSlice from "./slices/authSlice";
import logger from 'redux-logger'
// 1. Create a Global Action for clearing
export const clearRedux = createAction("CLEAR_REDUX_STORE");

// 2. Combine your slice reducers
const appReducer = combineReducers({
  test: testSlice.reducer,
  auth: authSlice.reducer,
});

// 3. Create a "Root Reducer" to intercept the clear action
const rootReducer: Reducer = (state, action) => {

  if (action.type === clearRedux.type) {
    // 🌟 The Magic: Setting state to undefined forces
    // Reducers to return their initial state
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

// 4. Configure store with the rootReducer
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof appReducer>;
export type AppDispatch = typeof store.dispatch;
