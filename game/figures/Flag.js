'use strict';

import Abstract from './Abstract';

/**
 * @extends Abstract
 */
export default class Flag extends Abstract{

  constructor(side) {
    super(side);

    this._name = 'Flag';
    this._icon = 'flag.png';
    this._move = 0;
    this._rang = 0;
    this._amount = 1;
  }

}