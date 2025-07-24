package com.freechess.freechess;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class PuzzleData {

    private int moveNumber;
    private String puzzleId;
    private int rating;
    private int ratingDeviation;
    private int popularity;
    private int nbPlays;
    private String themes;
    private String gameUrl;
    private String openingTags;
    private Map<String, String> boardState;
    private List<String[]> solution;

    
    public PuzzleData() {
        // default constructor
    }

    // Static map for all puzzles (FEN → Moves)
    // Constructor
    public PuzzleData(int moveNumber,String puzzleId, Map<String, String> boardState, List<String[]> solution, int rating, int ratingDeviation,
            int popularity, int nbPlays, String themes, String gameUrl, String openingTags) {
        this.puzzleId = puzzleId;
        this.rating = rating;
        this.ratingDeviation = ratingDeviation;
        this.popularity = popularity;
        this.nbPlays = nbPlays;
        this.themes = themes;
        this.gameUrl = gameUrl;
        this.openingTags = openingTags;
        this.boardState = boardState;
        this.solution = solution;

    }

    
    public int getMoveNumber() {
        return moveNumber;
    }

    public void setMoveNumber(int moveNumber) {
        this.moveNumber = moveNumber;
    }


    // Setters
    public void setPuzzleId(String puzzleId) {
        this.puzzleId = puzzleId;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }

    public void setRatingDeviation(int ratingDeviation) {
        this.ratingDeviation = ratingDeviation;
    }

    public void setPopularity(int popularity) {
        this.popularity = popularity;
    }

    public void setNbPlays(int nbPlays) {
        this.nbPlays = nbPlays;
    }

    public void setThemes(String themes) {
        this.themes = themes;
    }

    public void setGameUrl(String gameUrl) {
        this.gameUrl = gameUrl;
    }

    public void setOpeningTags(String openingTags) {
        this.openingTags = openingTags;
    }

    public void setBoardState(Map<String, String> boardState) {
        this.boardState = boardState;
    }

    public void setSolution(List<String[]> solution) {
        this.solution = solution;
    }

    public String getPuzzleId() {
    return puzzleId;
}

public int getRating() {
    return rating;
}

public int getRatingDeviation() {
    return ratingDeviation;
}

public int getPopularity() {
    return popularity;
}

public int getNbPlays() {
    return nbPlays;
}

public String getThemes() {
    return themes;
}

public String getGameUrl() {
    return gameUrl;
}

public String getOpeningTags() {
    return openingTags;
}

public Map<String, String> getBoardState() {
    return boardState;
}

public List<String[]> getSolution() {
    return solution;
}


}
