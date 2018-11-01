import React from 'react'

import {library} from '@fortawesome/fontawesome-svg-core'
import {
  faBus,
  faHome,
  faArrowCircleLeft,
} from '@fortawesome/free-solid-svg-icons'
import Home from './Home'
import Schedule from './Schedule'
import {HashRouter, Switch, Route} from 'react-router-dom'

library.add(faBus, faHome, faArrowCircleLeft)

function App() {
  return (
    <HashRouter>
      <div className="flex flex-column h-100 pa3 bg-near-black items-center">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/schedule/:line/:stop" component={Schedule} />
        </Switch>
      </div>
    </HashRouter>
  )
}

export default App
