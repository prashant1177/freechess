import ChessBoard from "./ChessBoard";
import Header from "./Header";

function App() {
  return (
    <div className="h-screen w-screen bg-slate-900 text-slate-100 font-sans flex flex-col">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        <ChessBoard />
      </div>
    </div>
  );
}

export default App;
