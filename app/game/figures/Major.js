'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class Major extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'Major';
    this._icon = 'major.png';
    this._move = 1;
    this._rank = 7;
    this._amount = 3;
  }

}