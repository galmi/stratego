'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class Colonel extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'Colonel';
    this._icon = 'colonel.png';
    this._move = 1;
    this._rang = 8;
    this._amount = 2;
  }

}