import * as Immutable from 'immutable';

import {
  rowsCount,
  columnsCount,
  startSnakeLength
} from './constants.js';

import {
  isIntersection,
  isListCrossPoint,
  updateCreator
} from './common.js';

/**
 * @typedef {Immutable.Map} Point
 */

/**
 * @typedef {snake} Snake
 */

/**
 * @typedef {Point} Goal
 */

/**
 * @typedef {'UP'|'RIGHT'|'DOWN'|'LEFT'} Direction
 */

/**
 * @returns {Immutable.List<Point>}
 */
function getSnakeStartBody() {
  return Immutable.fromJS(Array.from(Array(startSnakeLength), (_, x) => ({ y: 0, x })));
}

/**
 * @param  {Snake} snake
 * @param  {Goal} goal
 * @returns {boolean}
 */
function isSnakeAteGoal(snake, goal) {
  const head = snake.last();
  return isIntersection(head, goal);
}

/**
 * @param  {Snake} snake
 * @returns {boolean}
 */
function isSnakeCrossItselft(snake) {
  const head = snake.last();
  return isListCrossPoint(snake.slice(0, -1), head);
}

/**
 * @param  {Snake} snake
 * @returns {boolean}
 */
function isSnakeBeyondTheBoard(snake) {
  return !snake.every((point) => {
    const y = point.get('y');
    const x = point.get('x');
    return (
      x >= 0 && x < rowsCount
      && y >= 0 && y < columnsCount
    );
  });
}

/**
 * @param  {Snake} snake
 * @returns {Snake}
 */
function getAppendedSnake(snake) {
  return snake.unshift(snake.first());
}

/**
 * @param  {Snake} snake
 * @param  {Direction} direction
 * @returns {Snake}
 */
function getUpdatedSnake(snake, direction) {
  const head = snake.last();
  const newHead = updateCreator(direction, head);
  return snake.slice(1).push(newHead);
}

export {
  getSnakeStartBody,
  isSnakeAteGoal,
  isSnakeCrossItselft,
  isSnakeBeyondTheBoard,
  getAppendedSnake,
  getUpdatedSnake
};
