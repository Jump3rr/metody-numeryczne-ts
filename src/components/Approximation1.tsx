import React, { useState, useEffect } from 'react';
import * as math from 'mathjs';

const Approximation1 = () => {
  const [matrixSize, setMatrixSize] = useState(0);
  const [X, setX] = useState<number[][]>([]);
  const [Y, setY] = useState<number[][]>([]);
  const [resultP0, setResultP0] = useState<number>(0);
  const [resultP1, setResultP1] = useState<number>(0);

  useEffect(() => {
    let newX: number[][] = [];
    let newY: number[][] = [];
    for (let i = 0; i < matrixSize; i++) {
      newX.push([1, 0]);
      newY.push([0]);
    }
    setX(newX);
    setY(newY);
  }, [matrixSize]);

  const calculateP = (X: number[][], Y: number[][]) => {
    let XT = math.transpose(X);
    let XT_X = math.multiply(XT, X);
    let inverse_XT_X = math.inv(XT_X);
    let XT_Y = math.multiply(XT, Y);
    let P = math.multiply(inverse_XT_X, XT_Y);
    return P;
  };

  useEffect(() => {
    if (X.length > 0 && Y.length > 0 && X[0][1] !== 0 && Y[0][0] !== 0) {
      const result = calculateP(X, Y);
      setResultP0(result[0][0]);
      setResultP1(result[1][0]);
    }
  }, [X, Y]);

  return (
    <div>
      <input
        type='number'
        onChange={(e) => setMatrixSize(parseInt(e.target.value))}
        placeholder='Ilość liczb'
      />
      {X.map((_, index) => (
        <div key={index}>
          <input
            type='number'
            onChange={(e) => {
              let newX = [...X];
              newX[index][1] = parseInt(e.target.value);
              setX(newX);
            }}
            placeholder={`Podaj X${index + 1}`}
          />
          <input
            type='number'
            onChange={(e) => {
              let newY = [...Y];
              newY[index][0] = parseInt(e.target.value);
              setY(newY);
            }}
            placeholder={`Podaj Y${index + 1}`}
          />
        </div>
      ))}
      <div>p0 = {resultP0}</div>
      <div>p1 = {resultP1}</div>
    </div>
  );
};

export default Approximation1;
