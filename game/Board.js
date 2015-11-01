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

  /**
   * Check if sides have moves
   * null - both players exist moves
   * -1 - draw
   * 1 - side 1 is winner
   * 2- side 2 is winner
   * @returns {number}
   */
  checkEndGame() {
    var movesExists = {
      1: 0,
      2: 0
    };
    this._map.forEach((row, i) => {
      row.forEach(cell => {
        var side = Board.getDecSide(cell);
        if (side>0) {
          var figure = Board.getFigure(Board.getRank(cell));
          if (figure.move > 0) {
            movesExists[side] = 1;
          }
        }
      });
    });
    if (movesExists[1] == 0 && movesExists[2] == 0) {
      return -1;
    }
    if (movesExists[1] == 0) {
      return 2;
    }
    if (movesExists[2] == 0) {
      return 1;
    }
    return null;
  }

  /**
   * TODO need useful format
   * @returns {Array}
   */
  checkStartBoard() {
    var figuresLimit = {
      0:  Board.getFigure(0).amount,
      1:  Board.getFigure(1).amount,
      2:  Board.getFigure(2).amount,
      3:  Board.getFigure(3).amount,
      4:  Board.getFigure(4).amount,
      5:  Board.getFigure(5).amount,
      6:  Board.getFigure(6).amount,
      7:  Board.getFigure(7).amount,
      8:  Board.getFigure(8).amount,
      9:  Board.getFigure(9).amount,
      10: Board.getFigure(10).amount,
      11: Board.getFigure(11).amount
    };
    /**
     * 1 level - side
     * 2 level - rank
     * value - count
     * @type {Array}
     */
    var boardFigures = {
      1: new Array(12).fill(0),
      2: new Array(12).fill(0)
    };

    //Collect count of each figures on board
    this._map.forEach((row, i) => {
      row.forEach(cell => {
        var side = Board.getDecSide(cell);
        if (side>0) {
          var rank = Board.getRank(cell);
          boardFigures[side][rank]++;
        }
      });
    });

    var errors = [];
    //Check each side figures
    boardFigures[1].forEach((count, rank) => {
      var side = 1;
      if (figuresLimit[rank] != count) {
        errors.push(`${side}. Rank ${rank}, actual ${count}, excepted ${figuresLimit[rank]}}`);
      }
    });
    boardFigures[2].forEach((count, rank) => {
      var side = 2;
      if (figuresLimit[rank] != count) {
        errors.push(`${side}. Rank ${rank}, actual ${count}, excepted ${figuresLimit[rank]}}`);
      }
    });

    return errors;
  }

  /**
   * Check move is allowed
   * @param xFrom
   * @param yFrom
   * @param xTo
   * @param yTo
   * @returns {boolean}
   */
  canMove(xFrom, yFrom, xTo, yTo) {
    var can = false;
    var toCell = [xTo, yTo];
    var allowedMoves = this.getFigureMoves(xFrom, yFrom);
    allowedMoves.forEach(function (move) {
      if (JSON.stringify(toCell) == JSON.stringify(move)) {
        can = true;
      }
    });

    return can;
  }

  /**
   * Set value of cell
   * @param x
   * @param y
   * @param cell
   * @returns {*}
   */
  setCell(x, y, cell) {
    return this._map[y][x] = cell;
  }

  makeMove(xFrom, yFrom, xTo, yTo) {
    if (this.canMove(xFrom, yFrom, xTo, yTo)) {
      var cell = this.getCell(xFrom, yFrom);
      this.setCell(xTo, yTo, cell);
      this.setCell(xFrom, yFrom, 0);
    }
  }
}