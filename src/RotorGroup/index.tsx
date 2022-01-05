import classes from './index.module.css'
import Rotor from "../Rotor";

interface Props {
  label: "Hours" | "Days" | "Minutes" | "Seconds";
  curr: string
  prev: string
}

const RotorGroup = ({ label, curr, prev }: Props) => {
  if (typeof curr !== 'string') {
    throw new Error(`RotorGroup:${label}, Please provide a value!`);
  }
  const noOfRotors = label === "Days" ? prev.length : 2;
  return (
    <div className={classes.rotor__group}>
      {
        Array(noOfRotors).fill(null).map((_, i) => <Rotor key={`${label}_${i}`} curr={curr[i]} prev={prev[i]} />)
      }
      <span className={classes.rotor__group__label}>{label}</span>
    </div>
  )
}

export default RotorGroup;