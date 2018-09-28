import { NUM_ROWS, NUM_COLS } from '../constants.js';
import { getRandomInt } from '../utils/math-utils.js';
import ReactionTimerGridView from './ReactionTimerGridView.js';

class ReactionTimerGame {
  constructor() {
    this.view = null;
    this.activeCellRow = null;
    this.activeCellRow2 = null;
    this.activeCellCol = null;
    this.activeCellCol2 = null;
    this.currentStartTime = null;
    this.currentEndTime = null;
    this.countUpValue = 0;
  }

  handleRoundStart() {
    const delay = getRandomInt(500, 3000);
    setTimeout(this.startCycle.bind(this), delay);
  }

  startCycle() {
    this.currentStartTime = new Date().getTime(); // milliseconds
    this.view.deactivateCell(this.activeCellRow, this.activeCellCol);
    this.view.deactivateCell(this.activeCellRow2, this.activeCellCol2);
    this.triggerRandomCell();
  }

  triggerRandomCell() {
    for (let i = 0; i < 2; i++) {
      if (i === 0) {
        const randomRowIndex = getRandomInt(0, NUM_ROWS);
        const randomColIndex = getRandomInt(0, NUM_COLS);
        this.activeCellRow = randomRowIndex;
        this.activeCellCol = randomColIndex;
        this.view.activateCell(randomRowIndex, randomColIndex);
      } else {
        const randomRowIndex2 = getRandomInt(0, NUM_ROWS);
        const randomColIndex2 = getRandomInt(0, NUM_COLS);
        this.activeCellRow2 = randomRowIndex2;
        this.activeCellCol2 = randomColIndex2;
        this.view.activateCell(randomRowIndex2, randomColIndex2);
      }
    }
  }

  handleActiveCellSelected() {
    if (this.countUpValue === 0) {
      this.view.deactivateCell(this.activeCellRow, this.activeCellCol);
      this.countUpValue += 1;
    } else {
      this.view.deactivateCell(this.activeCellRow2, this.activeCellCol2);
    }
    this.calculateTime();
  }

  calculateTime() {
    this.currentEndTime = new Date().getTime();
    console.log(this.currentEndTime - this.currentStartTime);
    if (this.countUpValue >= 2) {
      this.countUpValue = 0;
    }
  }

  init() {
    this.view = new ReactionTimerGridView();

    this.view.registerActiveCellSelectedCallback(this.handleActiveCellSelected.bind(this));
    this.view.registerRoundStartCallback(this.handleRoundStart.bind(this));

    this.view.initDomAndListeners();
    this.view.drawGrid();
  }
}

export default ReactionTimerGame;
