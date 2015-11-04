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

  describe('checkEndGame', function () {
    it('Draw', function () {
      var defaultMap = [
        [0, 0b011011, 0b010000, 0b011011, 0, 0, 0, 0, 0, 0], // BEGIN Side 1
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // END Side 1
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // BEGIN Side 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0b101011, 0b100000, 0b101011, 0, 0, 0, 0, 0, 0]  // END Side 2
      ];
      var board = new Board();
      board.map = defaultMap;
      var isEndGame = board.checkEndGame();
      assert.equal(isEndGame, -1);
    });

    it('Side 1 is win', function () {
      var defaultMap = [
        [0, 0b011011, 0b010000, 0b011011, 0b011001, 0, 0, 0, 0, 0], // BEGIN Side 1
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // END Side 1
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // BEGIN Side 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0b101011, 0b100000, 0b101011, 0, 0, 0, 0, 0, 0]  // END Side 2
      ];
      var board = new Board();
      board.map = defaultMap;
      var isEndGame = board.checkEndGame();
      assert.equal(isEndGame, 1);
    });

    it('Side 2 is win', function () {
      var defaultMap = [
        [0, 0b011011, 0b010000, 0b011011, 0, 0, 0, 0, 0, 0], // BEGIN Side 1
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // END Side 1
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // BEGIN Side 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0b101011, 0b100000, 0b101011, 0b101001, 0, 0, 0, 0, 0]  // END Side 2
      ];
      var board = new Board();
      board.map = defaultMap;
      var isEndGame = board.checkEndGame();
      assert.equal(isEndGame, 2);
    });

    it('Players have moves', function () {
      var defaultMap = [
        [0, 0b011011, 0b010000, 0b011011, 0b011001, 0, 0, 0, 0, 0], // BEGIN Side 1
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // END Side 1
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], // BEGIN Side 2
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0b101011, 0b100000, 0b101011, 0b101001, 0, 0, 0, 0, 0]  // END Side 2
      ];
      var board = new Board();
      board.map = defaultMap;
      var isEndGame = board.checkEndGame();
      assert.equal(isEndGame, null);
    });
  });

  describe('checkStartBoard', function () {
    it('Start board with all 40 figures', function () {
      var defaultMap = [
        [0b010000, 0b010001, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010], // BEGIN Side 1
        [0b010011, 0b010011, 0b010011, 0b010011, 0b010011, 0b010100, 0b010100, 0b010100, 0b010100, 0b010101],
        [0b010101, 0b010101, 0b010101, 0b010110, 0b010110, 0b010110, 0b010110, 0b010111, 0b010111, 0b010111],
        [0b011000, 0b011000, 0b011001, 0b011010, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011], // END Side 1
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0b100000, 0b100001, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010], // BEGIN Side 2
        [0b100011, 0b100011, 0b100011, 0b100011, 0b100011, 0b100100, 0b100100, 0b100100, 0b100100, 0b100101],
        [0b100101, 0b100101, 0b100101, 0b100110, 0b100110, 0b100110, 0b100110, 0b100111, 0b100111, 0b100111],
        [0b101000, 0b101000, 0b101001, 0b101010, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011] // END Side 2
      ];
      var board = new Board();
      board.map = defaultMap;
      var check = board.checkStartBoard();

      assert.deepEqual(check, []);
    });
  });

  describe('canMove', function () {
    it('Figure move is allowed', function () {
      var defaultMap = [
        [0b010000, 0b010001, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010], // BEGIN Side 1
        [0b010011, 0b010011, 0b010011, 0b010011, 0b010011, 0b010100, 0b010100, 0b010100, 0b010100, 0b010101],
        [0b010101, 0b010101, 0b010101, 0b010110, 0b010110, 0b010110, 0b010110, 0b010111, 0b010111, 0b010111],
        [0b011000, 0b011000, 0b011001, 0b011010, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011], // END Side 1
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0b100000, 0b100001, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010], // BEGIN Side 2
        [0b100011, 0b100011, 0b100011, 0b100011, 0b100011, 0b100100, 0b100100, 0b100100, 0b100100, 0b100101],
        [0b100101, 0b100101, 0b100101, 0b100110, 0b100110, 0b100110, 0b100110, 0b100111, 0b100111, 0b100111],
        [0b101000, 0b101000, 0b101001, 0b101010, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011] // END Side 2
      ];
      var board = new Board();
      board.map = defaultMap;
      var check = board.canMove(1, 3, 1, 4);

      assert.equal(check, true);
    });

    it('Figure move is not allowed', function () {
      var defaultMap = [
        [0b010000, 0b010001, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010], // BEGIN Side 1
        [0b010011, 0b010011, 0b010011, 0b010011, 0b010011, 0b010100, 0b010100, 0b010100, 0b010100, 0b010101],
        [0b010101, 0b010101, 0b010101, 0b010110, 0b010110, 0b010110, 0b010110, 0b010111, 0b010111, 0b010111],
        [0b011000, 0b011000, 0b011001, 0b011010, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011], // END Side 1
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0b100000, 0b100001, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010], // BEGIN Side 2
        [0b100011, 0b100011, 0b100011, 0b100011, 0b100011, 0b100100, 0b100100, 0b100100, 0b100100, 0b100101],
        [0b100101, 0b100101, 0b100101, 0b100110, 0b100110, 0b100110, 0b100110, 0b100111, 0b100111, 0b100111],
        [0b101000, 0b101000, 0b101001, 0b101010, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011] // END Side 2
      ];
      var board = new Board();
      board.map = defaultMap;
      var check = board.canMove(2, 3, 1, 4);

      assert.equal(check, false);
    });
  });

  describe('setCell', function () {
    it('Set cell', function () {
      var defaultMap = [
        [0b010000, 0b010001, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010], // BEGIN Side 1
        [0b010011, 0b010011, 0b010011, 0b010011, 0b010011, 0b010100, 0b010100, 0b010100, 0b010100, 0b010101],
        [0b010101, 0b010101, 0b010101, 0b010110, 0b010110, 0b010110, 0b010110, 0b010111, 0b010111, 0b010111],
        [0b011000, 0b011000, 0b011001, 0b011010, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011], // END Side 1
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0b100000, 0b100001, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010], // BEGIN Side 2
        [0b100011, 0b100011, 0b100011, 0b100011, 0b100011, 0b100100, 0b100100, 0b100100, 0b100100, 0b100101],
        [0b100101, 0b100101, 0b100101, 0b100110, 0b100110, 0b100110, 0b100110, 0b100111, 0b100111, 0b100111],
        [0b101000, 0b101000, 0b101001, 0b101010, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011] // END Side 2
      ];
      var board = new Board();
      board.map = defaultMap;
      var check = board.setCell(2, 3, 0);

      var expectedMap = [
        [0b010000, 0b010001, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010], // BEGIN Side 1
        [0b010011, 0b010011, 0b010011, 0b010011, 0b010011, 0b010100, 0b010100, 0b010100, 0b010100, 0b010101],
        [0b010101, 0b010101, 0b010101, 0b010110, 0b010110, 0b010110, 0b010110, 0b010111, 0b010111, 0b010111],
        [0b011000, 0b011000, 0,        0b011010, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011], // END Side 1
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0, 0, -1, -1, 0, 0, -1, -1, 0, 0],
        [0b100000, 0b100001, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010], // BEGIN Side 2
        [0b100011, 0b100011, 0b100011, 0b100011, 0b100011, 0b100100, 0b100100, 0b100100, 0b100100, 0b100101],
        [0b100101, 0b100101, 0b100101, 0b100110, 0b100110, 0b100110, 0b100110, 0b100111, 0b100111, 0b100111],
        [0b101000, 0b101000, 0b101001, 0b101010, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011] // END Side 2
      ];
      assert.deepEqual(board.map, expectedMap);
    });
  });

  describe('makeMove', function() {
    it('Make move', function() {
      var defaultMap = [
        [0b010000, 0b010001, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010], // BEGIN Side 1
        [0b010011, 0b010011, 0b010011, 0b010011, 0b010011, 0b010100, 0b010100, 0b010100, 0b010100, 0b010101],
        [0b010101, 0b010101, 0b010101, 0b010110, 0b010110, 0b010110, 0b010110, 0b010111, 0b010111, 0b010111],
        [0b011000, 0b011000, 0b011001, 0b011010, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011], // END Side 1
        [0,        0,        -1, -1, 0, 0, -1, -1, 0, 0],
        [0,        0,        -1, -1, 0, 0, -1, -1, 0, 0],
        [0b100000, 0b100001, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010], // BEGIN Side 2
        [0b100011, 0b100011, 0b100011, 0b100011, 0b100011, 0b100100, 0b100100, 0b100100, 0b100100, 0b100101],
        [0b100101, 0b100101, 0b100101, 0b100110, 0b100110, 0b100110, 0b100110, 0b100111, 0b100111, 0b100111],
        [0b101000, 0b101000, 0b101001, 0b101010, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011] // END Side 2
      ];
      var expectedMap = [
        [0b010000, 0b010001, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010], // BEGIN Side 1
        [0b010011, 0b010011, 0b010011, 0b010011, 0b010011, 0b010100, 0b010100, 0b010100, 0b010100, 0b010101],
        [0b010101, 0b010101, 0b010101, 0b010110, 0b010110, 0b010110, 0b010110, 0b010111, 0b010111, 0b010111],
        [0,        0b011000, 0b011001, 0b011010, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011], // END Side 1
        [0b011000, 0,        -1, -1, 0, 0, -1, -1, 0, 0],
        [0,        0,        -1, -1, 0, 0, -1, -1, 0, 0],
        [0b100000, 0b100001, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010], // BEGIN Side 2
        [0b100011, 0b100011, 0b100011, 0b100011, 0b100011, 0b100100, 0b100100, 0b100100, 0b100100, 0b100101],
        [0b100101, 0b100101, 0b100101, 0b100110, 0b100110, 0b100110, 0b100110, 0b100111, 0b100111, 0b100111],
        [0b101000, 0b101000, 0b101001, 0b101010, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011] // END Side 2
      ];
      var board = new Board();
      board.map = defaultMap;
      board.makeMove(0, 3, 0, 4);

      assert.deepEqual(board.map, expectedMap);
    });

    it('Spy make move', function() {
      var defaultMap = [
        [0b010000, 0b010001, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010], // BEGIN Side 1
        [0b010011, 0b010011, 0b010011, 0b010011, 0b010011, 0b010100, 0b010100, 0b010100, 0b010100, 0b010101],
        [0b010101, 0b010101, 0b010101, 0b010110, 0b010110, 0b010110, 0b010110, 0b010111, 0b010111, 0b010111],
        [0b011000, 0b011000, 0b011001, 0b011010, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011], // END Side 1
        [0,        0,        -1, -1, 0, 0, -1, -1, 0, 0],
        [0,        0,        -1, -1, 0, 0, -1, -1, 0, 0],
        [0b100000, 0b100010, 0b100001, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010], // BEGIN Side 2
        [0b100011, 0b100011, 0b100011, 0b100011, 0b100011, 0b100100, 0b100100, 0b100100, 0b100100, 0b100101],
        [0b100101, 0b100101, 0b100101, 0b100110, 0b100110, 0b100110, 0b100110, 0b100111, 0b100111, 0b100111],
        [0b101000, 0b101000, 0b101001, 0b101010, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011] // END Side 2
      ];
      var expectedMap = [
        [0b010000, 0b010001, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010, 0b010010], // BEGIN Side 1
        [0b010011, 0b010011, 0b010011, 0b010011, 0b010011, 0b010100, 0b010100, 0b010100, 0b010100, 0b010101],
        [0b010101, 0b010101, 0b010101, 0b010110, 0b010110, 0b010110, 0b010110, 0b010111, 0b010111, 0b010111],
        [0b011000, 0b100010, 0b011001, 0b011010, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011, 0b011011], // END Side 1
        [0,        0,        -1, -1, 0, 0, -1, -1, 0, 0],
        [0,        0,        -1, -1, 0, 0, -1, -1, 0, 0],
        [0b100000, 0,        0b100001, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010, 0b100010], // BEGIN Side 2
        [0b100011, 0b100011, 0b100011, 0b100011, 0b100011, 0b100100, 0b100100, 0b100100, 0b100100, 0b100101],
        [0b100101, 0b100101, 0b100101, 0b100110, 0b100110, 0b100110, 0b100110, 0b100111, 0b100111, 0b100111],
        [0b101000, 0b101000, 0b101001, 0b101010, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011, 0b101011] // END Side 2
      ];
      var board = new Board();
      board.changeSide();
      board.map = defaultMap;
      board.makeMove(1, 6, 1, 3);

      assert.deepEqual(board.map, expectedMap);
    });
  });

  describe('changeSide', function() {
    it('Change side', function() {
      var board = new Board();
      assert.equal(board.side, 1, 'Default side must be 1');

      board.changeSide();
      assert.equal(board.side, 2, 'Changed side to 2');
    });
  });
});
