import { useEffect, useState } from 'react';

interface Props {
  curr: string
  prev: string
}

const Rotor = ({ curr, prev }: Props) => {

  const [flipped, setFlipped] = useState(false);
  const [rotorTopValue, setRotorTopValue] = useState(prev);
  const [rotorLeafRearValue, setRotorLeafRearValue] = useState(prev);
  const rotorTopFlip = () => {
    if (rotorTopValue !== curr) {
      setRotorTopValue(curr);
    }
  }
  const rotorLeafRearFlip = () => {
    if (curr !== rotorLeafRearValue) {
      setRotorLeafRearValue(curr);
      setFlipped(true);
      var flip = setInterval(() => {
        setFlipped(false);
        clearInterval(flip)
      }, 500)
    }
  }
  useEffect(() => {
    setTimeout(() => {
      rotorTopFlip()
    }, 500)
    setTimeout(() => {
      rotorLeafRearFlip()
    }, 500)
  }, [curr, prev])
  return (
    <div className="rotor">
      <div className={`rotor__leaf ${flipped ? "flipped" : ""}`}>
        <figure className="rotor__leaf__rear" >{rotorLeafRearValue}</figure>
        <figure className="rotor__leaf__front">{prev}</figure>
      </div>
      <div className="rotor__top">{rotorTopValue}</div>
      <div className="rotor__bottom">{prev}</div>
    </div>
  )
}

export default Rotor;