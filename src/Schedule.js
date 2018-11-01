import React, {useEffect, useState} from 'react'
import {withRouter} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {css, cx} from 'emotion'
import Spinner from 'react-spinkit'
import {distanceInWordsToNow} from 'date-fns'

import {cardTransition, mauto} from './style'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

import fetchSchedule from './fetchSchedule'

function useSchedule(line, stop) {
  const [isFetching, setIsFetching] = useState(false)
  const [schedule, setSchedule] = useState(null)

  useEffect(
    () => {
      setIsFetching(true)
      fetchSchedule(line, stop)
        .then(data => {
          setSchedule(data)
        })
        .catch(() => {
          setSchedule(null)
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

  return (
    <>
      {!isFetching && schedule ? (
        schedule.map(({idcourse: id, idligne: ligne, departure}) => (
          <div
            key={id}
            className={cx(
              `white flex-auto flex ma2-ns ma1 shadow-1 ${cardTransition} button weight w-100 mw6 no-underline items-center ph3`,
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
