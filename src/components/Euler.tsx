import React, { useState } from 'react';

const Euler = () => {
  const [aValue, setAValue] = useState(1);
  const [bValue, setBValue] = useState(1);
  const [xValue, setXValue] = useState(1);
  const [yValue, setYValue] = useState(1);
  const [hValue, setHValue] = useState(1);
  const [nValue, setNValue] = useState(1);
  const [selectValue, setSelectValue] = useState(1);
  const [eulerResult, setEulerResult] = useState<any>(null);
  const [improvedEulerResult, setImprovedEulerResult] = useState<any>(null);

  type FunctionType = (x: number, y: number) => number;

  function eulerMethod(
    x: number,
    y: number,
    h: number,
    n: number,
    f: FunctionType
  ): Array<{ x: number; y: number }> {
    let result: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < n; i++) {
      y += h * f(x, y);
      y = parseFloat(y.toFixed(3));
      x += h;
      x = parseFloat(x.toFixed(1));
      result.push({ x, y });
    }
    return result;
  }

  function improvedEulerMethod(
    x: number,
    y: number,
    h: number,
    n: number,
    f: FunctionType
  ): Array<{ x: number; y: number }> {
    let result: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < n; i++) {
      let k1 = h * f(x, y);
      let k2 = h * f(x + h, y + k1);
      y += 0.5 * (k1 + k2);
      y = parseFloat(y.toFixed(3));
      x += h;
      x = parseFloat(x.toFixed(1));
      result.push({ x, y });
    }
    return result;
  }

  function selectFunction(funcType: number): FunctionType {
    const a = aValue;
    const b = bValue;
    console.log(funcType);
    switch (funcType) {
      case 1:
        return (x, y) => a * x + b * y;
      case 2:
        return (x, y) => a * x - b * y;
      case 3:
        return (x, y) => a * x * b * y;
      case 4:
        return (x, y) => (a * x) / (b * y);
      default:
        throw new Error('Nieznany typ funkcji');
    }
  }
  const handleSelectChange = (event: any) => {
    setSelectValue(Number(event.target.value));
  };

  const calculate = () => {
    const func = selectFunction(selectValue);
    const eulerResult = eulerMethod(xValue, yValue, hValue, nValue, func);
    const improvedEulerResult = improvedEulerMethod(
      xValue,
      yValue,
      hValue,
      nValue,
      func
    );
    setEulerResult(eulerResult);
    setImprovedEulerResult(improvedEulerResult);
  };

  return (
    <>
      <div>
        <label>A = </label>
        <input
          type='number'
          value={aValue}
          onChange={(event: any) => setAValue(Number(event.target.value))}
        />
      </div>
      <div>
        <label>B = </label>
        <input
          type='number'
          value={bValue}
          onChange={(event: any) => setBValue(Number(event.target.value))}
        />
      </div>
      <div>
        <label>X = </label>
        <input
          type='number'
          value={xValue}
          onChange={(event: any) => setXValue(Number(event.target.value))}
        />
      </div>
      <div>
        <label>Y = </label>
        <input
          type='number'
          value={yValue}
          onChange={(event: any) => setYValue(Number(event.target.value))}
        />
      </div>
      <div>
        <label>H = </label>
        <input
          type='number'
          value={hValue}
          onChange={(event: any) => setHValue(Number(event.target.value))}
        />
      </div>
      <div>
        <label>N = </label>
        <input
          type='number'
          value={nValue}
          onChange={(event: any) => setNValue(Number(event.target.value))}
        />
      </div>

      <select value={selectValue} onChange={handleSelectChange}>
        <option value={1}>F(x, y) = a * x + b * y</option>
        <option value={2}>F(x, y) = a * x - b * y</option>
        <option value={3}>F(x, y) = a * x * b * y</option>
        <option value={4}>F(x, y) = (a * x) / (b * y)</option>
      </select>
      <div>
        <button onClick={calculate}>Oblicz</button>
      </div>
      {eulerResult && (
        <div>
          Euler:
          {eulerResult.map((el: any) => (
            <div>
              x: {el.x}, y: {el.y}
            </div>
          ))}
        </div>
      )}
      {improvedEulerResult && (
        <div>
          Euler ulepszenie:
          {improvedEulerResult.map((el: any) => (
            <div>
              x: {el.x}, y: {el.y}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Euler;
