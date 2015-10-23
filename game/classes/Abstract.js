'use strict';

/**
 * @property string _icon
 * @property string _name
 * @property integer _move
 */
export default class Abstract {

  constructor(name, icon, move) {
    this._name = name;
    this._icon = icon;
    this._move = move;
  }

  get icon() {
    return this._icon;
  }

  set icon(value) {
    this._icon = value;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }

  get move() {
    return this._move;
  }
}