import React  from 'react'
import './index.scss';

function App() {
  const [count, setCount] = React.useState(0);
  const onBtnPlus = () => {
    setCount(count + 1);
  }
  const onBtnMinus = () => {
    setCount(count - 1);
  }
  return (
    <div className="App">
      <div>
        <h2>Счетчик:</h2>
        <h1>{count}</h1>
        <button className="minus" onClick={onBtnMinus}>- Минус</button>
        <button className="plus" onClick={onBtnPlus}>Плюс +</button>
      </div>
    </div>
  );
}

export default App;
