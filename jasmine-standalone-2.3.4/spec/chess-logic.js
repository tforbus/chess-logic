describe('chess-logic', function () {
    it('should not be null', function () {
        expect(chessLogic).not.toBe(null);
    });
});

describe('coordinates', function () {
    it('should be an array', function () {
        expect(Array.isArray(chessLogic._private.coordinates)).toBe(true);
    });

    it('should have length 64', function () {
        expect(chessLogic._private.coordinates.length).toBe(64);
    });

    it('should contain the coordinates a1 and h8', function () {
        expect(chessLogic._private.coordinates[0]).toBe('a1');
        expect(chessLogic._private.coordinates[63]).toBe('h8');
    });
});

describe('#getCoordinateFromRankAndFile', function () {
    it('should return a coordinate for a valid rank and file', function () {
        var coord = chessLogic._private.getCoordinateFromRankAndFile('a', 1);
        expect(coord).toBe('a1');
    });
});

describe('#getRankAndFileFromCoordinate', function () {
    it('should return null for an invalid coordinate', function () {
        expect(chessLogic._private.getRankAndFileFromCoordinate('')).toBe(null);
        expect(chessLogic._private.getRankAndFileFromCoordinate('a')).toBe(null);
    });

    it('should return a rank and file for a coordinate', function () {
        var obj = chessLogic._private.getRankAndFileFromCoordinate('a1');
        expect(obj.rank).toBe('a');
        expect(obj.file).toBe(1);
        expect(obj.rankNum).toBe(0);
    });
});

describe('#isValidRookMove', function () {
    it('should return false for a non-move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('a1');

        expect(chessLogic._private.isValidRookMove(src, dst)).toBe(false);
    });

    it('should return true for a same-rank move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('a7');

        expect(chessLogic._private.isValidRookMove(src, dst)).toBe(true);
    });

    it('should return true for a same-file move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('b1');

        expect(chessLogic._private.isValidRookMove(src, dst)).toBe(true);
    });

    it('should return false for a different-rank, different-file move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('b4');

        expect(chessLogic._private.isValidRookMove(src, dst)).toBe(false);
    });
});

describe('#isValidBishopMove', function () {
    it('should return false for a non-move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('a1');

        expect(chessLogic._private.isValidBishopMove(src, dst)).toBe(false);
    });

    it('should return false for a same-rank different-file move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('a3');

        expect(chessLogic._private.isValidBishopMove(src, dst)).toBe(false);
    });

    it('should return false for a same-file different-rank move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('c1');

        expect(chessLogic._private.isValidBishopMove(src, dst)).toBe(false);
    });

    it('should return false for moving on the wrong diagonal', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('d3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('h8');

        expect(chessLogic._private.isValidBishopMove(src, dst)).toBe(false);
    });

    it('should return true for moving on the correct diagonal', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('d3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('h7');

        expect(chessLogic._private.isValidBishopMove(src, dst)).toBe(true);
    });
});

describe('#isValidQueenMove', function () {
    it('should return false for a non-move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('a1');

        expect(chessLogic._private.isValidQueenMove(src, dst)).toBe(false);
    });

    it('should return false for a bad move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('c4');

        expect(chessLogic._private.isValidQueenMove(src, dst)).toBe(false);
    });

    it('should return true for a diagonal move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('c3');

        expect(chessLogic._private.isValidQueenMove(src, dst)).toBe(true);
    });

    it('should return true for a same-rank different-file  move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('a3');

        expect(chessLogic._private.isValidQueenMove(src, dst)).toBe(true);
    });

    it('should return true for a same-file different-rank  move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('d1');

        expect(chessLogic._private.isValidQueenMove(src, dst)).toBe(true);
    });
});

describe('#isValidKnightMove', function () {
    it('should return false for a non-move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('a1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('a1');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(false);
    });

    it('should return false for a diagonal move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('d3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('h7');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(false);
    });

    it('should return false for a same-rank  move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('b1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('d1');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(false);
    });

    it('should return false for a same-file  move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('b1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('b4');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(false);
    });

    it('should return true for a valid move (c3->b1)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('c3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('b1');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(true);
    });

    it('should return true for a valid move (c3->a2)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('c3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('a2');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(true);
    });

    it('should return true for a valid move (c3->a4)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('c3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('a4');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(true);
    });

    it('should return true for a valid move (c3->b5)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('c3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('b5');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(true);
    });

    it('should return true for a valid move (c3->d5)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('c3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('d5');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(true);
    });

    it('should return true for a valid move (c3->e4)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('c3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('e4');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(true);
    });

    it('should return true for a valid move (c3->e2)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('c3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('e2');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(true);
    });

    it('should return true for a valid move (c3->d1)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('c3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('d1');

        expect(chessLogic._private.isValidKnightMove(src, dst)).toBe(true);
    });
});

describe('#isValidKingMove', function () {
    it('should return false for a non-move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('e1');

        expect(chessLogic._private.isValidKingMove(src, dst)).toBe(false);
    });

    it('should return false for moving 2 files', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('e3');

        expect(chessLogic._private.isValidKingMove(src, dst)).toBe(false);
    });

    it('should return false for moving 2 ranks', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('c1');

        expect(chessLogic._private.isValidKingMove(src, dst)).toBe(false);
    });

    it('should return true for moving left', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('d1');

        expect(chessLogic._private.isValidKingMove(src, dst)).toBe(true);
    });

    it('should return true for moving right', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('f1');

        expect(chessLogic._private.isValidKingMove(src, dst)).toBe(true);
    });

    it('should return true for moving up', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e1');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('e2');

        expect(chessLogic._private.isValidKingMove(src, dst)).toBe(true);
    });

    it('should return true for moving down', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e2');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('e1');

        expect(chessLogic._private.isValidKingMove(src, dst)).toBe(true);
    });

    it('should return true for moving up/left', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e2');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('d3');

        expect(chessLogic._private.isValidKingMove(src, dst)).toBe(true);
    });

    it('should return true for moving up/right', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e2');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('f3');

        expect(chessLogic._private.isValidKingMove(src, dst)).toBe(true);
    });

    it('should return true for moving down/left', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e2');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('d1');

        expect(chessLogic._private.isValidKingMove(src, dst)).toBe(true);
    });

    it('should return true for moving down/right', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e2');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('f1');

        expect(chessLogic._private.isValidKingMove(src, dst)).toBe(true);
    });
});

describe('#isValidPawnMove', function () {
    it('should return false for a non-move', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e2');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('e2');

        expect(chessLogic._private.isValidPawnMove(src, dst)).toBe(false);
    });

    it('should return false for moving 2 files on a move other than first', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e3');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('e5');

        expect(chessLogic._private.isValidPawnMove(src, dst)).toBe(false);
    });

    it('should return true for moving 2 files on the first move (white)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e2');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('e4');

        expect(chessLogic._private.isValidPawnMove(src, dst)).toBe(true);
    });

    it('should return true for moving 2 files on the first move (black)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('c7');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('c5');

        expect(chessLogic._private.isValidPawnMove(src, dst)).toBe(true);
    });

    it('should return true for moving once (white)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('d4');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('d5');

        expect(chessLogic._private.isValidPawnMove(src, dst)).toBe(true);
    });

    it('should return true for moving once (black)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('d5');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('d4');

        expect(chessLogic._private.isValidPawnMove(src, dst)).toBe(true);
    });

    it('should return true for a capture (white)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('e5');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('f6');

        expect(chessLogic._private.isValidPawnMove(src, dst)).toBe(true);
    });

    it('should return true for a capture (black)', function () {
        var src = chessLogic._private.getRankAndFileFromCoordinate('f6');
        var dst = chessLogic._private.getRankAndFileFromCoordinate('e5');

        expect(chessLogic._private.isValidPawnMove(src, dst)).toBe(true);
    });
});
