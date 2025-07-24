import { use, useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const pieceMap = {
  "W-Rook": "♖",
  "W-Knight": "♘",
  "W-Bishop": "♗",
  "W-Queen": "♕",
  "W-King": "♔",
  "W-Pawn": "♙",
  "B-Rook": "♖",
  "B-Knight": "♘",
  "B-Bishop": "♗",
  "B-Queen": "♕",
  "B-King": "♔",
  "B-Pawn": "♙",
  "": "",
};

const PuzzleMode = () => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];

  const [boardData, setBoardData] = useState([]);
  const [turn, setTurn] = useState("W");
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [whiteKing, setWhiteKing] = useState("e1");
  const [blackKing, setBlackKing] = useState("e8");
  const [check, setCheck] = useState(false);
  const [solution, setSolution] = useState([]);
  const [rightMove, setRightMove] = useState(0);
  const [correctPiece, setCorrectPiece] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:8080/puzzles")
      .then((res) => {
        console.log("Puzzle data:", res.data.boardState);
        setBoardData(res.data.boardState);
        setSolution(res.data.solution);
        setTurn(res.data.moveNumber % 2 === 0 ? "B" : "W");
      })
      .catch((err) => console.error("Error fetching board:", err));
  }, []);

  const getLegalMoves = (squareId, piece) => {
    const file = squareId[0];
    const rank = parseInt(squareId[1]);
    const legal = [];
    const fileIndex = files.indexOf(file);
    const isWhite = piece.startsWith("W");

    const isOpponentOrEmpty = (targetSquare) => {
      const targetPiece = boardData[targetSquare];
      return (
        !targetPiece ||
        targetPiece === "" ||
        (isWhite ? targetPiece.startsWith("B") : targetPiece.startsWith("W"))
      );
    };

    const addLinearMoves = (directions, limit = 8) => {
      for (let [dx, dy] of directions) {
        for (let i = 1; i <= limit; i++) {
          const newFileIndex = fileIndex + dx * i;
          const newRank = rank + dy * i;
          if (
            newFileIndex < 0 ||
            newFileIndex >= 8 ||
            newRank < 1 ||
            newRank > 8
          )
            break;

          const square = `${files[newFileIndex]}${newRank}`;
          const target = boardData[square];

          if (!target || target === "") {
            legal.push(square);
          } else if (
            isWhite ? target.startsWith("B") : target.startsWith("W")
          ) {
            legal.push(square);
            break;
          } else {
            break;
          }
        }
      }
    };

    if (piece === "W-Pawn") {
      const oneStep = `${file}${rank + 1}`;
      const twoStep = `${file}${rank + 2}`;
      if (!boardData[oneStep]) {
        legal.push(oneStep);
        if (rank === 2 && !boardData[twoStep]) legal.push(twoStep);
      }

      const captureLeft =
        files[fileIndex - 1] && `${files[fileIndex - 1]}${rank + 1}`;
      const captureRight =
        files[fileIndex + 1] && `${files[fileIndex + 1]}${rank + 1}`;
      if (captureLeft && boardData[captureLeft]?.startsWith("B"))
        legal.push(captureLeft);
      if (captureRight && boardData[captureRight]?.startsWith("B"))
        legal.push(captureRight);
    }

    if (piece === "B-Pawn") {
      const oneStep = `${file}${rank - 1}`;
      const twoStep = `${file}${rank - 2}`;
      if (!boardData[oneStep]) {
        legal.push(oneStep);
        if (rank === 7 && !boardData[twoStep]) legal.push(twoStep);
      }

      const captureLeft =
        files[fileIndex - 1] && `${files[fileIndex - 1]}${rank - 1}`;
      const captureRight =
        files[fileIndex + 1] && `${files[fileIndex + 1]}${rank - 1}`;
      if (captureLeft && boardData[captureLeft]?.startsWith("W"))
        legal.push(captureLeft);
      if (captureRight && boardData[captureRight]?.startsWith("W"))
        legal.push(captureRight);
    }

    if (piece.includes("Knight")) {
      const knightMoves = [
        [2, 1],
        [1, 2],
        [-1, 2],
        [-2, 1],
        [-2, -1],
        [-1, -2],
        [1, -2],
        [2, -1],
      ];

      for (let [dx, dy] of knightMoves) {
        const newFile = files[fileIndex + dx];
        const newRank = rank + dy;
        if (newFile && newRank >= 1 && newRank <= 8) {
          const square = `${newFile}${newRank}`;
          if (isOpponentOrEmpty(square)) legal.push(square);
        }
      }
    }

    if (piece.includes("Rook")) {
      addLinearMoves([
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
      ]);
    }

    if (piece.includes("Bishop")) {
      addLinearMoves([
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ]);
    }

    if (piece.includes("Queen")) {
      addLinearMoves([
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1],
        [1, 1],
        [1, -1],
        [-1, 1],
        [-1, -1],
      ]);
    }

    if (piece.includes("King")) {
      addLinearMoves(
        [
          [1, 0],
          [-1, 0],
          [0, 1],
          [0, -1],
          [1, 1],
          [1, -1],
          [-1, 1],
          [-1, -1],
        ],
        1
      );
    }

    return legal;
  };

  const handleSquareClick = (squareId) => {
    setErrorMessage("");
    const piece = boardData[squareId];

    if (!selectedSquare || !legalMoves.includes(squareId) ) {
      if (piece && piece !== "" && piece.startsWith(turn)) {
        setSelectedSquare(squareId);
        setSelectedPiece(piece);
        const moves = getLegalMoves(squareId, piece);
        setLegalMoves(moves);
        console.log("Right moves: ", solution[rightMove][0], "Selected moves: ", squareId );
        if(solution[rightMove][0] === squareId) {
          setCorrectPiece(true);

        }else {
          setCorrectPiece(false);
        }
      }
      return;
    }

        console.log("Right moves: ", solution[rightMove][1], "Selected moves: ", squareId );
    if (legalMoves.includes(squareId) && correctPiece && solution[rightMove][1] === squareId) {
      
        console.log("Right moves: ", solution[rightMove][1], "Selected moves: ", squareId );
      setBoardData((prev) => ({
        ...prev,
        [selectedSquare]: "",
        [squareId]: selectedPiece,
      }));
      setTurn(turn === "B" ? "B" : "W");
      setBoardData((prev) => ({
        ...prev,
        [solution[rightMove+1][0]]: "",
        [solution[rightMove+1][1]]: boardData[solution[rightMove+1][0]],
      }));
      setRightMove(rightMove + 2);
      if( rightMove + 2 >= solution.length) {
        console.log("Congratulations! You have completed the puzzle.");
      }
      setSelectedSquare(null);
      setSelectedPiece(null);
      setLegalMoves([]);
    }
  };

  const renderSquares = () => {
    const squares = [];
    let isWhite = false;

    for (let rank of ranks) {
      isWhite = !isWhite;
      for (let file of files) {
        const id = `${file}${rank}`;
        const pieceKey = boardData[id] || "";
        const piece = pieceMap[pieceKey];
        const isMove = legalMoves.includes(id);
        const color = isWhite
          ? "bg-slate-200 text-black"
          : "bg-slate-600 text-white";
        isWhite = !isWhite;

        squares.push(
          <button
            key={id}
            id={id}
            className={`aspect-square flex justify-center items-center text-5xl font-medium ${
              id == check ? "bg-red-500" : `${color}`
            }     ${isMove ? "border-gray-900 border-2" : ""} `}
            onClick={() => handleSquareClick(id)}
          >
            <span
              className={`text-6xl ${
                pieceKey.startsWith("W") ? "text-white" : "text-black"
              }`}
            >
              {piece}
            </span>
          </button>
        );
      }
    }

    return squares;
  };

  return (
    <div className="flex flex-1 overflow-hidden">
      <Sidebar mode="Puzzle Mode" lastMove={lastMove} turn={turn} />

      <main className="flex-1 flex justify-center items-center bg-slate-900 p-4">
        <div className="aspect-square w-full max-w-[90vmin] bg-slate-800 rounded-xl p-2 grid grid-cols-8 grid-rows-8 gap-1">
          {renderSquares()}
        </div>
      </main>
    </div>
  );
};

export default PuzzleMode;
