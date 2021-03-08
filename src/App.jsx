import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [valueCurrentInput, setValueCurrentInput] = useState('');
  const [startValue, setStartValue] = useState(0);
  const [residualValue, setResidualValue] = useState(0);
  const [resPreviousValues, setResPrefValues] = useState(0);
  const [currentOperator, setCurrentOperator] = useState('');
  const [currentValueControl, setCurrentValueControl] = useState('');

  const countingValuesOperators = () => {
    switch (currentOperator) {
      case ('/'):
        if (residualValue && !Number.isNaN(Number(residualValue))) {
          setResPrefValues(startValue / Number(residualValue));
        }
        break;
      case ('*'):
        if (!Number.isNaN(Number(residualValue))) {
          setResPrefValues(startValue * Number(residualValue));
        }
        break;
      case ('-'):
        if (!Number.isNaN(Number(residualValue))) {
          setResPrefValues(startValue - Number(residualValue));
        }
        break;
      case ('+'):
        if (!Number.isNaN(Number(residualValue))) {
          setResPrefValues(startValue + Number(residualValue));
        }

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
    if (Number.isNaN(Number(value)) && value !== 'del' && value !== 'AC' && value !== '=' && value !== '.' && value !== '%') {
      if (Number.isNaN(Number(splitStr[splitStr.length - 1]))) {
        splitStr[splitStr.length - 1] = value;
        setCurrentOperator(value);
        setValueCurrentInput(splitStr.join(''));
        setStartValue(resPreviousValues);
        setCurrentValueControl('');
        return;
      }
      setCurrentValueControl('');
      setCurrentOperator(value);
      setResidualValue(0);
      setStartValue(resPreviousValues);
      if (resPreviousValues === 0) {
        setResPrefValues(+valueCurrentInput);
      }
      setValueCurrentInput(valueCurrentInput + value);
    }

    /* Control */
    if (value === 'del' || value === 'AC' || value === '=' || value === '%') {
      setCurrentValueControl(value);
    }

    /* Add number and dot */
    if (!Number.isNaN(Number(value)) || value === '.') {
      /* if add new number after = */
      if (!currentOperator && currentValueControl && currentValueControl === '=') {
        setValueCurrentInput(value);
        setCurrentValueControl('');
        return;
      }

      const allValueCurrentInput = valueCurrentInput + value;
      /* DOT */
      if (!startValue && valueCurrentInput.includes('.') && value === '.') {
        return;
      }
      if (startValue && residualValue.includes('.') && value === '.') {
        return;
      }

      setResidualValue(allValueCurrentInput
        .slice(allValueCurrentInput.lastIndexOf(currentOperator) + 1,
          allValueCurrentInput.length));

      setValueCurrentInput(allValueCurrentInput);
      countingValuesOperators();
    }
  };

  /* Button control */
  useEffect(() => {
    switch (currentValueControl) {
      case ('='):
        if (resPreviousValues === 0) {
          setValueCurrentInput('');
          setResPrefValues(0);
          break;
        }

        setValueCurrentInput(String(resPreviousValues));
        setResPrefValues(0);
        setCurrentOperator('');
        setStartValue(0);
        break;
      case ('%'):
        if (resPreviousValues) {
          setResidualValue(residualValue / 100);
          setValueCurrentInput(valueCurrentInput
            .slice(0,
              valueCurrentInput.indexOf(currentOperator) + 1) + residualValue / 100);
          setResPrefValues(0);
          setCurrentValueControl('');
        } else {
          setValueCurrentInput(String(+valueCurrentInput / 100));
          setResPrefValues(0);
          setCurrentValueControl('');
          setCurrentOperator('');
        }

        break;
      case ('del'):
        setValueCurrentInput(valueCurrentInput.slice(0, valueCurrentInput.length - 1));
        setCurrentValueControl('');
        break;
      case ('AC'):
        setValueCurrentInput('');
        setStartValue(0);
        setResPrefValues(0);
        setCurrentOperator('');
        setCurrentValueControl('');
        break;

      default:
        break;
    }
  }, [currentValueControl]);

  useEffect(() => {
    /* startValue */
    if (currentOperator && !startValue) {
      setStartValue(Number(valueCurrentInput
        .slice(0,
          valueCurrentInput.indexOf(currentOperator))));
    }
    setResidualValue(valueCurrentInput
      .slice(valueCurrentInput.lastIndexOf(currentOperator) + 1,
        valueCurrentInput.length));
    countingValuesOperators();
  }, [currentOperator, valueCurrentInput.length]);
  return (
    <div className="App">
      <div className="calculator">
        <div className="container">
          <div className="vueResult">
            <input type="search" className="currentInput clearStyleInput" value={valueCurrentInput} disabled />
            <input className="resultOutput clearStyleInput" value={resPreviousValues} disabled />
          </div>
          <div className="blockButton">
            <button type="button" className="btn bcAC" value="AC" onClick={(e) => { addValueButton(e); }}>AC</button>
            <button type="button" className="btn" value="del" onClick={(e) => { addValueButton(e); }}>del</button>
            <button type="button" className="btn" value="%" onClick={(e) => { addValueButton(e); }}>%</button>
            <button type="button" className="btn" value="/" onClick={(e) => { addValueButton(e); }}>/</button>
            <button type="button" className="btn" value="7" onClick={(e) => { addValueButton(e); }}>7</button>
            <button type="button" className="btn" value="8" onClick={(e) => { addValueButton(e); }}>8</button>
            <button type="button" className="btn" value="9" onClick={(e) => { addValueButton(e); }}>9</button>
            <button type="button" className="btn" value="*" onClick={(e) => { addValueButton(e); }}>*</button>
            <button type="button" className="btn" value="4" onClick={(e) => { addValueButton(e); }}>4</button>
            <button type="button" className="btn" value="5" onClick={(e) => { addValueButton(e); }}>5</button>
            <button type="button" className="btn" value="6" onClick={(e) => { addValueButton(e); }}>6</button>
            <button type="button" className="btn" value="-" onClick={(e) => { addValueButton(e); }}>-</button>
            <button type="button" className="btn" value="1" onClick={(e) => { addValueButton(e); }}>1</button>
            <button type="button" className="btn" value="2" onClick={(e) => { addValueButton(e); }}>2</button>
            <button type="button" className="btn" value="3" onClick={(e) => { addValueButton(e); }}>3</button>
            <button type="button" className="btn" value="+" onClick={(e) => { addValueButton(e); }}>+</button>
            <button type="button" className="btn" value="." onClick={(e) => { addValueButton(e); }}>.</button>
            <button type="button" className="btn" value="0" onClick={(e) => { addValueButton(e); }}>0</button>
            <button type="button" className="btn btn_large" value="=" onClick={(e) => { addValueButton(e); }}>=</button>
          </div>
        </div>

      </div>
    </div>
  );
}

export default App;
