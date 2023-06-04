import React, { useState } from 'react';

type FunctionType = 'ax+by' | 'ax-by' | 'ax*by' | 'ax/by';

const RungeKutta: React.FC = () => {
  const [a, setA] = useState<number>(1);
  const [b, setB] = useState<number>(1);
  const [functionType, setFunctionType] = useState<FunctionType>('ax+by');
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(1);
  const [h, setH] = useState<number>(0.1);
  const [n, setN] = useState<number>(1);
  const [results, setResults] = useState<
    Record<string, { x: number; y: number }>
  >({});
  const [error, setError] = useState<string | null>(null);

  const compute = () => {
    let F: (x: number, y: number) => number;

    switch (functionType) {
      case 'ax+by':
        F = (x, y) => a * x + b * y;
        break;
      case 'ax-by':
        F = (x, y) => a * x - b * y;
        break;
      case 'ax*by':
        F = (x, y) => a * x * b * y;
        break;
      case 'ax/by':
        if (b * y !== 0) {
          F = (x, y) => (a * x) / (b * y);
        } else {
          setError('Nie można dzielić przez 0.');
          return;
        }
        break;
      default:
        F = (x, y) => 0;
    }

    let xCurrent = x;
    let yCurrent = y;
    let resultsTemp: Record<string, { x: number; y: number }> = {};

    for (let i = 1; i <= n; i++) {
      const k1 = h * F(xCurrent, yCurrent);
      const k2 = h * F(xCurrent + h / 2, yCurrent + k1 / 2);
      const k3 = h * F(xCurrent + h / 2, yCurrent + k2 / 2);
      const k4 = h * F(xCurrent + h, yCurrent + k3);

      yCurrent = yCurrent + (k1 + 2 * k2 + 2 * k3 + k4) / 6;
      xCurrent = xCurrent + h;

      resultsTemp[`n${i}`] = {
        x: Number(xCurrent.toFixed(2)),
        y: Number(yCurrent.toFixed(2)),
      };
    }

    setResults(resultsTemp);
  };

  return (
    <div>
      <div>
        <label>
          a:
          <input
            type='number'
            value={a}
            onChange={(e) => setA(+e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          b:
          <input
            type='number'
            value={b}
            onChange={(e) => setB(+e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Typ funkcji:
          <select
            value={functionType}
            onChange={(e) => setFunctionType(e.target.value as FunctionType)}
          >
            <option value='ax+by'>(x, y) = ax + by</option>
            <option value='ax-by'>(x, y) = ax - by</option>
            <option value='ax*by'>(x, y) = ax * by</option>
            <option value='ax/by'>(x, y) = ax / by</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          x0:
          <input
            type='number'
            value={x}
            onChange={(e) => setX(+e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          y0:
          <input
            type='number'
            value={y}
            onChange={(e) => setY(+e.target.value)}
          />
        </label>
        <div></div>
        <label>
          h:
          <input
            type='number'
            value={h}
            onChange={(e) => setH(+e.target.value)}
          />
        </label>
        <div></div>
        <label>
          n:
          <input
            type='number'
            value={n}
            onChange={(e) => setN(+e.target.value)}
          />
        </label>
      </div>
      <button onClick={compute}>Oblicz</button>
      {error && <p>{error}</p>}
      <div>
        {Object.entries(results).map(([key, { x, y }]) => (
          <p key={key}>{`${key}: x = ${x}, y = ${y}`}</p>
        ))}
      </div>
    </div>
  );
};

export default RungeKutta;
