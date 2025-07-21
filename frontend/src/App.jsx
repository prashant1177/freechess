import ChessBoard from "./ChessBoard";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./Landing";
function App() {
  return (
    <div className="h-screen w-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
       
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/game" element={<ChessBoard />} />
      </Routes>
    </Router>
      </div>
    </div>
  );
}

export default App;
