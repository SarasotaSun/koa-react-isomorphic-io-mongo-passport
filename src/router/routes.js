import React from 'react';
import { Route } from 'react-router';
import { generateRoute } from '../utils/localized-routes';

export default (
  <Route component={ require('../components/APP') }>
    { generateRoute({
      paths: ['/', 'audience'],
      component: require('../components/Audience')
    }) }
    { generateRoute({
      paths: ['speaker'],
      component: require('../components/Speaker')
    }) }
    { generateRoute({
      paths: ['board'],
      component: require('../components/Board')
    }) },
    { generateRoute({
      paths: ['questions'],
      component: require('../components/parts/Questions')
    }) }
    <Route path="*" component={ require('../components/NotFound') } />
  </Route>
);
