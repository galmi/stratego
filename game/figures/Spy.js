'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class Spy extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'Spy';
    this._icon = 'spy.png';
    this._move = 1;
    this._amount = 1;
    this._rank = 1;
  }

}