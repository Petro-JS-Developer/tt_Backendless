/* eslint-disable no-fallthrough */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [valueCurrentInput, setValueCurrentInput] = useState('');
  const [startValue, setStartValue] = useState(0);
  const [resPrefValues, setResPrefValues] = useState(0);
  const [currentOperator, setCurrentOperator] = useState();
  const [valueControl, setValueControl] = useState('');
  // const [residualValue, setResidualValue] = useState('');

  const calculatorCurrent = (residVal) => {
    console.log(residVal, currentOperator);
    switch (true) {
      case (currentOperator === '/'):
        setResPrefValues(startValue / Number(residVal));
        break;
      case (currentOperator === '*'):
        setResPrefValues(startValue * Number(residVal));
        break;
      case (currentOperator === '-'):
        setResPrefValues(startValue - Number(residVal));
        break;
      case (currentOperator === '+'):
        setResPrefValues(startValue + Number(residVal));
        setCurrentOperator();
        break;
      case (currentOperator === '%'):
        setResPrefValues(startValue + Number(residVal) / 100);
        break;
      default:
        break;
    }
  };

  const calculator = () => {
    switch (true) {
      case (currentOperator === '/'):
      case (currentOperator === '*'):
      case (currentOperator === '-'):
      case (currentOperator === '+'):
        setStartValue(resPrefValues);
        break;
      // case (valueControl === '='):
      //   if (resPrefValues === 0) {
      //     setValueCurrentInput('');
      //     setResPrefValues(0);
      //     break;
      //   }
      //   setValueCurrentInput(String(resPrefValues));
      //   setResPrefValues(0);
      //   break;
      // case (valueControl === '%'):
      //   setValueCurrentInput(String(resPrefValues / 100));
      //   setResPrefValues(0);
      //   break;
      // case (valueControl === 'del'): {
      //   const newValue = valueCurrentInput.slice(0, valueCurrentInput.length - 1);
      //   console.log(newValue);
      //   setValueCurrentInput(newValue);
      //   calculatorCurrent(newValue);
      //   // console.log(residualValue.slice(0, residualValue.length - 1));
      //   // setResidualValue(residualValue.slice(0, residualValue.length - 1));
      //   break;
      // }

      // case (valueControl === 'AC'):
      //   setValueCurrentInput('');
      //   setResPrefValues(0);
      //   break;

      default:
        break;
    }
  };

  const control = () => {
    switch (true) {
      case (valueControl === '='):
        // if (resPrefValues === 0) {
        //   setValueCurrentInput('');
        //   setResPrefValues(0);
        //   setValueControl();
        //   break;
        // }
        setValueCurrentInput(String(resPrefValues));
        setResPrefValues(0);
        setCurrentOperator('');
        break;
      case (valueControl === '%'):
        setValueCurrentInput(String(resPrefValues / 100));
        setResPrefValues(0);
        break;
      case (valueControl === 'del'): {
        const newValue = valueCurrentInput.slice(0, valueCurrentInput.length - 1);
        console.log(newValue);
        setValueCurrentInput(newValue);
        calculatorCurrent(newValue);
        // console.log(residualValue.slice(0, residualValue.length - 1));
        // setResidualValue(residualValue.slice(0, residualValue.length - 1));
        break;
      }

      case (valueControl === 'AC'):
        setValueCurrentInput('');
        setResPrefValues(0);
        break;

      default:
        break;
    }
  };

  const addValueButton = (e) => {
    const { value } = e.target;
    const splitStr = [...valueCurrentInput];
    if (Number.isNaN(Number(value)) && valueCurrentInput[valueCurrentInput.length - 1] === value) {
      return;
    }
    /* Operators */
    if (Number.isNaN(Number(value)) && value !== 'del' && value !== 'AC' && value !== '=' && value !== '%' && value !== '.') {
      if (Number.isNaN(Number(splitStr[splitStr.length - 1]))) {
        splitStr[splitStr.length - 1] = value;
        setCurrentOperator(value);
        setValueCurrentInput(splitStr.join(''));
        return;
      }
      calculator();
      console.log('setOperator', valueCurrentInput, value, resPrefValues);
      setCurrentOperator(value);
      if (resPrefValues === 0) {
        setResPrefValues(+valueCurrentInput);
      }
      setValueCurrentInput(valueCurrentInput + value);
    }
    /* Control */
    if (value === 'del' || value === 'AC' || value === '=' || value === '%') {
      console.log('control');
      setValueControl(value);
    }

    /* Add number and dot */
    if (!Number.isNaN(Number(value)) || value === '.') {
      if (valueControl === '=') {
        console.log('control=', value);
        setValueCurrentInput(value);
        return;
      }
      const allValueCurrentInput = valueCurrentInput + value;
      const residualVal = allValueCurrentInput
        .slice(allValueCurrentInput.lastIndexOf(currentOperator) + 1,
          allValueCurrentInput.length);

      setValueCurrentInput(valueCurrentInput + value);

      /* residualValue */
      // setResidualValue(residualVal);
      calculatorCurrent(residualVal);
    }
  };

  useEffect(() => {
    /* startValue */
    if (currentOperator && !startValue) {
      setStartValue(Number(valueCurrentInput
        .slice(0,
          valueCurrentInput.indexOf(currentOperator))));
    } else {
      setStartValue(resPrefValues);
    }
    control();
    calculator();
  }, [currentOperator, valueControl]);
  return (
    <div className="App">
      <div className="calculator">
        <div className="container">
          <div className="vueResult">
            <input type="search" className="currentInput clearStyleInput" value={valueCurrentInput} disabled />
            <input className="resultOutput clearStyleInput" value={resPrefValues} disabled />
          </div>
          <div className="blockButton">
            <input type="button" className="btn bcAC" value="AC" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="del" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="%" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="/" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="7" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="8" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="9" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="*" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="4" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="5" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="6" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="-" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="1" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="2" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="3" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="+" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="." onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn" value="0" onClick={(e) => { addValueButton(e); }} />
            <input type="button" className="btn btn_large" value="=" onClick={(e) => { addValueButton(e); }} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
