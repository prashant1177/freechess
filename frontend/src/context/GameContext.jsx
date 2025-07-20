// src/context/GameContext.jsx
import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [boardData, setBoardData] = useState([]);
  const [turn, setTurn] = useState("W");
  const [check, setCheck] = useState(null);

  return (
    <GameContext.Provider value={{ boardData, setBoardData, turn, setTurn, check, setCheck }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
