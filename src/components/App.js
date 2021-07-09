import React from 'react'
import Calendar from './Calendar'
import Date from './Date'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={() => <Calendar />} />
        <Route path="/date" exact component={() => <Date />} />
      </Switch>
    </Router>
  )
}
