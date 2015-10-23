'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class Captain extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'Captain';
    this._icon = 'captain.png';
    this._move = 1;
    this._rang = 6;
    this._amount = 4;
  }

}