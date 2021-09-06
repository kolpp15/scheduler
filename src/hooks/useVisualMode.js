import {useState} from 'react'


export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) { // false is a default parameter
    if (!replace) { //true
      setHistory([...history, mode])
      setMode(mode);
    } else { 
      history.pop();
      setHistory([...history, mode])
      setMode(mode);
    }
  }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length -1]);
    }
  }

  return { mode, transition, back };
}