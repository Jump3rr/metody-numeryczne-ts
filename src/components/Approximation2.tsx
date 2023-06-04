import React, { FormEvent, useState } from 'react';

interface Point {
  x: number;
  y: number;
}

const Approximation2 = () => {
  const [points, setPoints] = useState<Point[]>([]);
  const [numPoints, setNumPoints] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);

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
    const sumY = points.reduce((prev, cur) => prev + cur.y, 0);
    const sumLnX = points.reduce((prev, cur) => prev + Math.log(cur.x), 0);
    const sumSquareLnX = points.reduce(
      (prev, cur) => prev + Math.pow(Math.log(cur.x), 2),
      0
    );
    const sumYLnX = points.reduce(
      (prev, cur) => prev + cur.y * Math.log(cur.x),
      0
    );

    const denominator = n * sumSquareLnX - Math.pow(sumLnX, 2);
    if (Math.abs(denominator) < Number.EPSILON) {
      setResult(
        'Błąd obliczeń. Mianownik jest zbyt bliski zera. Spróbuj z innymi punktami.'
      );
      return;
    }

    const a = (n * sumYLnX - sumY * sumLnX) / denominator;
    const b = (sumY - a * sumLnX) / n;

    setResult(`y = ${a.toFixed(3)} ln x + ${b.toFixed(3)}`);
  };

  const handleNumPointsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const num = parseInt(e.target.value);
    setNumPoints(num);
    setPoints(Array(num).fill({ x: 0, y: 0 }));
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
              x{index + 1}:
              <input
                type='number'
                name='x'
                step='0.01'
                value={points[index].x}
                onChange={(e) => handleChange(e, index)}
              />
            </label>
            <label>
              y{index + 1}:
              <input
                type='number'
                name='y'
                step='0.01'
                value={points[index].y}
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
        </div>
      )}
    </div>
  );
};

export default Approximation2;
