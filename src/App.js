import React from 'react';
import { Provider } from 'react-redux';
import store from './store/index';
import Router from './router/index';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
    return (
        <Provider store={store.store}>
            <PersistGate loading={null} persistor={store.persistor}>
                <Router />
            </PersistGate>
        </Provider>
    );
}

export default App;