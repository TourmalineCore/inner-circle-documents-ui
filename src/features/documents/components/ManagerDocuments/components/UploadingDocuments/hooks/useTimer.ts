import { useEffect, useState } from 'react';

const BEGIN_TIME = 3;

export function useTimer() {
  const [sendTime, setSendTime] = useState(BEGIN_TIME);
  const [timerRun, setTimerRun] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRun) {
      timer = setTimeout(() => setSendTime(sendTime - 1), 1000);

      if (sendTime < 0) {
        uploadDocuments();
        setSendTime(BEGIN_TIME);
        setTimerRun(false);
      }
    }

    return () => {
      clearTimeout(timer);
    };
  }, [timerRun, sendTime]);

  function startSend() {
    setTimerRun(true);
  }

  function endSend() {
    setTimerRun(false);
    setSendTime(BEGIN_TIME);
  }

  async function uploadDocuments() {
    // TODO TEST LOG
    console.log('SUCCESS');
  }

  return {
    sendTime,
    timerRun,
    startSend,
    endSend,
  };
}
