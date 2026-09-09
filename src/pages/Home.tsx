export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-6">
      <div className="p-8 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl text-center max-w-md">
        <h1 className="text-2xl font-bold text-red-500 mb-2">PROING LMS</h1>
        <p className="text-slate-400 text-sm mb-4">Campus Virtual 100% Online</p>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/60 text-emerald-400 border border-emerald-800 rounded-full text-xs font-medium">
          ● React + Vite + Router Online
        </div>
      </div>
    </div>
  );
}
