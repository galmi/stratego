'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class Marshal extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'Marshal';
    this._icon = 'marshal.png';
    this._move = 1;
    this._rank = 10;
    this._amount = 1;
  }

}