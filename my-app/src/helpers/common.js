import * as Immutable from 'immutable';

import {
  rowsCount,
  columnsCount,
  UP,
  LEFT,
  DOWN,
  RIGHT
} from './constants.js';

/**
 * @typedef {Immutable.Map} Point
 */

/**
 * @typedef {'UP'|'RIGHT'|'DOWN'|'LEFT'} Direction
 */

/**
 * @param  {number} x
 * @param  {number} y
 * @returns {Point}
 */
function createPoint(x, y) {
  return Immutable.Map({ x, y });
}

/**
 * @param  {Point} a
 * @param  {Point} b
 * @returns {boolean}
 */
function isIntersection(a, b) {
  return a.get('x') === b.get('x') && a.get('y') === b.get('y');
}

/**
 * checks if the snake or its part passes through the food
 * @param  {Point[]} list
 * @param  {Point} point
 * @returns {boolean}
 */
function isListCrossPoint(list, point) {
  return list.some((p) => isIntersection(p, point));
}

/**
 * Returns randon point for the food coordinates
 * @returns {Point}
 */
function getRandomCoordinates() {
  const x = Math.floor(Math.random() * rowsCount);
  const y = Math.floor(Math.random() * columnsCount);
  return createPoint(x, y);
}

/**
 * Returns random coordinates in the box without intersection with
 * @param  {Immutable.List<Point>} list
 * @returns {Point}
 */
function getRandomCoordinatesWithoutIntersectionWith(list) {
  let coordinates;
  do {
    coordinates = getRandomCoordinates();
  } while (isListCrossPoint(list, coordinates));
  return coordinates;
}

/**
 * @param  {Direction} direction
 * @param  {Point} coordinates
 * @returns {Point}
 */
function updateCreator(direction, coordinates) {
  switch (direction) {
    case UP:
      return coordinates.set('y', coordinates.get('y') - 1);
    case RIGHT:
      return coordinates.set('x', coordinates.get('x') + 1);
    case DOWN:
      return coordinates.set('y', coordinates.get('y') + 1);
    case LEFT:
      return coordinates.set('x', coordinates.get('x') - 1);
    default:
      throw new Error('Incorrect direction');
  }
}

/**
 * @param  {Direction} first
 * @param  {Direction} second
 * @returns {boolean}
 */
function isOppositeDirections(first, second) {
  return (
    (first === UP && second === DOWN)
    || (first === DOWN && second === UP)
    || (first === LEFT && second === RIGHT)
    || (first === RIGHT && second === LEFT)
  );
}

/**
 * @param  {Direction} first
 * @param  {Direction} second
 * @returns {boolean}
 */
function isEqualDirections(first, second) {
  return first === second;
}

export {
  createPoint,
  isIntersection,
  isListCrossPoint,
  getRandomCoordinates,
  getRandomCoordinatesWithoutIntersectionWith,
  updateCreator,
  isOppositeDirections,
  isEqualDirections
};
