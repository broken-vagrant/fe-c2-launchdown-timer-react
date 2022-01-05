import { useEffect, useRef, useState } from "react";
import RotorGroup from "../RotorGroup";

const pad = (value: number | string, len: number): string => {
  value = value.toString()
  return value.length < len ? pad("0" + value, len) : value;
}

const getTime = () => {
  return new Date().getTime() / 1000;
}

interface TimerProps {
  uts: number,
  onEnd?: (...args: any) => void;
}

const initialState = {
  curr: {
    mins: '00',
    secs: '00',
    hours: '00',
    days: '00',
  },
  prev: {
    mins: '00',
    secs: '00',
    hours: '00',
    days: '00',
  }
}

const Timer = ({ uts, onEnd }: TimerProps) => {
  const [initialized, setInitialized] = useState(false);
  const [time, setTime] = useState(initialState);
  const intervalRef = useRef<number | undefined>(undefined);

  const hasCountdownEnded = () => {
    if (uts - getTime() < 0) {
      clearInterval(intervalRef.current);
      if (onEnd) onEnd();
      return true;
    } else {
      return false;
    }
  }

  const init = () => {
    setInitialized(true);
    if (hasCountdownEnded()) {
      setTime(initialState)
    } else {
      setTime((time) => ({ prev: { ...time.prev, days: time.curr.days }, curr: { ...time.curr, days: pad(Math.floor((uts - getTime()) / 86400), 2) } }))
    }
    tick();
  }
  const tick = () => {
    const now = getTime();

    // Between now and epoch
    let diff = uts - now <= 0 ? 0 : uts - now;

    // Days remaining
    const daysLeft = Math.floor(diff / 86400); // 24*60*60 (1 day) = 86400 seconds;
    diff -= daysLeft * 86400;

    // Hours remaining
    const hoursLeft = Math.floor(diff / 3600); // 60 * 60 (1 hour) = 3600 seconds;
    diff -= hoursLeft * 3600;

    // Minutes remaining
    const minsLeft = Math.floor(diff / 60); // 1 min = 60 seconds;
    diff -= minsLeft * 60;

    // Seconds remaining
    const secondsLeft = Math.floor(diff);

    setTime((currTime) => ({
      prev: currTime.curr, curr: {
        days: pad(daysLeft, 2),
        hours: pad(hoursLeft, 2),
        mins: pad(minsLeft, 2),
        secs: pad(secondsLeft, 2)
      }
    }))

    // Has the countdown ended
    hasCountdownEnded();

  }
  const start = () => {
    if (!initialized) init();
    const id = setInterval(() => {
      tick()
    }, 1000);
    intervalRef.current = id;
  }
  useEffect(() => {
    init();
    start();
  }, [])

  return (
    <div>
      <RotorGroup label="Days" curr={time.curr.days} prev={time.prev.days} />
      <RotorGroup label="Hours" curr={time.curr.hours} prev={time.prev.hours} />
      <RotorGroup label="Minutes" curr={time.curr.mins} prev={time.prev.mins} />
      <RotorGroup label="Seconds" curr={time.curr.secs} prev={time.prev.secs} />
    </div>
  )
}

export default Timer;