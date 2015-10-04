import React from 'react';
import ReactDOM from 'react-dom';
import Router from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

const routerProps = {
  routes: require('./router/routes'),
  history: createBrowserHistory(),
  createElement: (component, props) => {
    return React.createElement(component, { ...props });
  }
};

ReactDOM.render(
    React.createElement(Router, { ...routerProps }),
    document.getElementById('root')
  );
