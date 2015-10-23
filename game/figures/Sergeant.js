'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class Sergeant extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'Sergeant';
    this._icon = 'sergeant.png';
    this._move = 1;
    this._rang = 4;
    this._amount = 4;
  }

}