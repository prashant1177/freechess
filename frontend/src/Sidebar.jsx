export default function Sidebar({ mode, lastMove, turn, restart }) {
  return (
    <aside className="w-1/4 border-r border-slate-700 p-6 bg-slate-800 hidden lg:flex flex-col justify-between">
      <div>
        <h2 className="text-xl font-semibold text-amber-400 mb-4">Game Info</h2>
        {mode == "Puzzle Mode" ? (
          <div>
          <p className="text-base">Current Streak: </p>
          </div>
        ) : (
          <div>
            <p className="text-base">White: prashant</p>
            <p className="text-base">Black: parth</p>{" "}
          </div>
        )}

        <h2 className="text-xl font-semibold text-amber-400 mt-8 mb-2">Turn</h2>
        <p className="text-lg font-bold text-blue-400">
          {turn == "W" ? "White to move" : "Black to move"}
        </p>

        <h2 className="text-xl font-semibold text-amber-400 mt-8 mb-2">
          Last Move
        </h2>
        <p className="text-base">{lastMove}</p>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-amber-400 mb-2">Controls</h2>
        {mode == "Puzzle Mode" ? (
          <div className="flex flex-col gap-2">
            <button className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-4 py-2 rounded-md font-semibold text-sm">
              Change Mode
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-4 py-2 rounded-md font-semibold text-sm">
              Show Solution
            </button>
            <button
              onClick={restart}
              className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-4 py-2 rounded-md font-semibold text-sm"
            >
              Next Puzzle
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <button className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-4 py-2 rounded-md font-semibold text-sm">
              Resign
            </button>
            <button className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-4 py-2 rounded-md font-semibold text-sm">
              Offer Draw
            </button>
            <button
              onClick={restart}
              className="bg-slate-700 hover:bg-slate-600 text-slate-100 px-4 py-2 rounded-md font-semibold text-sm"
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
