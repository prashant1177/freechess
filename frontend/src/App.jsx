import ChessBoard from "./ChessBoard";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
import PuzzleMode from "./PuzzleMode";
function App() {
  return (
    <div className="h-screen w-screen  text-slate-100 font-sans flex flex-col">
    

      <div className="flex flex-1 overflow-hidden">
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/game" element={<ChessBoard />} />
            <Route path="/puzzles" element={<PuzzleMode />} />            
          </Routes>
        </Router>
      </div>
    </div>
  );
}

export default App;
