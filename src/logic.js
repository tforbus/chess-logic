(function (window, undefined) {
    'use strict';

    var api = {
        _private: {}
    };

    api._private.ranks = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    api._private.files = [1, 2, 3, 4, 5, 6, 7, 8];

    /**
     * Create a coordinate from a rank and file.
     *
     * @param {string} rank
     * @param {Integer} file
     * @return {string}
     */
    api._private.getCoordinateFromRankAndFile = function (rank, file) {
        return rank + file;
    };

    /**
     * Get the rank and file from a coordinate string.
     *
     * @param {string} coordinate
     * @return {Object}
     */
    api._private.getRankAndFileFromCoordinate = function (coordinate) {
        if (!coordinate || coordinate.length < 2) { return null; }

        var rank = coordinate.charAt(0);
        var file = coordinate.charAt(1);
        return {
            rank: rank,
            file: parseInt(file, 10),
            // Used for rank arithmetic.
            rankNum: api._private.ranks.indexOf(rank)
        };
    };

    /**
     * All coordinates on a chessboard.
     *
     * @return {Array}
     */
    api._private.coordinates = (function makeCoordinates() {
        var ranks = api._private.ranks;
        var files = api._private.files;
        var coordinates = [];

        ranks.forEach(function (rank) {
            var rankAndFiles = files.map(function (file) {
                return api._private.getCoordinateFromRankAndFile(rank, file);
            });
            coordinates = coordinates.concat(rankAndFiles);
        });

        return coordinates;
    }());

    /**
     * Assuming an empty board, check that the piece moves in the correct manner.
     *
     * @param {string} srcCoord
     * @param {string} dstCoord
     * @return {Boolean}
     */
    api._private.isValidRookMove = function (src, dst) {
        var hasSameRank = src.rank === dst.rank;
        var hasSameFile = src.file === dst.file;

        return hasSameRank && !hasSameFile || !hasSameRank && hasSameFile;
    };

    api._private.isValidBishopMove = function (src, dst) {
        var hasSameRank = src.rank === dst.rank;
        var hasSameFile = src.file === dst.file;

        if (hasSameRank && hasSameFile) { return false; }

        return Math.abs(src.rankNum - dst.rankNum) === Math.abs(src.file - dst.file);
    };

    api._private.isValidQueenMove = function (src, dst) {
        var isValidBishopMove = api._private.isValidBishopMove(src, dst);
        var isValidRookMove = api._private.isValidRookMove(src, dst);

        return isValidBishopMove || isValidRookMove;
    };

    api._private.isValidKnightMove = function (src, dst) {
        // 8 possible jumps by a knight.
        var pairs = [
            [src.rankNum - 1, src.file - 2],
            [src.rankNum - 2, src.file - 1],
            [src.rankNum - 2, src.file + 1],
            [src.rankNum - 1, src.file + 2],
            [src.rankNum + 1, src.file + 2],
            [src.rankNum + 2, src.file + 1],
            [src.rankNum + 2, src.file - 1],
            [src.rankNum + 1, src.file - 2]
        ];

        var x = pairs.filter(function (pair) {
            return pair[0] === dst.rankNum;
        }).filter(function (pair) {
            return pair[1] === dst.file;
        });

        return x.length > 0;
    };

    api._private.isValidKingMove = function (src, dst) {
        var isNonMove = src.rank === dst.rank && src.file === dst.file;
        if (isNonMove) { return false; }

        return Math.abs(src.rankNum - dst.rankNum) <= 1 &&
            Math.abs(src.file - dst.file) <= 1;
    };

    api._private.isValidPawnMove = function (src, dst) {
        var isFirstMoveWhite = src.file === 2 && (dst.file === 4 || dst.file === 3);
        var isFirstMoveBlack = src.file === 7 && (dst.file === 5 || dst.file === 6);

        if (isFirstMoveWhite || isFirstMoveBlack) { return true; }

        var rankDiff = src.rankNum - dst.rankNum;
        var fileDiff = src.file - dst.file;

        // Moving up (or down) the board.
        if (rankDiff === 0 && Math.abs(fileDiff) === 1) {
            return true;
        }

        // Capture
        if (Math.abs(rankDiff) === 1 && Math.abs(fileDiff) === 1) {
            return true;
        }
        
        return false;
    };

    api.isValidMove = function isValidMove(srcCoord, dstCoord, piece) {
        // TODO
    };

    if (!window.tfChess) {
        window.tfChess = {};
    }
    window.tfChess.moveValidator = api;

    return api;
}(window));
