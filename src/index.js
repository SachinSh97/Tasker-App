import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from 'containers';
import reportWebVitals from 'reportWebVitals';
import { CONTEXT } from 'config';
import store from 'store';
import 'index.scss';

const RootComponent = () => {
  useEffect(() => {
    let { origin, pathname } = window.location;

    if (pathname === '/' || !pathname.includes(CONTEXT)) {
      let url = `${origin}${CONTEXT}`;
      window.location.replace(url);
    }
  }, []);

  return (
    <Router>
      <Route path={CONTEXT} component={App} />
    </Router>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <RootComponent />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
