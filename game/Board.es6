'use strict';

import Figure from './Figure';

export default class Board {

  /**
   * Board map: figure = side | rank
   * @type {*[]}
   * @private
   */
  _map = [
    [0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000], // BEGIN Side 1
    [0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000],
    [0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000],
    [0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000], // END Side 1
    [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
    [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
    [0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000], // BEGIN Side 2
    [0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000],
    [0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000],
    [0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000]  // END Side 2
  ];

  constructor() {};

  /**
   * Getter map
   * @returns {[]}
   */
  get map() {
    return this._map;
  }

  /**
   * Setter map
   * @param {[]} value
   */
  set map(value) {
    this._map = value;
  };

  /**
   * Check allowed values of side
   * @param side
   */
  static checkSide(side) {
    if (side!=1 && side!=2) {
      throw new RangeError('Side should be 1 or 2');
    }
  }

  /**
   * Get binary representation of side
   * @param side {number}
   * @returns {number}
   */
  static getBinSide(side) {
    Board.checkSide(side);

    return side << 4;
  }

  /**
   * Get decimal value Side from cell
   * @param cell
   * @returns {number}
   */
  static getDecSide(cell) {
    return cell >> 4;
  }

  /**
   * Get Rank value from cell
   * @param cell
   * @returns {number}
   */
  static getRank(cell) {
    return Board.getBinSide(Board.getDecSide(cell))^cell;
  }

  /**
   * Get Cell - side with rank
   * @param side
   * @param rank
   * @returns {number}
   */
  static getCellValue(side, rank) {
    return Board.getBinSide(side) | rank;
  }

  /**
   * Get figure by rank
   * @param rank
   * @returns {Flag}
   */
  static getFigure(rank) {
    switch (rank) {
      case 0:
        return new Figure.Flag();
      case 1:
        return new Figure.Spy();
      case 2:
        return new Figure.Scout();
      case 3:
        return new Figure.Miner();
      case 4:
        return new Figure.Sergeant();
      case 5:
        return new Figure.Lieutenant();
      case 6:
        return new Figure.Captain();
      case 7:
        return new Figure.Major();
      case 8:
        return new Figure.Colonel();
      case 9:
        return new Figure.General();
      case 10:
        return new Figure.Marshal();
      case 11:
        return new Figure.Bomb();
      default:
        return null;
    }
  }

  /**
   * Get Cell value by coords
   * @param x
   * @param y
   * @returns {*}
   */
  getCell(x, y) {
    return this._map[y][x];
  }

  /**
   * Fill map by one side
   * @param side
   * @param map
   * @returns {boolean}
   */
  fillSideMap(side, map) {
    Board.checkSide(side);

    var beginRow = (side == 1) ? 0 : 6;
    map.forEach(function(mapRow, rowIndex) {
      this._map[rowIndex + beginRow] = mapRow.map(item => Board.getCellValue(side, item));
    }, this);
    return true;
  }

  /**
   * Get map for side. Hide opponent figures.
   * @param side
   * @returns {Array}
   */
  getSideMap(side) {
    var sideMap = [];
    this._map.forEach((row, i) => {
      sideMap.push([]);
      sideMap[i] = [];
      row.forEach(val => {
        var cellSide = Board.getDecSide(val);
        try {
          Board.checkSide(cellSide);
        } catch (e) {
          cellSide = side;
        }
        if (cellSide != side) {
          sideMap[i].push(Board.getBinSide(cellSide));
        } else {
          sideMap[i].push(val);
        }
      });
    });

    return sideMap;
  }

  /**
   * Get allowed cells for next step
   * @param x
   * @param y
   */
  getFigureMoves(x, y) {
    var cell = this.getCell(x, y);
    var side = Board.getDecSide(cell);
    var figure = Board.getFigure(Board.getRank(cell));

    var countSteps = figure.move;

    var allowedCells = [];
    var newX, newY, newCell, newCellSide, i;
    //move -x
    newX = x;
    for (i = 1; i <= countSteps; i++) {
      newX--;
      if (newX >= 0) {
        newCell = this.getCell(newX, y);
        newCellSide = Board.getDecSide(newCell);
        if (newCell!=-1 && (newCellSide == 0 || newCellSide != side)) {
          allowedCells.push([newX, y]);
        }
        if (newCellSide != 0) {
          i = countSteps;
        }
      } else {
        break;
      }
    }
    //move +x
    newX = x;
    for (i = 1; i <= countSteps; i++) {
      newX++;
      if (newX < this._map.length) {
        newCell = this.getCell(newX, y);
        newCellSide = Board.getDecSide(newCell);
        if (newCell!=-1 && (newCellSide == 0 || newCellSide != side)) {
          allowedCells.push([newX, y]);
        }
        if (newCellSide != 0) {
          i = countSteps;
        }
      } else {
        break;
      }
    }
    //move -y
    newY = y;
    for (i = 1; i <= countSteps; i++) {
      newY--;
      if (newY >= 0) {
        newCell = this.getCell(x, newY);
        newCellSide = Board.getDecSide(newCell);
        if (newCell!=-1 && (newCellSide == 0 || newCellSide != side)) {
          allowedCells.push([x, newY]);
        }
        if (newCellSide != 0) {
          i = countSteps;
        }
      } else {
        break;
      }
    }
    //move +y
    newY = y;
    for (i = 1; i <= countSteps; i++) {
      newY++;
      if (newY < this._map.length) {
        newCell = this.getCell(x, newY);
        newCellSide = Board.getDecSide(newCell);
        if (newCell!=-1 && (newCellSide == 0 || newCellSide != side)) {
          allowedCells.push([x, newY]);
        }
        if (newCellSide != 0) {
          i = countSteps;
        }
      } else {
        break;
      }
    }

    return allowedCells;
  }


}