// src/context/GameContext.jsx
import { createContext, useContext, useState } from "react";

const GameContext = createContext();

export const GameProvider = ({ children }) => {

  return (
    <GameContext.Provider value={{  }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
