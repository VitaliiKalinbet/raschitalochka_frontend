import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../Home/Home';
import Diagram from '../Diagram/Diagram';
import Currency from '../Currency/Currency';

import s from './Main.module.css';

const Main = () => (
  <div className={s.mainContainer}>
    <Switch>
      <Route path="/dashboard/currency" component={Currency} />
      <Route path="/dashboard/diagram" component={Diagram} />
      <Route path="/dashboard" component={Home} />
    </Switch>
  </div>
);

export default Main;
