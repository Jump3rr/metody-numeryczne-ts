import React, { FormEvent, useState } from 'react';
import Graph from './Graph';

interface Point {
  t: number;
  T: number;
}

const Approximation3 = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [numPoints, setNumPoints] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);
  const [aB, setAB] = useState<[number, number]>([0, 0]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedPoints = [...points];
    updatedPoints[index] = {
      ...updatedPoints[index],
      [e.target.name]: parseFloat(e.target.value),
    };
    setPoints(updatedPoints);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const n = points.length;
    const sumY = points.reduce((prev, cur) => prev + Math.log(cur.T), 0);
    const sumX = points.reduce((prev, cur) => prev + cur.t, 0);
    const sumXSquare = points.reduce(
      (prev, cur) => prev + Math.pow(cur.t, 2),
      0
    );
    const sumXY = points.reduce(
      (prev, cur) => prev + cur.t * Math.log(cur.T),
      0
    );

    const denominator = n * sumXSquare - Math.pow(sumX, 2);
    if (Math.abs(denominator) < Number.EPSILON) {
      setResult(
        'Błąd obliczeń. Mianownik jest zbyt bliski zera. Spróbuj z innymi punktami.'
      );
      return;
    }

    const b = (n * sumXY - sumX * sumY) / denominator;
    const A = (sumY - b * sumX) / n;
    const a = Math.exp(A);

    setResult(`y = ${a.toFixed(3)} exp(${b.toFixed(3)}x)`);
    setAB([a, b]);
  };

  const handleNumPointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    setNumPoints(num);
    setPoints(Array(num).fill({ t: 0, T: 0 }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Liczba punktów:
          <input
            type='number'
            min='2'
            value={numPoints}
            onChange={handleNumPointsChange}
          />
        </label>
        {points.map((_, index) => (
          <div key={index}>
            <label>
              t{index + 1}:
              <input
                type='number'
                step='1'
                name='t'
                value={points[index].t}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <label>
              T{index + 1}:
              <input
                type='number'
                step='0.01'
                name='T'
                value={points[index].T}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
          </div>
        ))}
        <button type='submit'>Oblicz</button>
      </form>
      {result && (
        <div>
          <h1>Wyniki aproksymacji:</h1>
          <p>{result}</p>
          <Graph a={aB[0]} b={aB[1]} data={points} />
        </div>
      )}
    </div>
  );
};

export default Approximation3;
