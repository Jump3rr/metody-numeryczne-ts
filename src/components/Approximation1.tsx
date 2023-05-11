import React, { useState } from 'react';
import * as math from 'mathjs';

type Matrix = number[][];

const Approximation1 = () => {
  const [resultP0, setResultP0] = useState<number>(0);
  const [resultP1, setResultP1] = useState<number>(0);

  const calculateP = (X: Matrix, Y: Matrix) => {
    let XT = math.transpose(X);
    let XT_X = math.multiply(XT, X);
    let inverse_XT_X = math.inv(XT_X);
    let XT_Y = math.multiply(XT, Y);
    let P = math.multiply(inverse_XT_X, XT_Y);
    return P;
  };

  const handleClick = () => {
    const result = calculateP(X, Y);
    setResultP0(result[0][0]);
    setResultP1(result[1][0]);
  };

  let X: Matrix = [
    [1, 1],
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
    [1, 9],
    [1, 10],
  ];
  let Y: Matrix = [[10], [18], [22], [27], [36], [49], [56], [64], [70], [78]];

  // let X: Matrix = [
  //   [1, 2],
  //   [1, 3],
  //   [1, 4],
  // ];
  // let Y: Matrix = [[5], [6], [7]];

  // let X: Matrix = [
  //   [1, 2],
  //   [3, 4],
  //   [5, 6],
  // ];
  // let Y: Matrix = [[7], [8], [9]];
  return (
    <div>
      <button onClick={handleClick}>CLICK</button>
      <div>p0 = {resultP0}</div>
      <div>p1 = {resultP1}</div>
    </div>
  );
};

export default Approximation1;
