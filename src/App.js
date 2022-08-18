import React, { useRef, useState } from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
  const[fromValue, setFromValue] = useState(0);
  const[toValue, setToValue] = useState(1);
  const[fromCurrency, setFromCurrency] = useState('RUB');
  const[toCurrency, setToCurrency] = useState('USD');
  const ratesRef = useRef({});
  React.useEffect(() => {
    fetch('https://cdn.cur.su/api/cbr.json')
    .then(response => response.json())
    .then(data => {
      ratesRef.current = data.rates;
      onChangeToPrice(1);
    }).catch(err  => console.log(err ));
  }, []);
  
  const onChangeFromPrice = (value) => {
    const price = value / ratesRef.current[fromCurrency]
    const result = price * ratesRef.current[toCurrency]
    setToValue(result.toFixed(2))
    setFromValue(value)
  }

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
    setFromValue(result.toFixed(2))
    setToValue(value)
  }

  React.useEffect(() => {
    onChangeFromPrice(fromValue)
  }, [fromCurrency]);

  React.useEffect(() => {
    onChangeToPrice(toValue)
  }, [toCurrency]);
   
  const defaultCurrencies = Object.keys(ratesRef.current);
  return (
    <div className="App">
      <Block value={fromValue} currency={fromCurrency} onChangeCurrency={setFromCurrency}  onChangeValue={onChangeFromPrice} defaultCurrencies={defaultCurrencies}/>
      <Block value={toValue} currency={toCurrency} onChangeCurrency={setToCurrency}  onChangeValue={onChangeToPrice} defaultCurrencies={defaultCurrencies}/>
    </div>
  );
}

export default App;
