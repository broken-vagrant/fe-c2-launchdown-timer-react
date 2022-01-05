import { useEffect, useRef, useState } from 'react';
import classes from './index.module.css';

interface Props {
  curr: string
  prev: string
}

const Rotor = ({ curr, prev }: Props) => {
  return (
    <div className={classes.rotor}>
      <div className={`${classes.rotor__leaf} ${flipped ? classes.flipped : ''}`}>
        <figure className={classes.rotor__leaf__rear} >{curr}</figure>
        <figure className={classes.rotor__leaf__front}>{prev}</figure>
      </div>
      <div className={classes.rotor__top}>{curr}</div>
      <div className={classes.rotor__bottom}>{prev}</div>
    </div>
  )
}

export default Rotor;