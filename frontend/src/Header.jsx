import { useGame } from "./context/GameContext";
import axios from "axios";

export default function Header() {
 const { setBoardData, setTurn, setCheck } = useGame();

  const newGame = () => {
    axios
      .get("http://localhost:8080/restart")
      .then((res) => {
        setBoardData(res.data.boardState);
        setTurn(res.data.moveNumber);
        setCheck(res.data.check);
      })
      .catch((err) => console.error("Error fetching board:", err));
  };
  return (
    <header className="w-full px-6 py-4 border-b border-slate-700 flex justify-between items-center bg-slate-800">
      <h1 className="text-3xl font-bold text-amber-400">♛ FreeChess AI</h1>
      <button onClick={newGame} className="bg-amber-400 hover:bg-amber-500 text-black text-sm font-semibold uppercase px-4 py-2 rounded-lg">
        New Game
      </button>
    </header>
  );
}
