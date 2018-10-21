import React from 'react'
import {withRouter} from 'react-router-dom'
import Schedule from './Schedule'
import axios from 'axios'
import SchedulePlaceholder from './SchedulePlaceholder'

const parseQuery = ({records}) => {
  return records.map(x => {
    return {
      departure: new Date(x.fields.depart),
      idligne: x.fields.nomcourtligne,
      idcourse: x.fields.idcourse,
    }
  })
}

const makePair = line => {
  const chunks = line.split(',')
  const make = chunks => {
    if (chunks.length === 0) return []
    else {
      const [a, b, ...rest] = chunks
      return [[a, b], ...make(rest)]
    }
  }
  return make(chunks)
}

const makeQuery = (lines, stop) => {
  const chunk = lines
    .map(([line, sens]) => {
      return `(nomcourtligne="${line}" AND sens="${sens}")`
    })
    .join(' OR ')

  const rq = {
    q: `(${chunk}) AND nomarret="${stop}"`,
    row: 10,
    timezone: 'Europe/Paris',
    sort: '-depart',
    dataset: 'tco-bus-circulation-passages-tr',
  }

  return rq
}

class ScheduleContainer extends React.Component {
  state = {
    schedule: [],
  }

  componentDidMount() {
    const {line, stop} = this.props.match.params
    const lines = makePair(line)
    const q = makeQuery(lines, stop)

    axios
      .get(`https://data.explore.star.fr/api/records/1.0/search`, {params: q})
      .then(({data}) => {
        this.setState({
          schedule: parseQuery(data),
        })
      })
  }

  render() {
    return this.state.schedule.length ? (
      <Schedule schedule={this.state.schedule} />
    ) : (
      <SchedulePlaceholder />
    )
  }
}

export default withRouter(ScheduleContainer)
