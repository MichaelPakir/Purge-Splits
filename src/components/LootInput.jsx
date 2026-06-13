export default function LootInputs({ values, onChange }) {
  const fields = [
    { key: "totalLoot", label: "Total loot", placeholder: "0" },
    { key: "guildTax", label: "Guild tax (%)", placeholder: "0" },
    {
      key: "splitterTax",
      label: "Splitter tax (flat)",
      placeholder: "0",
    },
    { key: "repairCost", label: "Repair cost (flat)", placeholder: "0" },
  ]

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {fields.map(({ key, label, placeholder }) => (
        <div key={key} className="flex flex-col gap-1">
          <label className="text-xs text-zinc-400 uppercase tracking-widest">
            {label}
          </label>
          <input
            type="number"
            min="0"
            value={values[key]}
            placeholder={placeholder}
            onChange={(e) => onChange(key, e.target.value)}
            className="w-full rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100 px-3 py-2 text-sm focus:outline-none focus:border-amber-500 transition-colors tabular-nums"
          />
        </div>
      ))}
    </div>
  )
}
