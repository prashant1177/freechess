package com.freechess.freechess;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class ChessBoard {

    private final GameData gameData;
    public ChessBoard(GameData gameData) {
        this.gameData = gameData;
        gameData.setBoardState(this.getInitialBoard());
    }

    public Map<String, String> getInitialBoard() {
        Map<String, String> board = new HashMap<>();
        // Place black pieces
        board.put("a8", "B-Rook");
        board.put("b8", "B-Knight");
        board.put("c8", "B-Bishop");
        board.put("d8", "B-Queen");
        board.put("e8", "B-King");
        board.put("f8", "B-Bishop");
        board.put("g8", "B-Knight");
        board.put("h8", "B-Rook");
        for (char file = 'a'; file <= 'h'; file++) {
            board.put(file + "7", "B-Pawn");
        }

        // Empty squares
        for (int rank = 6; rank >= 3; rank--) {
            for (char file = 'a'; file <= 'h'; file++) {
                board.put(file + "" + rank, "");
            }
        }

        // Place white pieces
        for (char file = 'a'; file <= 'h'; file++) {
            board.put(file + "2", "W-Pawn");
        }
        board.put("a1", "W-Rook");
        board.put("b1", "W-Knight");
        board.put("c1", "W-Bishop");
        board.put("d1", "W-Queen");
        board.put("e1", "W-King");
        board.put("f1", "W-Bishop");
        board.put("g1", "W-Knight");
        board.put("h1", "W-Rook");

        return board;
    }

    public Map<String, String> updateBoard(String from, String to) {
        Map<String, String> board = new HashMap<>(gameData.getBoardState());


        if (!board.containsKey(from) || !board.containsKey(to)) {
            throw new IllegalArgumentException("Invalid board positions");
        }

        String piece = board.get(from);
        if (piece == null || piece.isEmpty()) {
            throw new IllegalArgumentException("No piece at source square");
        }

        String target =board.get(to);
        if (target != null && !target.isEmpty()) {
            // ⚠️ Check if moving to own piece
            if (target.charAt(0) == piece.charAt(0)) {
                throw new IllegalArgumentException("Cannot move to square with your own piece");
            }
        }

    board.put(to, piece);
    board.put(from, "");

        return board;
    }

    public HashMap<String, String> getLegalMoves(Map<String, String> board,String from, String color) {
        String piece = board.get(from);
        HashMap<String, String> moves = new HashMap<>();

        if (piece == null || piece.isEmpty()) {
            return moves;
        }

        char file = from.charAt(0);
        int rank = Character.getNumericValue(from.charAt(1));

        moves.putAll(this.generateLinearMoves(board, from, color, new int[][]{{1, 0}, {-1, 0}, {0, 1}, {0, -1}}, "Rook"));
        moves.putAll(this.generateLinearMoves(board, from, color, new int[][]{{1, 1}, {-1, -1}, {-1, 1}, {1, -1}}, "Bishop"));

        int[][] knightMoves = {
            {1, 2}, {2, 1}, {-1, 2}, {-2, 1},
            {1, -2}, {2, -1}, {-1, -2}, {-2, -1}
        };
        for (int[] move : knightMoves) {
            char destFile = (char) (file + move[0]);
            int destRank = rank + move[1];
            String dest = "" + destFile + destRank;

            if (board.containsKey(dest)) {
                String target = board.get(dest);
                if (!target.isBlank() && target.substring(2).equals("Knight") && target.charAt(0) != color.charAt(0)) {
                    moves.put(dest, "Knight");
                }
            }
        }

        return moves;
    }

    private HashMap<String, String> generateLinearMoves(Map<String, String> board,String from, String color, int[][] directions, String attacker) {
        HashMap<String, String> moves = new HashMap<>();
        char file = from.charAt(0);
        int rank = Character.getNumericValue(from.charAt(1));

        for (int[] dir : directions) {
            int dx = dir[0], dy = dir[1];
            char f = file;
            int r = rank;

            while (true) {
                f += dx;
                r += dy;
                String pos = "" + f + r;

                if (!board.containsKey(pos)) {
                    break;
                }

                String target = board.get(pos);

                if (!target.isBlank() && (target.substring(2).equals(attacker) || target.substring(2).equals("Queen")) && target.charAt(0) != color.charAt(0)) {
                    moves.put(pos, attacker);
                }
                if (!target.isBlank()) {
                    break; // Stop if we hit any piece
                }
            }
        }

        return moves;
    }

}
