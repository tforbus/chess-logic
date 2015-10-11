var chessLogic = (function () {
    'use strict';

    var PIECES = {
        WHITE_PAWN: 'P',
        WHITE_KNIGHT: 'N',
        WHITE_BISHOP: 'B',
        WHITE_ROOK: 'R',
        WHITE_QUEEN: 'Q',
        WHITE_KING: 'K',

        BLACK_PAWN: 'p',
        BLACK_KNIGHT: 'n',
        BLACK_BISHOP: 'b',
        BLACK_ROOK: 'r',
        BLACK_QUEEN: 'q',
        BLACK_KING: 'k'
    };

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
    api._private.isValidRookMove = function (srcCoord, dstCoord) {
        var src = api._private.getRankAndFileFromCoordinate(srcCoord);
        var dst = api._private.getRankAndFileFromCoordinate(dstCoord);

        var hasSameRank = src.rank === dst.rank;
        var hasSameFile = src.file === dst.file;

        // Rook must move.
        if (hasSameRank && hasSameFile) { return false; }
        else if (hasSameRank && !hasSameFile) { return true; }
        else if (!hasSameRank && hasSameFile) { return true; }
        else { return false; }
    };

    api._private.isValidBishopMove = function (srcCoord, dstCoord) {
        var src = api._private.getRankAndFileFromCoordinate(srcCoord);
        var dst = api._private.getRankAndFileFromCoordinate(dstCoord);

        var hasSameRank = src.rank === dst.rank;
        var hasSameFile = src.file === dst.file;

        if (hasSameRank && hasSameFile) { return false; }

        return Math.abs(src.rankNum - dst.rankNum) === Math.abs(src.file - dst.file);
    };

    api._private.isValidQueenMove = function (srcCoord, dstCoord) {
        var isValidBishopMove = api._private.isValidBishopMove(srcCoord, dstCoord);
        var isValidRookMove = api._private.isValidRookMove(srcCoord, dstCoord);

        return isValidBishopMove || isValidRookMove;
    };

    api._private.isValidKnightMove = function (srcCoord, dstCoord) {
        var src = api._private.getRankAndFileFromCoordinate(srcCoord);
        var dst = api._private.getRankAndFileFromCoordinate(dstCoord);

        var isNonMove = src.rank === dst.rank && src.file === dst.file;
        if (isNonMove) { return false; }

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

    api._private.isValidKingMove = function (srcCoord, dstCoord) {
        var src = api._private.getRankAndFileFromCoordinate(srcCoord);
        var dst = api._private.getRankAndFileFromCoordinate(dstCoord);

        var isNonMove = src.rank === dst.rank && src.file === dst.file;
        if (isNonMove) { return false; }

        return Math.abs(src.rankNum - dst.rankNum) <= 1 &&
            Math.abs(src.file - dst.file) <= 1;

    };

    return api;
}());
