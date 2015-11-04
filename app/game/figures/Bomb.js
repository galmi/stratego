'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class Bomb extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'Bomb';
    this._icon = 'bomb.png';
    this._move = 0;
    this._rank = 11;
    this._amount = 6;
  }

}