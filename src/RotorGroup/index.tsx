import classes from './index.module.css'
import Rotor from "../Rotor";

interface Props {
  label: "Hours" | "Days" | "Minutes" | "Seconds";
  value: {
    curr: string
    prev: string
  };
}

const RotorGroup = ({ label, value }: Props) => {
  if (typeof value.curr !== 'string') {
    throw new Error(`RotorGroup:${label}, Please provide a value!`);
  }
  const noOfRotors = label === "Days" ? value.prev.length : 2;
  return (
    <div className={classes.rotor__group}>
      {
        Array(noOfRotors).fill(null).map((_, i) => <Rotor key={i} curr={value.curr[i]} prev={value.prev[i]} />)
      }
      <span className={classes.rotor__group__label}>{label}</span>
    </div>
  )
}

export default RotorGroup;