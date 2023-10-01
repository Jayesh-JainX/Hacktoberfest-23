import { X_LABELS, Y_LABELS } from './boardLabels';

const decodeChessPosition = position => {
  const posArr = position.toUpperCase().split('');
  const x = X_LABELS.indexOf(posArr[0].toUpperCase());
  const y = Y_LABELS.indexOf(posArr[1]);
  return { x, y };
};

export default decodeChessPosition;
