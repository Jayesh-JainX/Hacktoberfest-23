import React from 'react';
import { X_LABELS, Y_LABELS } from '../utils/boardLabels';

import styles from './BoardLegend.module.scss';

const ChessBoardLegend = ({ activeX, activeY, reversed }) => {
  const legendX = X_LABELS.map((label, x) => {
    return (
      <div
        key={x}
        className={[
          styles.Legend__Item,
          activeX === x ? styles['Legend__Item--Active'] : null
        ].join(' ')}
      >
        {label}
      </div>
    );
  });

  const legendY = Y_LABELS.map((label, y) => {
    return (
      <div
        key={y}
        className={[
          styles.Legend__Item,
          activeY === y ? styles['Legend__Item--Active'] : null
        ].join(' ')}
      >
        {label}
      </div>
    );
  });

  return (
    <div
      className={[
        styles['Legend'],
        reversed === true ? styles['Legend--Reversed'] : null
      ].join(' ')}
    >
      <div
        className={[styles['Legend--Horizontal'], styles['Legend--Top']].join(
          ' '
        )}
      >
        {legendX}
      </div>
      <div
        className={[styles['Legend--Vertical'], styles['Legend--Left']].join(
          ' '
        )}
      >
        {legendY}
      </div>
      <div
        className={[styles['Legend--Vertical'], styles['Legend--Right']].join(
          ' '
        )}
      >
        {legendY}
      </div>
      <div
        className={[
          styles['Legend--Horizontal'],
          styles['Legend--Bottom']
        ].join(' ')}
      >
        {legendX}
      </div>
    </div>
  );
};

export default ChessBoardLegend;
