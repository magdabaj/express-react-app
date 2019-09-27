import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './reducers/index';
import rootSaga from './saga/index';
import createsagaMiddleware from 'redux-saga';

const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
            // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        }) : compose;

const sagaMiddleware = createsagaMiddleware();
const enhancer = composeEnhancers(
    applyMiddleware(sagaMiddleware)
);

export const store = createStore(
    reducer,
    enhancer
);

sagaMiddleware.run(rootSaga);