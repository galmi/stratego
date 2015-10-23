'use strict';

/**
 * @property {string} _icon     - Иконка
 * @property {string} _name     - Название
 * @property {number} _move     - Количество клеток за ход
 * @property {number} _amount   - Максимальное количетсво на доске
 * @property {number} _rang     - Ранг
 * @property {number} _side     - Сторона за которую играет фигура
 */
export default class Abstract {

  _name;
  _icon;
  _move;
  _amount;
  _rang;
  _side;

  constructor(side) {
    this._move = 1;
    this._side = side;
  }

  /**
   * @returns {string} _icon
   */
  get icon() {
    return this._icon;
  }

  /**
   * @param {string} value
   */
  set icon(value) {
    this._icon = value;
  }

  /**
   * @returns {string} _name
   */
  get name() {
    return this._name;
  }

  /**
   * @param {string} value
   */
  set name(value) {
    this._name = value;
  }

  /**
   * @returns {number} _move
   */
  get move() {
    return this._move;
  }

  /**
   * @returns {number} _amount
   */
  get amount() {
    return this._amount;
  }

  /**
   * @returns {number} _rang
   */
  get rang() {
    return this._rang;
  }

  /**
   * @returns {number}
   */
  get side() {
    return this._side;
  }
}