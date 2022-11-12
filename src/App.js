import { useEffect } from "react";
import "./App.css";
import { useTelegram } from "./components/hooks/useTelegram";

function App() {
  const { tg, onToggleButton } = useTelegram();
  useEffect(() => {
    tg.ready();
  }, []);
  return (
    <div className="App">
      <h1>Hello </h1>
      <button onClick={onToggleButton}>Toggle</button>
    </div>
  );
}

export default App;
