'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class Miner extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'Miner';
    this._icon = 'miner.png';
    this._move = 1;
    this._amount = 5;
    this._rank = 3;
  }

}