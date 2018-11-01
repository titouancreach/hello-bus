import React from 'react'
import {withRouter} from 'react-router-dom'
import Schedule from './Schedule'
import SchedulePlaceholder from './SchedulePlaceholder'

import fetchSchedule from './fetchSchedule'

class ScheduleContainer extends React.Component {
  state = {
    schedule: [],
    isFetching: false,
  }

  fetch = () => {
    this.setState({
      isFetching: true,
    })

    const {line, stop} = this.props.match.params
    fetchSchedule(line, stop)
      .then(data => {
        this.setState({
          schedule: data,
        })
      })
      .catch(() => {
        this.setState({
          schedule: [],
        })
      })
      .finally(() => {
        this.setState({
          isFetching: false,
        })
      })
  }

  componentDidUpdate(prevProps) {
    const {line: prevLine, stop: prevStop} = prevProps.match.params
    const {line, stop} = this.props.match.params
    if (line !== prevLine || stop !== prevStop) {
      this.fetch()
    }
  }

  componentDidMount() {
    this.fetch()
  }

  render() {
    return !this.state.isFetching && this.state.schedule.length ? (
      <Schedule schedule={this.state.schedule} />
    ) : (
      <SchedulePlaceholder />
    )
  }
}

export default withRouter(ScheduleContainer)
