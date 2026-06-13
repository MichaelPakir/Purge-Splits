import { fmt } from "../utils"

function Row({ label, value, deduct, total }) {
  return (
    <div
      className={`flex justify-between items-center py-2 border-b border-zinc-700/50 last:border-0 text-sm ${total ? "font-medium text-base" : ""}`}
    >
      <span className="text-zinc-400">{label}</span>
      <span
        className={`tabular-nums ${total ? "text-amber-400" : deduct ? "text-red-400" : "text-zinc-100"}`}
      >
        {deduct ? "− " : ""}
        {fmt(value)}
      </span>
    </div>
  )
}

export default function Breakdown({ calc }) {
  const {
    loot,
    guildTaxAmt,
    splitterTaxAmt,
    repairCostAmt,
    leaderAmt,
    distributable,
  } = calc
  const taxAndRepair = guildTaxAmt + splitterTaxAmt + repairCostAmt

  return (
    <div className="bg-zinc-800/60 rounded-xl border border-zinc-700/50 px-4 py-3">
      <Row label="Total loot" value={loot} />
      <Row label="Splitter tax" value={splitterTaxAmt} deduct />
      <Row label="Tax & repair" value={taxAndRepair} deduct />
      <Row label="C-leader (2%)" value={leaderAmt} deduct />
      <Row label="Distributable" value={distributable} total />
    </div>
  )
}
