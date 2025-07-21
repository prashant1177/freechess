package com.freechess.freechess;

import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class GameData {

    private int moveNumber = 1;
    private boolean check = false;
    private Map<String, String> boardState; // Example: "e4" -> "wP"
    private boolean checkmate;  // ✅ Add this

    
    public GameData() {
    }

    public GameData(int moveNumber, boolean check, Map<String, String> boardState, boolean checkmate) {
        this.moveNumber = moveNumber;
        this.check = check;
        this.boardState = boardState;
        this.checkmate = checkmate; // ✅ Initialize checkmate
    }

public boolean isCheckmate() {
        return checkmate;
    }

    public void setCheckmate(boolean checkmate) {
        this.checkmate = checkmate;
    }
    // Getters and Setters

    public int getMoveNumber() {
        return moveNumber;
    }

    public void setMoveNumber(int moveNumber) {
        this.moveNumber = moveNumber;
    }

    public boolean isCheck() {
        return check;
    }

    public void setCheck(boolean check) {
        this.check = check;
    }

    public Map<String, String> getBoardState() {
        return boardState;
    }

    public void setBoardState(Map<String, String> boardState) {
        this.boardState = boardState;
    }

   
}
