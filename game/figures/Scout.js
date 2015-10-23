'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class Scout extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'Scout';
    this._icon = 'scout.png';
    this._move = 10;
    this._amount = 8;
    this._rang = 2;
  }

}