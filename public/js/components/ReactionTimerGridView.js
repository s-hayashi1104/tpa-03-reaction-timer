import { NUM_ROWS, NUM_COLS } from '../constants.js';

class ReactionTimerGridView {
  constructor() {
    this.activeCellElRow = null;
    this.activeCellElCol = null;
    this.activeCellEl2Row = null;
    this.activeCellEl2Col = null;
    this.activeCellClickHandler = this.handleActiveCellClick.bind(this);
    this.callbacks = {};
  }

  initDomAndListeners() {
    document.querySelector('.btn-start')
      .addEventListener('click', this.handleBtnStart.bind(this));
  }

  registerActiveCellSelectedCallback(callback) {
    this.callbacks.handleActiveCellSelected = callback;
  }

  registerRoundStartCallback(callback) {
    this.callbacks.handleRoundStartCallback = callback;
  }

  handleBtnStart() {
    this.callbacks.handleRoundStartCallback();
  }

  getCellId(row, col) {
    return `${row}:${col}`;
  }

  drawGrid() {
    const grid = document.querySelector('#container .grid');

    for (let row = 0; row < NUM_ROWS; row += 1) {
      const rowEl = document.createElement('TR');
      for (let col = 0; col < NUM_COLS; col += 1) {
        const cellEl = document.createElement('TD');
        const position = this.getCellId(row, col);
        cellEl.id = position;
        rowEl.appendChild(cellEl);
      }
      grid.appendChild(rowEl);
    }
  }

  getCellByPosition(rowIndex, colIndex) {
    const cellKey = this.getCellId(rowIndex, colIndex);
    return document.getElementById(cellKey);
  }

  activateCell(rowIndex, colIndex) {
    if (this.activeCellElRow === null) {
      this.activeCellElRow = rowIndex;
      this.activeCellElCol = colIndex;
      const cellEl = this.getCellByPosition(this.activeCellElRow, this.activeCellElCol);
      cellEl.className = 'cell-active';
      cellEl.addEventListener('click', this.activeCellClickHandler);
    } else {
      this.activeCellEl2Row = rowIndex;
      this.activeCellEl2Col = colIndex;
      const cellEl = this.getCellByPosition(this.activeCellEl2Row, this.activeCellEl2Col);
      cellEl.className = 'cell-active';
      cellEl.addEventListener('click', this.activeCellClickHandler);
    }
  }

  deactivateCell(rowIndex, colIndex) {
    if (this.activeCellElRow === rowIndex && this.activeCellElCol === colIndex) {
      this.activeCellElRow = null;
      this.activeCellElCol = null;
    } else {
      this.activeCellEl2Row = null;
      this.activeCellEl2Col = null;
    }
    const cellEl = this.getCellByPosition(rowIndex, colIndex);
    if (cellEl) {
      cellEl.className = '';
      cellEl.removeEventListener('click', this.activeCellClickHandler);
    }
  }

  handleActiveCellClick() {
    this.callbacks.handleActiveCellSelected();
  }
}

export default ReactionTimerGridView;
