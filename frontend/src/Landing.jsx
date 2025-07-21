import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="min-h-screen w-full bg-slate-900 flex flex-col items-center justify-center text-white font-['Inter']">
      <div className="flex flex-col items-center justify-center w-1/4 h-full text-center gap-8">
        <Link to="/game"  className="w-full bg-slate-800 hover:bg-slate-700 text-lg font-semibold py-4 px-6 rounded-xl shadow-md transition-all border border-zinc-700">
          {" "}
          <button>
            🧍‍♂️ Player vs Player
          </button>
        </Link>
        <button
          onClick={() => handleNavigation("/online")}
          className="w-full bg-slate-800 hover:bg-slate-700 text-lg font-semibold py-4 px-6 rounded-xl shadow-md transition-all border border-zinc-700"
        >
          🌐 Play Online
        </button>
        <button
          onClick={() => handleNavigation("/ai")}
          className="w-full bg-amber-400 hover:bg-amber-500 text-black text-lg font-semibold py-4 px-6 rounded-xl shadow-md transition-all"
        >
          🤖 Play Computer
        </button>
      </div>
    </div>
  );
}
