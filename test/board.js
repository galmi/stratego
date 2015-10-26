'use strict';
import Board from '../game/Board';
import Figure from '../game/Figure';

var assert = require('assert');
describe('Board', function(){

  describe('defaultMap', function() {
    var board = new Board();
    var defaultMap = [
      [1, 1,  1,  1, 1, 1,  1,  1, 1, 1], // BEGIN Side 1
      [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
      [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
      [1, 1,  1,  1, 1, 1,  1,  1, 1, 1], // END Side 1
      [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
      [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
      [2, 2,  2,  2, 2, 2,  2,  2, 2, 2], // BEGIN Side 2
      [2, 2,  2,  2, 2, 2,  2,  2, 2, 2],
      [2, 2,  2,  2, 2, 2,  2,  2, 2, 2],
      [2, 2,  2,  2, 2, 2,  2,  2, 2, 2]  // END Side 2
    ];
    it('Check default map value', function() {
      assert.deepEqual(board.map, defaultMap, 'Default map is not equals');
    });
  });

  describe('getMap', function() {
    var board = new Board();
    board.map = [
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      [10, 10, 10, 10, 10, 10, 10, 10, 10, 10],
      [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
      [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
      [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
      [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
      [20, 20, 20, 20, 20, 20, 20, 20, 20, 20],
      [20, 20, 20, 20, 20, 20, 20, 20, 20, 20]
    ];

    it('Side 1 map must be partial', function() {
      var side1map = [
        [10, 10,  10,  10, 10, 10,  10,  10, 10, 10],
        [10, 10,  10,  10, 10, 10,  10,  10, 10, 10],
        [10, 10,  10,  10, 10, 10,  10,  10, 10, 10],
        [10, 10,  10,  10, 10, 10,  10,  10, 10, 10],
        [ 0,  0,  -1,  -1,  0,  0,  -1,  -1,  0,  0],
        [ 0,  0,  -1,  -1,  0,  0,  -1,  -1,  0,  0],
        [2, 2,  2,  2, 2, 2,  2,  2, 2, 2],
        [2, 2,  2,  2, 2, 2,  2,  2, 2, 2],
        [2, 2,  2,  2, 2, 2,  2,  2, 2, 2],
        [2, 2,  2,  2, 2, 2,  2,  2, 2, 2]
      ];
      var sideMap = board.getMap(1);
      assert.deepEqual(sideMap, side1map, 'Not equals');
    });

    it('Side 2 map must be partial', function() {
      var side2map = [
        [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
        [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
        [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
        [1, 1,  1,  1, 1, 1,  1,  1, 1, 1],
        [ 0,  0,  -1,  -1,  0,  0,  -1,  -1,  0,  0],
        [ 0,  0,  -1,  -1,  0,  0,  -1,  -1,  0,  0],
        [20, 20,  20,  20, 20, 20,  20,  20, 20, 20],
        [20, 20,  20,  20, 20, 20,  20,  20, 20, 20],
        [20, 20,  20,  20, 20, 20,  20,  20, 20, 20],
        [20, 20,  20,  20, 20, 20,  20,  20, 20, 20]
      ];
      var sideMap = board.getMap(2);
      assert.deepEqual(sideMap, side2map, 'Not equals');
    });

  });

  describe('checkSide', function() {
    it('Side alowed 1 or 2', function() {
      assert.throws(function() {
        Board.checkSide(3)
      }, RangeError);
    });
  });

  describe('getBinSide', function() {
    it('Get binary representation of side 1', function() {
      assert.equal(Board.getBinSide(1), 16);
    });
    it('Get binary representation of side 2', function() {
      assert.equal(Board.getBinSide(2), 32);
    });
  });

  describe('getDecSide', function() {
    it('Get decimal value Side from cell', function() {
      assert.equal(Board.getDecSide(0b100011), 2);
    });
  });

  describe('getRank', function() {
    it('Get Rank value from cell', function() {
      assert.equal(Board.getRank(0b100011), 3);
    });
  });

  describe('getCell', function() {
    it('Get Cell - side with rank', function() {
      assert.equal(Board.getCell(2, 3), 0b100011);
    });
  });

  describe('getFigure', function() {
    it('Get figure Flag', function() {
      assert.equal(Board.getFigure(0) instanceof Figure.Flag, true);
    });
    it('Get figure Spy', function() {
      assert.equal(Board.getFigure(1) instanceof Figure.Spy, true);
    });
    it('Get figure Scout', function() {
      assert.equal(Board.getFigure(2) instanceof Figure.Scout, true);
    });
    it('Get figure Miner', function() {
      assert.equal(Board.getFigure(3) instanceof Figure.Miner, true);
    });
    it('Get figure Sergeant', function() {
      assert.equal(Board.getFigure(4) instanceof Figure.Sergeant, true);
    });
    it('Get figure Lieutenant', function() {
      assert.equal(Board.getFigure(5) instanceof Figure.Lieutenant, true);
    });
    it('Get figure Captain', function() {
      assert.equal(Board.getFigure(6) instanceof Figure.Captain, true);
    });
    it('Get figure Major', function() {
      assert.equal(Board.getFigure(7) instanceof Figure.Major, true);
    });
    it('Get figure Colonel', function() {
      assert.equal(Board.getFigure(8) instanceof Figure.Colonel, true);
    });
    it('Get figure General', function() {
      assert.equal(Board.getFigure(9) instanceof Figure.General, true);
    });
    it('Get figure Marshal', function() {
      assert.equal(Board.getFigure(10) instanceof Figure.Marshal, true);
    });
    it('Get figure Bomb', function() {
      assert.equal(Board.getFigure(11) instanceof Figure.Bomb, true);
    });
  });

  describe('prefillMap', function() {
    var board = new Board();
    var prefilledMap = [
      [11, 12,  11,  13, 17, 1,  1,  1, 1, 1],
      [10, 14,  12,  12, 11, 1,  1,  1, 1, 1],
      [11, 13,  13,  12, 13, 1,  1,  1, 1, 1],
      [12, 12,  14,  14, 14, 1,  1,  1, 1, 1]
    ];
    //assert.throws(board.prefillMap());
  });
});
