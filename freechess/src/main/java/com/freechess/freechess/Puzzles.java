package com.freechess.freechess;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.springframework.stereotype.Service;

@Service
public class Puzzles {

    private final PuzzleData puzzlesData;

    public Puzzles(PuzzleData puzzlesData) {
        this.puzzlesData = puzzlesData;
    }

    public PuzzleData setPuzzleData(String rawData) {
        String[] data = parseCsvLine(rawData);

        puzzlesData.setPuzzleId(data[0]);
        puzzlesData.setBoardState(getBoardState(data[1])); // Assuming data[1] is FEN and data[2] is some piece info
        puzzlesData.setSolution(getSolution(data[2])); // Assuming data
        puzzlesData.setRating(Integer.parseInt(data[3]));
        puzzlesData.setRatingDeviation(Integer.parseInt(data[4]));
        puzzlesData.setPopularity(Integer.parseInt(data[5]));
        puzzlesData.setNbPlays(Integer.parseInt(data[6]));
        puzzlesData.setThemes(data[7]);
        puzzlesData.setGameUrl(data[8]);
        puzzlesData.setMoveNumber(puzzlesData.getBoardState().get(puzzlesData.getSolution().get(0)[0]).startsWith("B") ? 2 : 1); 
        
        return puzzlesData;
    }

    public static HashMap<String, String> getBoardState(String fen) {
        HashMap<String, String> board = new HashMap<>();

        String[] parts = fen.split(" ");
        String[] ranks = parts[0].split("/");

        String files = "abcdefgh";

        for (int r = 0; r < 8; r++) {
            String rankStr = ranks[r];
            int fileIndex = 0;
            int rankNum = 8 - r; // Correct: top-to-bottom

            for (char ch : rankStr.toCharArray()) {
                if (Character.isDigit(ch)) {
                    int emptySquares = ch - '0';
                    for (int i = 0; i < emptySquares; i++) {
                        if (fileIndex < 8) {
                            String square = files.charAt(fileIndex) + String.valueOf(rankNum);
                            board.put(square, "");
                            fileIndex++;
                        }
                    }
                } else {
                    if (fileIndex < 8) {
                        String square = files.charAt(fileIndex) + String.valueOf(rankNum);
                        String color = Character.isUpperCase(ch) ? "W" : "B";
                        String piece = switch (Character.toLowerCase(ch)) {
                            case 'p' ->
                                "Pawn";
                            case 'r' ->
                                "Rook";
                            case 'n' ->
                                "Knight";
                            case 'b' ->
                                "Bishop";
                            case 'q' ->
                                "Queen";
                            case 'k' ->
                                "King";
                            default ->
                                "Unknown";
                        };
                        board.put(square, color + "-" + piece);
                        fileIndex++;
                    }
                }
            }
        }
        // Return the board state as a HashMap
        return board;
    }

    public static List<String[]> getSolution(String moveString) {
        List<String[]> moveList = new ArrayList<>();
        String[] moves = moveString.trim().split("\\s+");

        for (String move : moves) {
            if (move.length() == 4) {
                String from = move.substring(0, 2);
                String to = move.substring(2, 4);
                moveList.add(new String[]{from, to});
            }
        }

        for (int i = 0; i < moveList.size(); i++) {
            System.out.println(i + " : " + moveList.get(i)[0] + " -> " + moveList.get(i)[1]);
        }
        return moveList;
    }

    private String[] parseCsvLine(String line) {
        return line.split(",", -1);  // -1 to include trailing empty strings
    }

    public String getRatedPuzzle(int ratingThreshold) throws IOException {
        InputStream inputStream = getClass().getClassLoader().getResourceAsStream("lichess_db_puzzle.csv");

        if (inputStream == null) {
            throw new IOException("Puzzle file not found in resources!");
        }

        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream))) {
            String line;
            boolean isHeader = true;

            while ((line = reader.readLine()) != null) {
                if (isHeader) {
                    isHeader = false;
                    continue;
                }

                String[] parts = line.split(",", -1);
                if (parts.length < 4) {
                    continue;
                }

                try {
                    int rating = Integer.parseInt(parts[3]);
                    if (rating > ratingThreshold) {
                        return line;
                    }
                } catch (NumberFormatException ignored) {
                }
            }
        }

        return null;
    }

}
