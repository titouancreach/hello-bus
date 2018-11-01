import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import Schedule from './Schedule'
import SchedulePlaceholder from './SchedulePlaceholder'

import fetchSchedule from './fetchSchedule'

function useSchedule(line, stop) {
  const [isFetching, setIsFetching] = useState(false)
  const [schedule, setSchedule] = useState([])

  useEffect(
    () => {
      setIsFetching(true)
      fetchSchedule(line, stop)
        .then(data => {
          setSchedule(data)
        })
        .catch(() => {
          setSchedule([])
        })
        .finally(() => {
          setIsFetching(false)
        })
    },
    [line, stop]
  )

  return [isFetching, schedule]
}

function ScheduleContainer({match}) {
  const {line, stop} = match.params
  const [isFetching, schedule] = useSchedule(line, stop)

  return !isFetching && schedule.length ? (
    <Schedule schedule={schedule} />
  ) : (
    <SchedulePlaceholder />
  )
}

export default withRouter(ScheduleContainer)
