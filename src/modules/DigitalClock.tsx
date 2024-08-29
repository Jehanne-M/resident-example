import dayjs from 'dayjs';

type Timer = {
  time: number;
};
const DigitalClock = (timer: Timer) => {
  return <div>{dayjs(timer.time).format('HH:mm:ss')}</div>;
};

export default DigitalClock;
