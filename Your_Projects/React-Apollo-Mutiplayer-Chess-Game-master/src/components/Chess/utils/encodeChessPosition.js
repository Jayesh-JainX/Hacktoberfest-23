import { X_LABELS, Y_LABELS } from './boardLabels';

const encodeChessPosition = (x, y) => {
  return X_LABELS[x] + Y_LABELS[y];
}

export default encodeChessPosition;