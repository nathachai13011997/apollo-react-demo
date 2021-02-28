import './App.css';
import React from 'react'

import Users from './content/Users'
import Create from './content/Create'
import Edit from './content/EditUser'

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => {
  return <>
    <Router>
      <Switch>
        <Route path="/Edit/:id">
          <Edit />
        </Route>
        <Route path="/Create">
          <Create />
        </Route>
        <Route path="/">
          <Users />
        </Route>
      </Switch>
    </Router>
  </>
}
export default App
