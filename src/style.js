import {css} from 'emotion'

export const cardTransition = css`
  transform: scale(1);
  transition: all 0.3s ease 0s;

  &:hover {
    outline: rgba(29, 29, 29, 0.1) solid 4px;
  }
`

export const mauto = css({margin: 'auto'})
