import React from 'react'
import {css, cx} from 'emotion'

import {Link} from 'react-router-dom'
import Spinner from 'react-spinkit'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

export default () => {
  return (
    <>
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(i => (
        <div
          key={i}
          className={cx(
            'white flex-auto flex ma2 shadow-1 card-transition button weight w-100 mw6 no-underline items-center ph3',
            css({background: '#ce352C'})
          )}
        >
          <div>
            <Spinner color="white" fadeIn="none" />
          </div>
        </div>
      ))}
      <Link to="/" className="no-underline white f1 ma3">
        <FontAwesomeIcon icon="arrow-circle-left" />
      </Link>
    </>
  )
}
