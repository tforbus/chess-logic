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

        return {
            rank: coordinate.charAt(0),
            file: parseInt(coordinate.charAt(1), 10)
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

        // Map ranks to files (a=0, b=1...) to perform arithmetic.
        var srcRankNum = api._private.ranks.indexOf(src.rank);
        var dstRankNum = api._private.ranks.indexOf(dst.rank);

        return Math.abs(srcRankNum - dstRankNum) === Math.abs(src.file - dst.file);
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
        
        var srcRankNum = api._private.ranks.indexOf(src.rank);
        var dstRankNum = api._private.ranks.indexOf(dst.rank);

        // 8 possible jumps by a knight.
        var pairs = [
            [srcRankNum - 1, src.file - 2],
            [srcRankNum - 2, src.file - 1],
            [srcRankNum - 2, src.file + 1],
            [srcRankNum - 1, src.file + 2],
            [srcRankNum + 1, src.file + 2],
            [srcRankNum + 2, src.file + 1],
            [srcRankNum + 2, src.file - 1],
            [srcRankNum + 1, src.file - 2]
        ];

        var x = pairs.filter(function (pair) {
            return pair[0] === dstRankNum;
        }).filter(function (pair) {
            return pair[1] === dst.file;
        });

        return x.length > 0;
    };

    return api;
}());
