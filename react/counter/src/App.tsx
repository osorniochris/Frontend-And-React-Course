import { useState } from 'react';
import './App.css';

const App = () => {

  const [counter, setCounter] = useState(0);
  const [jump, setJump] = useState(1);

  const add = () => setCounter(counter + jump);
  
  const subtract = () =>  setCounter(counter - jump);
  
  const reset = () => setCounter(0);
  
  const addJump = () => setJump(jump + 1);

  const subtractJump = () => jump > 1? setJump(jump - 1): null;
  
  return (
    <>
      <main id="main-container">
        <h1 id="title">Let's count together!</h1>

        <div className="container">
          <div id="main-counter">
            <button onClick={subtract} >{"<"}</button>
            <h2>{counter}</h2>
            <button onClick={add} >{">"}</button>
          </div>
        </div>

        <div>
          <div className="container" id="jumper">
            <p>Counter Jump: </p>
            <button onClick={subtractJump} >−</button>
            <p>{jump}</p>
            <button onClick={addJump} >+</button>
          </div>
          <div className="container">
            <button onClick={reset} id="reset-button">
              Reset Counter
            </button></div>
        </div>
          
      </main>
    </>
  );
}

export default App;
