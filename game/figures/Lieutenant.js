'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class Lieutenant extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'Lieutenant';
    this._icon = 'lieutenant.png';
    this._move = 1;
    this._rang = 5;
    this._amount = 4;
  }

}