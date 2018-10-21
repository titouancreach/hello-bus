import React from 'react'

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {Link} from 'react-router-dom'
import {cx, css} from 'emotion'

const cardTransition = css`
  transform: scale(1);
  transition: all 0.3s ease 0s;

  &:hover {
    outline: rgba(29, 29, 29, 0.1) solid 4px;
  }
`

const mauto = css({margin: 'auto'})

export default function() {
  return (
    <>
      <Link
        to="/schedule/C4,0,C6,0,N1,0/Pont%20de%20Strasbourg"
        className={cx(
          'white flex-auto flex ma3 shadow-1 card-transition button weight w-100 mw6 no-underline',
          cardTransition,
          css({background: '#1ba1e2'})
        )}
      >
        <div className={cx(mauto)}>
          <span className="f1 db tc">
            <FontAwesomeIcon icon="bus" />
          </span>
          <span className="f4 db tc mt2">Republique</span>
        </div>
      </Link>
      <Link
        to="/schedule/C4,1,C6,1,N1,1/Republique"
        className={cx(
          'white flex-auto flex ma3 shadow-1 card-transition button weight mw6 w-100 no-underline',
          cardTransition,
          css({background: '#fa6800'})
        )}
      >
        <div className={cx(mauto)}>
          <span className="f1 db tc">
            <FontAwesomeIcon icon="home" />
          </span>
          <span className="f4 db tc mt2">Home</span>
        </div>
      </Link>
    </>
  )
}
