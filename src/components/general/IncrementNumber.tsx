import { useState, useEffect, useRef, FC } from "react";

const checkIsNumber = (val?: number | string, name?: string) => {
  if (typeof val === "number") {
    return val;
  }
  if (isNaN(Number(val))) {
    throw new Error(
      `the value of props [${name}] must be a number, or typeof Number(to) === 'number'`
    );
  } else {
    return Number(val);
  }
};

interface Props {
  to: number | string;
  speed?: number | string;
  callback?: (endValue: number) => void;
}

const IncrementNumber: FC<Props> = (props) => {
  const { to, callback } = props;
  const [count, setCount] = useState(0);
  const refCount = useRef(0);
  let animation: any = null;

  const setStep = (to: number) => {
    const propSpeed = checkIsNumber(props.speed, "speed");
    const speed = propSpeed ? 12 - Math.max(1, Math.min(10, propSpeed)) : 5;
    return Math.floor((to - count) / (speed * 10));
  };

  const increment = (to: number, step: number, toFixedLength: number) => {
    let next = Number(
      (
        refCount.current +
        step +
        Number(Math.random().toFixed(toFixedLength))
      ).toFixed(toFixedLength)
    );
    refCount.current = next;
    if (step === 0) return;
    setCount(step > 0 ? Math.min(next, to) : Math.max(next, to));
    if ((step > 0 && next >= to) || (step < 0 && next <= to)) {
      setCount(to);
      callback && callback(count);
      cancelAnimationFrame(animation);
      return;
    }
    animation = requestAnimationFrame(() => increment(to, step, toFixedLength));
  };

  const initAndIncrement = () => {
    cancelAnimationFrame(animation);
    const to = checkIsNumber(props.to, "to");
    const step = setStep(to);

    const toDecimalLength = to.toString().split(".")[1]?.length || 0;
    const countDecimalLength = count.toString().split(".")[1]?.length || 0;
    const toFixedLength = Math.min(
      2,
      Math.max(toDecimalLength, countDecimalLength)
    );
    const _to = Number(to.toFixed(toFixedLength));
    animation = requestAnimationFrame(() =>
      increment(_to, step, toFixedLength)
    );
  };

  useEffect(() => {
    initAndIncrement();
  }, [to]);

  return <>{count.toLocaleString()}</>;
};

export default IncrementNumber;
