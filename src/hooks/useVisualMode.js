import {useState} from 'react'


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) { // false is a default parameter
    if (!replace) { //true
      setHistory(prev => ([...prev, mode]))
      setMode(mode);
    } else { 
      setHistory(prev => ([...prev.slice(0, -1), mode]))
      setMode(mode);
    }
  }

  function back() {
    if (history.length > 1) {
      const newHist = [...history];
      newHist.pop();
      
      setHistory(newHist);
      setMode(newHist[newHist.length - 1]);
    }
  }

  return { mode, transition, back };
}