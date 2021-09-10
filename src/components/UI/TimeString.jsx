import React, { useState, useEffect } from 'react'
import { timePassed } from '../../utils/time';

const TimeString = ({ string }) => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 1000 * 60);
    return () => {
      clearInterval(interval);
    };
  })

  return (
    <span>{timePassed(string)}</span>
  )
}

export default TimeString;
