import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {css, cx} from 'emotion'
import Spinner from 'react-spinkit'
import {distanceInWordsToNow} from 'date-fns'

import {mauto} from './style'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import fetchSchedule from './fetchSchedule'

function useSchedule(line, stop) {
  const defaultScheduleValue = [...new Array(10)]

  const [isFetching, setIsFetching] = useState(true)
  const [schedule, setSchedule] = useState(defaultScheduleValue)

  useEffect(
    () => {
      setIsFetching(true)
      fetchSchedule(line, stop)
        .then(data => {
          setSchedule(data)
        })
        .catch(() => {
          setSchedule(defaultScheduleValue)
        })
        .finally(() => {
          setIsFetching(false)
        })
    },
    [line, stop]
  )

  return [isFetching, schedule]
}

function Placeholder() {
  return (
    <div className={mauto}>
      <Spinner color="white" fadeIn="none" />
    </div>
  )
}

function ScheduleContainer({match}) {
  const {line, stop} = match.params
  const [isFetching, schedule] = useSchedule(line, stop)

  if (!isFetching) {
    debugger
  }

  return (
    <>
      {!isFetching ? (
        schedule.map(({idcourse: id, idligne: ligne, departure}) => (
          <div
            key={id}
            className={cx(
              'white flex-auto flex ma2-ns ma1 shadow-1 card-transition button weight w-100 mw6 no-underline items-center ph3',
              css({background: '#ce352C'})
            )}
          >
            <div className="b">{ligne}</div>
            <div className="ml3 i">{distanceInWordsToNow(departure)}</div>
          </div>
        ))
      ) : (
        <Placeholder />
      )}
      <Link to="/" className="no-underline white f1 ma3-ns ma1">
        <FontAwesomeIcon icon="arrow-circle-left" />
      </Link>
    </>
  )
}

export default withRouter(ScheduleContainer)
