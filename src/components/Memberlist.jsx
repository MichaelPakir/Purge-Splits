import { fmt } from "../utils"

export default function MemberList({
  members,
  perShare,
  onAdd,
  onRemove,
  onRename,
}) {
  return (
    <div>
      <div className="grid grid-cols-[1fr_1fr_36px] gap-2 text-xs text-zinc-500 uppercase tracking-widest px-2 mb-2">
        <span>Name</span>
        <span className="text-right">Share</span>
        <span />
      </div>

      <div className="flex flex-col gap-2 mb-3">
        {members.map((m) => (
          <div
            key={m.id}
            className="grid grid-cols-[1fr_1fr_36px] gap-2 items-center bg-zinc-800/60 border border-zinc-700/50 rounded-lg px-3 py-2"
          >
            <input
              type="text"
              value={m.name}
              onChange={(e) => onRename(m.id, e.target.value)}
              className="bg-transparent text-sm text-zinc-100 outline-none placeholder:text-zinc-600 w-full"
            />
            <span className="text-right text-sm font-medium text-amber-400 tabular-nums">
              {fmt(perShare)}
            </span>
            <button
              onClick={() => onRemove(m.id)}
              aria-label="Remove member"
              className="flex items-center justify-center text-zinc-600 hover:text-red-400 transition-colors text-lg leading-none"
            >
              ×
            </button>
          </div>
        ))}

        {members.length === 0 && (
          <p className="text-sm text-zinc-600 text-center py-4">
            No members yet — add one below.
          </p>
        )}
      </div>

      <button
        onClick={onAdd}
        className="flex items-center gap-2 text-sm text-zinc-400 hover:text-amber-400 border border-zinc-700 hover:border-amber-500/50 rounded-lg px-4 py-2 transition-colors w-full justify-center"
      >
        <span className="text-lg leading-none">+</span> Add member
      </button>
    </div>
  )
}
