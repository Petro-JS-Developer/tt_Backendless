import React, { useEffect, useState } from 'react';
import './App.scss';

function App() {
  const [valueCurrentInput, setValueCurrentInput] = useState('');
  const [startValue, setStartValue] = useState(0);
  const [residualValue, setResidualValue] = useState(0);
  const [resPrefValues, setResPrefValues] = useState(0);
  const [currentOperator, setCurrentOperator] = useState('');
  const [currentValueControl, setCurrentValueControl] = useState('');

  const buttonsControl = () => {
    switch (true) {
      case (currentValueControl === '='):
        if (resPrefValues === 0) {
          setValueCurrentInput('');
          setResPrefValues(0);
          break;
        }

        setValueCurrentInput(String(resPrefValues));
        setResPrefValues(0);
        setCurrentOperator('');
        setStartValue(0);
        break;
      case (currentValueControl === '%'):
        if (resPrefValues) {
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
      case (currentValueControl === 'del'):
        setValueCurrentInput(valueCurrentInput.slice(0, valueCurrentInput.length - 1));
        setCurrentValueControl('');
        break;
      case (currentValueControl === 'AC'):
        setValueCurrentInput('');
        setStartValue(0);
        setResPrefValues(0);
        setCurrentOperator('');
        setCurrentValueControl('');
        break;

      default:
        break;
    }
  };

  const countingValuesOperators = () => {
    switch (true) {
      case (currentOperator === '/'):
        if (residualValue) {
          setResPrefValues(startValue / Number(residualValue));
        }
        break;
      case (currentOperator === '*'):
        setResPrefValues(startValue * Number(residualValue));
        break;
      case (currentOperator === '-'):
        setResPrefValues(startValue - Number(residualValue));
        break;
      case (currentOperator === '+'):
        setResPrefValues(startValue + Number(residualValue));
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
        setStartValue(resPrefValues);
        setCurrentValueControl('');
        return;
      }
      setCurrentValueControl('');
      setCurrentOperator(value);
      setResidualValue(0);
      setStartValue(resPrefValues);
      if (resPrefValues === 0) {
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

      let allValueCurrentInput = valueCurrentInput + value;
      /* DOT */
      if (value === '.') {
        allValueCurrentInput = valueCurrentInput + 0 + value;
      }
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

  useEffect(() => {
    buttonsControl();
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
