package com.freechess.freechess;

import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class FreechessController {

    private final GameData gameData;
    private final ChessBoard chessBoard;

    public FreechessController(GameData gameData, ChessBoard chessBoard) {
        this.gameData = gameData;
        this.chessBoard = chessBoard;
    }

    @RequestMapping("/restart")
    public GameData gameRestart() {
        gameData.setBoardState(chessBoard.getInitialBoard()); // re-initialize board here
        gameData.setMoveNumber(1);
        gameData.setCheck(false);
        return gameData;
    }

    @RequestMapping("/game")
    public GameData gameIntializer() {
        return gameData;
    }

    @PostMapping("/move")
    public GameData moveValidator(@RequestBody MoveRequest move) {
        String from = move.getFrom();
        String to = move.getTo();
        String turn = move.getTurn();
        String yourKing = move.getYourKing();
        String oppKing = move.getOppKing();

        String piece = gameData.getBoardState().get(from);

        if (piece == null || piece.isEmpty() || !piece.startsWith(turn)) {
            throw new IllegalArgumentException("It's not your turn!");
        }
        Map<String, String> board = chessBoard.updateBoard(from, to);
        HashMap<String, String> slefChecks = chessBoard.getLegalMoves(board, yourKing, turn);
        if (!slefChecks.isEmpty()) {
            return gameData;
        }
        gameData.setBoardState(board);
        gameData.setMoveNumber(gameData.getMoveNumber() + 1);
        HashMap<String, String> kingChecks = chessBoard.getLegalMoves(board, oppKing, piece.startsWith("W") ? "B" : "W");
        if (!kingChecks.isEmpty()) { gameData.setCheck(true);
            return gameData;
        }
        gameData.setCheck(false);
        return gameData;
    }

    public static class MoveRequest {

        private String from;
        private String to;
        private String turn;
        private String yourKing;
        private String oppKing;

        public String getFrom() {
            return from;
        }

        public void setFrom(String from) {
            this.from = from;
        }

        public String getTo() {
            return to;
        }

        public void setTo(String to) {
            this.to = to;
        }

        public String getTurn() {
            return turn;
        }

        public void setTurn(String turn) {
            this.turn = turn;
        }

        public String getYourKing() {
            return yourKing;
        }

        public void setYourKing(String yourKing) {
            this.yourKing = yourKing;
        }

        public String getOppKing() {
            return oppKing;
        }

        public void setOppKing(String oppKing) {
            this.oppKing = oppKing;
        }
    }

}
