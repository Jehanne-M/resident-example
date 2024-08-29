import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import { invoke } from '@tauri-apps/api/tauri';
import './App.css';
import { useTime } from './hooks/useTime';
import DigitalClock from './modules/DigitalClock';

/* Create timestamp in future with specified offset
 * @param {string} timeAhead - time in future in H[:m[:s[.sss]]] format
 * @param {string} offset - offset as [-]H[:mm]
 * @returns {string} ISO 8601 formatted timestamp with offset
 */
function getFutureTimestamp(timeAhead: string, offset: string) {
  const [h, m, s, ms] = timeAhead.split(/\D/);

  const timems =
    (Number(h) || 0) * 3.6e6 +
    (Number(m) || 0) * 6e4 +
    (Number(s) || 0) * 1e3 +
    (Number(ms) || 0);
  const oSign = /^-/.test(offset) ? -1 : +1;
  const [oH, om] = offset.match(/\d+/g) || [];
  const oms = oSign * (Number(oH) * 3.6e6 + (Number(om) || 0) * 6e4);
  const d = new Date(Date.now() + oms + timems);

  const pad = (n: number) => ('0' + n).slice(-2);
  return d
    .toISOString()
    .replace(
      'Z',
      `${oSign < 0 ? '-' : '+'}${pad(Number(oH))}:${pad(Number(om) || 0)}`
    );
}

function App() {
  const time = useTime(1000);

  const dead = new Date();
  dead.setHours(9, 40, 0);

  // check schedule time everything.
  // execution processeing end to set next schedule.
  useEffect(() => {
    // TODO これで、対象時間になったら実行できる
    const alerm = Date.parse(dead.toISOString()) - time;
    if (alerm === 0) {
      alert(`${dead} : ${time} alerm start.`);
    }
  }, [time]);
  return (
    <div className='container'>
      <h1>Welcome to Tauri!</h1>

      <div className='row'>
        <a href='https://vitejs.dev' target='_blank'>
          <img src='/vite.svg' className='logo vite' alt='Vite logo' />
        </a>
        <a href='https://tauri.app' target='_blank'>
          <img src='/tauri.svg' className='logo tauri' alt='Tauri logo' />
        </a>
        <a href='https://reactjs.org' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <div>
        <DigitalClock time={time} />
      </div>
    </div>
  );
}

export default App;
