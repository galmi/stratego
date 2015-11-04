'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class General extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'General';
    this._icon = 'general.png';
    this._move = 1;
    this._rank = 9;
    this._amount = 1;
  }

}