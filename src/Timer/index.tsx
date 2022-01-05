import { useEffect, useState } from "react";
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
  onEnd: (...args: any) => void;
}
const Timer = ({ uts, onEnd }: TimerProps) => {
  const [initialized, setInitialized] = useState(false);
  const [intervalId, setIntervalId] = useState<null | number>(null);
  const [days, setDays] = useState({ curr: '00', prev: '00' });
  const [hours, setHours] = useState({ curr: '00', prev: '00' });
  const [minutes, setMinutes] = useState({ curr: '00', prev: '00' });
  const [seconds, setSeconds] = useState({ curr: '00', prev: '00' });
  const now = getTime();

  const hasCountdownEnded = () => {
    if (uts - now < 0) {
      if (onEnd) onEnd();
      return true;
    } else {
      return false;
    }
  }

  const init = () => {
    setInitialized(true);
    if (hasCountdownEnded()) {
      setDays((days) => ({ prev: days.curr, curr: '00' }));
    } else {
      setDays((days) => ({ curr: pad(Math.floor((uts - now) / 86400), 2), prev: days.curr }));
    }
    tick();
  }
  const tick = () => {
    const now = getTime();

    // Between now and epoch
    let diff = uts - now <= 0 ? 0 : uts - now;

    // Days remaining
    const daysLeft = Math.floor(diff / 86400); // 24*60*60 (1 day) = 86400 seconds;
    setDays((days) => ({ prev: days.curr, curr: pad(daysLeft, 2) }))
    diff -= daysLeft * 86400;

    // Hours remaining
    const hoursLeft = Math.floor(diff / 3600); // 60 * 60 (1 hour) = 3600 seconds;
    setHours((hours) => ({ prev: hours.curr, curr: pad(hoursLeft, 2) }))
    diff -= hoursLeft * 3600;

    // Minutes remaining
    const minsLeft = Math.floor(diff / 60); // 1 min = 60 seconds;
    setMinutes((minutes) => ({ prev: minutes.curr, curr: pad(minsLeft, 2) }))
    diff -= minsLeft * 60;

    // Seconds remaining
    const secondsLeft = Math.floor(diff);
    setSeconds((seconds) => {
      return { prev: seconds.curr, curr: pad(secondsLeft, 2) }
    })

    // Has the countdown ended
    hasCountdownEnded();

  }
  const start = () => {
    if (!initialized) init();
    const id = setInterval(() => {
      tick()
    }, 1000);
    setIntervalId(id);
  }
  useEffect(() => {
    init();
    start();
  }, [])

  return (
    <div>
      <RotorGroup label="Days" value={days} />
      <RotorGroup label="Hours" value={hours} />
      <RotorGroup label="Minutes" value={minutes} />
      <RotorGroup label="Seconds" value={seconds} />
    </div>
  )
}

export default Timer;