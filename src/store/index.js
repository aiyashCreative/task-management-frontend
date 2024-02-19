import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import { useSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './Auth/auth-slice';

const persistConfig = {
    key: 'root',
    storage, // we can have session storage instead
};

const authPersistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
    reducer: {
        authPersistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
}, applyMiddleware(thunk));
export const persistor = persistStore(store);
export const useAppSelector = useSelector;