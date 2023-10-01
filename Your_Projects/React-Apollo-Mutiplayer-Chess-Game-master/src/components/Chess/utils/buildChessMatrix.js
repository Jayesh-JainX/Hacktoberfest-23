const buildChessMatrix = (size) => {
  const matrix = new Array(size);
  for (let i = 0; i < 8; i++) {
    matrix[i] = new Array(size).fill(null);
  }
  return matrix;
}

export default buildChessMatrix;