'use strict';

export default class Board {

  _map;

  constructor() {
    this._map = [
      [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
      [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
      [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
      [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
      [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
      [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
      [2, 2,  2,  2, 2, 2,  2,  2, 2, 2],
      [2, 2,  2,  2, 2, 2,  2,  2, 2, 2],
      [2, 2,  2,  2, 2, 2,  2,  2, 2, 2],
      [2, 2,  2,  2, 2, 2,  2,  2, 2, 2]
    ];
  };

  /**
   * Set predefined map
   * @param map
   */
  map(map) {
    this._map = map;
  };

  /**
   * Fill map by one side
   * @param side
   * @param map
   */
  prefillMap(side, map) {
    var beginItem = (side == 1) ? 0 : 6;
    for(var i in map) {
      this._map[i+beginItem] = map[i];
    }
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