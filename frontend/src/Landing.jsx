import { Link } from "react-router-dom";
import "./index.css";

export default function Landing() {
  return (
    <div className="min-h-screen w-full  flex flex-col items-center justify-center text-white font-['Inter'] bgImage">
      <div className="flex flex-col items-center justify-center w-1/4 h-full text-center gap-8">
       <h1 className="text-4xl mb-8 font-bold text-slate-400 text-shadow-lg shadow-slate-900 font-mono">Play Chess Online</h1>

        <Link
          to="/game" class="w-full relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-slate-900 rounded-lg group">
  <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-slate-700 rounded-full group-hover:w-full group-hover:h-56"></span>
  <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-slate-800"></span>
  <span class="relative">Player vs Player</span>
</Link>

       <Link
          to="/game" class="w-full relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-slate-900 rounded-lg group">
  <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-slate-700 rounded-full group-hover:w-full group-hover:h-56"></span>
  <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-slate-800"></span>
  <span class="relative">Player vs Computer</span>
</Link>
<Link
          to="/game" class="w-full relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-slate-900 rounded-lg group">
  <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-slate-700 rounded-full group-hover:w-full group-hover:h-56"></span>
  <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-slate-800"></span>
  <span class="relative">Play Online</span>
</Link>

  <Link
          to="/puzzles" class="w-full relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-slate-900 rounded-lg group">
  <span class="absolute w-0 h-0 transition-all duration-500 ease-out bg-slate-700 rounded-full group-hover:w-full group-hover:h-56"></span>
  <span class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-slate-800"></span>
  <span class="relative">Solve Puzzles</span>
</Link>
      </div>
    </div>
  );
}
