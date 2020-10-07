import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import PropTypes from 'prop-types';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home'

import './App.css';

const App = () => {
  return (
    <Router>
      <Fragment className="App">
        <Navbar />
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}
// App.propTypes = {
//   children: PropTypes.node
// };

export default App;
