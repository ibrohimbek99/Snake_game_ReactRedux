import * as Immutable from 'immutable';

import {
  matrix
} from './constants.js';

/**
 * Point on the board
 *
 * @typedef {Immutable.Map} Point
 */

/**
 * The board
 *
 * @typedef {Immutable.List<Immutable.List<Point>>} Board
 */

/**
 * Type of the cell
 *
 * @typedef {'EMPTY'|'SNAKE'|'GOAL'|'SNAKEHEAD'} cellType
 */

/**
 * Moves obj to the matrix with value
 *
 * @param  {Board} board
 * @param  {Snake|Goal|Immutable.List<Point>|Point} obj
 * @param  {cellType} value
 */
function imageObjectAtBoard(board, obj, value) {
  let _obj = obj;
  if (!Immutable.List.isList(obj)) {
    _obj = [obj];
  }
  return _obj.reduce((res, point) => {
    const y = point.get('y');
    const x = point.get('x');
    return res.setIn([y, x], value);
  }, board);
}

/**
 * Returns the board with elements
 *
 * @param {...Immutable.List<Point>} objects
 * @returns {Board}
 */
function getBoardWithObjects(objects, board = matrix) {
  return objects.reduce((res, obj) => {
    const [point, type] = obj;
    return imageObjectAtBoard(res, point, type);
  }, board);
}

export {
  getBoardWithObjects
};
