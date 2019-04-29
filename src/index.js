import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import routes from './routes';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from './reducers';
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const store=createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk,logger)
    )
);

ReactDOM.render(
    <Provider store={ store }>
        <Router>
            <div>
                {/*<FlashMessagesList/>*/}
                {routes}
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);


