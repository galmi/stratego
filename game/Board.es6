'use strict';

import throwIfMissing from './missingParam';
import Figure from './Figure';

export default class Board {

  /**
   * Board map: figure = side | rank
   * @type {*[]}
   * @private
   */
  _map = [
    [1, 1,  1,  1, 1, 1,  1,  1, 1, 1], // BEGIN Side 1
    [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
    [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
    [1, 1,  1,  1, 1, 1,  1,  1, 1, 1], // END Side 1
    [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
    [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
    [2, 2,  2,  2, 2, 2,  2,  2, 2, 2], // BEGIN Side 2
    [2, 2,  2,  2, 2, 2,  2,  2, 2, 2],
    [2, 2,  2,  2, 2, 2,  2,  2, 2, 2],
    [2, 2,  2,  2, 2, 2,  2,  2, 2, 2]  // END Side 2
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
  static getCell(side, rank) {
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
        throw new Error(`Figure with rank "${rank}" not found`);
    }
  }

  /**
   * Fill map by one side
   * @param map
   * @param side
   */
  fillSideMap(side = throwIfMissing(), map = throwIfMissing()) {
    Board.checkSide(side);
    Board.checkFigures(map);

    var beginItem = (side == 1) ? 0 : 6;
    for (var i in map) {
      this._map[i + beginItem] = map[i];
    }
  }

  /**
   *
   * @param map
   * @param side
   * @returns {boolean}
   */
  static checkFigures(map, side) {
    if (false) {
      throw 'Error';
    }
    return true;
  }

  /**
   * Get map for side. Hide opponent figures.
   * @param side
   * @returns {Array}
   */
  getMap(side) {
    var sideMap = [];
    this._map.forEach((row, i) => {
      sideMap.push([]);
      sideMap[i] = [];
      row.forEach(val => {
        var digit = parseInt(val.toString()[0]);
        if (val >= 10 && digit != side) {
          sideMap[i].push(digit);
        } else {
          sideMap[i].push(val);
        }
      });
    });

    return sideMap;
  }

}