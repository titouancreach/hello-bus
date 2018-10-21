import React, {Component} from 'react'

import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faBus,
  faHome,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons'
import Home from './Home'
import ScheduleContainer from './ScheduleContainer'
import {HashRouter, Switch, Route} from 'react-router-dom'

library.add(faBus, faHome, faArrowCircleLeft)

class App extends Component {
  render() {
    return (
      <HashRouter>
        <div className="flex flex-column h-100 pa3 bg-near-black items-center">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/schedule/:line/:stop" component={ScheduleContainer} />
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default App
