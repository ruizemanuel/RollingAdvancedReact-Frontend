import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { authSlice } from '../../../auth/data/redux/authSlice';
import { appSlice } from '../redux/appSlice';


const persistAuthConfig = {
  key: 'auth',
  storage,
};
const persistOtherConfig = {
  key: 'other',
  storage,
};

const persistedAuthReducer = persistReducer(
  persistAuthConfig,
  authSlice.reducer,
);
const persistedOtherReducer = persistReducer(
  persistOtherConfig,
  authSlice.reducer,
);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    other: persistedOtherReducer,
    app: appSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
