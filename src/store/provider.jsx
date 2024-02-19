import { store, persistor } from "./index"
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import React from "react";

export function ReduxProvider({ children }) {
    return <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    </Provider>
}