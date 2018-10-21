import React from 'react'
import {css, cx} from 'emotion'
import {Link} from 'react-router-dom'
import {distanceInWordsToNow} from 'date-fns'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default ({schedule}) => {
  return (
    <>
      {schedule.map(({idcourse: id, idligne: ligne, departure}) => (
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
      ))}
      <Link to="/" className="no-underline white f1 ma3">
        <FontAwesomeIcon icon="arrow-circle-left" />
      </Link>
    </>
  )
}
