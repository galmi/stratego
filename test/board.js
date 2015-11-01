'use strict';
import Board from '../game/Board';
import Figure from '../game/Figure';

var assert = require('assert');
describe('Board', function(){

  describe('defaultMap', function() {
    var board = new Board();
    var defaultMap = [
      [0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000], // BEGIN Side 1
      [0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000],
      [0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000],
      [0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000,  0b010000,  0b010000, 0b010000, 0b010000], // END Side 1
      [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
      [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
      [0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000], // BEGIN Side 2
      [0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000],
      [0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000],
      [0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000,  0b100000,  0b100000, 0b100000, 0b100000]  // END Side 2
    ];
    it('Check default map value', function() {
      assert.deepEqual(board.map, defaultMap, 'Default map is not equals');
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

  describe('getCellValue', function() {
    it('Get Cell - side with rank', function() {
      assert.equal(Board.getCellValue(2, 3), 0b100011);
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

  describe('fillSideMap', function() {
    it('Fill map by 1 side', function() {
      var board = new Board();
      var prefilledMap = [
        [11, 11,  11,  2, 10, 1,  1,  1, 1, 1],
        [10,  0,   9,  1,  9, 1,  1,  1, 1, 1],
        [11, 11,  10,  7, 13, 1,  1,  1, 1, 1],
        [12, 12,   6,  2,  9, 1,  1,  1, 1, 1]
      ];
      var expected = [ [ 27, 27, 27, 18, 26, 17, 17, 17, 17, 17 ],
        [ 26, 16, 25, 17, 25, 17, 17, 17, 17, 17 ],
        [ 27, 27, 26, 23, 29, 17, 17, 17, 17, 17 ],
        [ 28, 28, 22, 18, 25, 17, 17, 17, 17, 17 ],
        [ 0, 0, -1, -1, 0, 0, -1, -1, 0, 0 ],
        [ 0, 0, -1, -1, 0, 0, -1, -1, 0, 0 ],
        [ 32, 32, 32, 32, 32, 32, 32, 32, 32, 32 ],
        [ 32, 32, 32, 32, 32, 32, 32, 32, 32, 32 ],
        [ 32, 32, 32, 32, 32, 32, 32, 32, 32, 32 ],
        [ 32, 32, 32, 32, 32, 32, 32, 32, 32, 32 ] ];
      board.fillSideMap(1, prefilledMap);

      assert.deepEqual(board.map, expected);
    });

    it('Fill map by 2 side', function() {
      var board = new Board();
      var prefilledMap = [
        [11, 11,  11,  2, 10, 1,  1,  1, 1, 1],
        [10,  0,   9,  1,  9, 1,  1,  1, 1, 1],
        [11, 11,  10,  7, 13, 1,  1,  1, 1, 1],
        [12, 12,   6,  2,  9, 1,  1,  1, 1, 1]
      ];
      var expected = [ [ 16, 16, 16, 16, 16, 16, 16, 16, 16, 16 ],
          [ 16, 16, 16, 16, 16, 16, 16, 16, 16, 16 ],
          [ 16, 16, 16, 16, 16, 16, 16, 16, 16, 16 ],
          [ 16, 16, 16, 16, 16, 16, 16, 16, 16, 16 ],
          [ 0, 0, -1, -1, 0, 0, -1, -1, 0, 0 ],
          [ 0, 0, -1, -1, 0, 0, -1, -1, 0, 0 ],
          [ 43, 43, 43, 34, 42, 33, 33, 33, 33, 33 ],
          [ 42, 32, 41, 33, 41, 33, 33, 33, 33, 33 ],
          [ 43, 43, 42, 39, 45, 33, 33, 33, 33, 33 ],
          [ 44, 44, 38, 34, 41, 33, 33, 33, 33, 33 ] ];
      board.fillSideMap(2, prefilledMap);
      assert.deepEqual(board.map, expected);
    });
  });

  describe('getSideMap', function() {
    var defaultMap = [
      [ 27, 27, 27, 18, 26, 17, 17, 17, 17, 17 ],
      [ 26, 16, 25, 17, 25, 17, 17, 17, 17, 17 ],
      [ 27, 27, 26, 23, 29, 17, 17, 17, 17, 17 ],
      [ 28, 28, 22, 18, 25, 17, 17, 17, 17, 17 ],
      [ 0, 0, -1, -1, 0, 0, -1, -1, 0, 0 ],
      [ 0, 0, -1, -1, 0, 0, -1, -1, 0, 0 ],
      [ 43, 43, 43, 34, 42, 33, 33, 33, 33, 33 ],
      [ 42, 32, 41, 33, 41, 33, 33, 33, 33, 33 ],
      [ 43, 43, 42, 39, 45, 33, 33, 33, 33, 33 ],
      [ 44, 44, 38, 34, 41, 33, 33, 33, 33, 33 ]
    ];

    it('Get map for side 1', function() {
      var board = new Board();
      board.map = defaultMap;
      var side1map = [
        [27, 27, 27, 18, 26, 17, 17, 17, 17, 17],
        [26, 16, 25, 17, 25, 17, 17, 17, 17, 17],
        [27, 27, 26, 23, 29, 17, 17, 17, 17, 17],
        [28, 28, 22, 18, 25, 17, 17, 17, 17, 17],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
        [32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
        [32, 32, 32, 32, 32, 32, 32, 32, 32, 32],
        [32, 32, 32, 32, 32, 32, 32, 32, 32, 32]
      ];
      var sideMap = board.getSideMap(1);
      assert.deepEqual(sideMap, side1map, 'Not equals');
    });

    it('Get map for side 2', function() {
      var board = new Board();
      board.map = defaultMap;
      var side2map = [
        [16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
        [16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
        [16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
        [16, 16, 16, 16, 16, 16, 16, 16, 16, 16],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [43, 43, 43, 34, 42, 33, 33, 33, 33, 33],
        [42, 32, 41, 33, 41, 33, 33, 33, 33, 33],
        [43, 43, 42, 39, 45, 33, 33, 33, 33, 33],
        [44, 44, 38, 34, 41, 33, 33, 33, 33, 33]
      ];
      var sideMap = board.getSideMap(2);
      assert.deepEqual(sideMap, side2map, 'Not equals');
    });
  });

  describe('getFigureMoves', function() {
    var defaultMap = [
      [ 27, 27, 27, 18, 26, 17, 17, 17, 17, 17 ],
      [ 26, 16, 25, 17, 25, 17, 17, 17, 17, 17 ],
      [ 27, 27, 26, 23, 29, 17, 17, 17, 17, 17 ],
      [ 27, 25, 22, 18, 34, 17, 17, 17, 17, 17 ],
      [ 0,   0, -1, -1,  0,  0, -1, -1,  0,  0 ],
      [ 0,   0, -1, -1,  0,  0, -1, -1,  0,  0 ],
      [ 43, 43, 43, 34, 42, 33, 33, 33, 33, 33 ],
      [ 42, 32, 41, 33, 41, 33, 33, 33, 33, 33 ],
      [ 43, 43, 42, 39, 45, 33, 33, 33, 33, 33 ],
      [ 44, 44, 38, 34, 41, 33, 33, 33, 33, 33 ]
    ];

    it('Get figure moves', function() {
      var board = new Board();
      board.map = defaultMap;
      var moves = board.getFigureMoves(1, 3);
      assert.deepEqual(moves, [ [ 1, 4 ] ]);

      moves = board.getFigureMoves(0, 3);
      assert.deepEqual(moves, [  ]);

      moves = board.getFigureMoves(4, 3);
      assert.deepEqual(moves, [ [ 3, 3 ], [ 5, 3 ], [ 4, 2 ], [ 4, 4 ], [ 4, 5 ] ]);
    });
  });
});
