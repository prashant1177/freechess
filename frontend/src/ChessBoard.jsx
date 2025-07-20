import { use, useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { useGame } from "./context/GameContext";

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

const ChessBoard = () => {
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const ranks = [8, 7, 6, 5, 4, 3, 2, 1];
const { setBoardData, setTurn, setCheck,boardData, turn, check } = useGame();

  const [selectedSquare, setSelectedSquare] = useState(null);
  const [legalMoves, setLegalMoves] = useState([]);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [whiteKing, setWhiteKing] = useState("e1");
  const [blackKing, setBlackKing] = useState("e8");
  const [gameStart, setGameStart] = useState(false);
  
  useEffect(() => {
    axios
      .get("http://localhost:8080/game")
      .then((res) => {
        setBoardData(res.data.boardState);
        setTurn(res.data.moveNumber % 2 === 0 ? "B" : "W");
        if (res.data.check) {
          setCheck(res.data.moveNumber % 2 === 0 ? blackKing : whiteKing);
        } else {
          setCheck(null);
        }
      })
      .catch((err) => console.error("Error fetching board:", err));
    setGameStart(true);
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

    if (!selectedSquare || !legalMoves.includes(squareId)) {
      if (piece && piece !== "" && piece.startsWith(turn)) {
        setSelectedSquare(squareId);
        setSelectedPiece(piece);
        const moves = getLegalMoves(squareId, piece);
        setLegalMoves(moves);
      }
      return;
    }

    if (legalMoves.includes(squareId)) {
      axios
        .post("http://localhost:8080/move", {
          turn: turn,
          from: selectedSquare,
          to: squareId,
          yourKing: turn === "W" ? whiteKing : blackKing,
          oppKing: turn === "W" ? blackKing : whiteKing,
        })
        .then((res) => {
          setBoardData(res.data.boardState);
          setTurn(res.data.moveNumber % 2 === 0 ? "B" : "W");
          console.log(turn, "Turn after move:", res.data.moveNumber);
          setLastMove(`${selectedPiece} from ${selectedSquare} to ${squareId}`);
          if (selectedPiece === "W-King") setWhiteKing(squareId);
          if (selectedPiece === "B-King") setBlackKing(squareId);
          if (res.data.check) {
            setCheck(res.data.moveNumber % 2 === 0 ? blackKing : whiteKing);
          } else {
            setCheck(null);
          }
        })
        .catch((err) => {
          setErrorMessage("Server rejected the move.");
          console.error("Move error:", err);
        });

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
        const color = isWhite ? "white" : "black";
        const pieceKey = boardData[id] || "";
        const piece = pieceMap[pieceKey];
        const isMove = legalMoves.includes(id);
        isWhite = !isWhite;

        squares.push(
          <button
            key={id}
            id={id}
            className={`aspect-square flex justify-center items-center text-5xl font-medium ${
              isWhite ? "bg-slate-200 text-black" : "bg-slate-600 text-white"
            }        ${isMove ? "border-gray-900 border-2" : ""} ${
              id === check ? "bg-red-500" : ``
            }`}
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
      <Sidebar lastMove={lastMove} turn={turn}/>

      <main className="flex-1 flex justify-center items-center bg-slate-900 p-4">
        <div className="aspect-square w-full max-w-[90vmin] bg-slate-800 rounded-xl p-2 grid grid-cols-8 grid-rows-8 gap-1">
          {renderSquares()}
        </div>
      </main>
    </div>
  );
};

export default ChessBoard;
