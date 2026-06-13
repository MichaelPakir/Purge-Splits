import { useState } from "react"
import LootInputs from "./components/LootInput"
import Breakdown from "./components/Breakdown"
import MemberList from "./components/Memberlist"
import { calcLoot } from "./hooks/useLootCalc"
import { fmt } from "./utils"

let nextId = 1

const DEFAULT_INPUTS = {}

const DEFAULT_MEMBERS = []

export default function App() {
  const [inputs, setInputs] = useState(DEFAULT_INPUTS)
  const [members, setMembers] = useState(DEFAULT_MEMBERS)

  const calc = calcLoot({ ...inputs, members })

  function handleInputChange(key, value) {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  function addMember() {
    setMembers((prev) => [
      ...prev,
      { id: nextId++, name: `Player ${nextId - 1}` },
    ])
  }

  function removeMember(id) {
    setMembers((prev) => prev.filter((m) => m.id !== id))
  }

  function renameMember(id, name) {
    setMembers((prev) => prev.map((m) => (m.id === id ? { ...m, name } : m)))
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-100 px-4 py-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-100">
            Loot splitter
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Ganking · equal split</p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
              Distributable
            </p>
            <p className="text-2xl font-medium text-amber-400 tabular-nums">
              {fmt(calc.distributable)}
            </p>
          </div>
          <div className="bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3">
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-1">
              Per member
            </p>
            <p className="text-2xl font-medium text-amber-400 tabular-nums">
              {members.length > 0 ? fmt(calc.perShare) : "—"}
            </p>
          </div>
        </div>

        {/* Inputs */}
        <section>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
            Loot inputs
          </p>
          <LootInputs values={inputs} onChange={handleInputChange} />
        </section>

        {/* Breakdown */}
        <section>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
            Breakdown
          </p>
          <Breakdown calc={calc} />
        </section>

        {/* Members */}
        <section>
          <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3">
            Members{" "}
            <span className="text-zinc-600 normal-case">
              ({members.length})
            </span>
          </p>
          <MemberList
            members={members}
            perShare={calc.perShare}
            onAdd={addMember}
            onRemove={removeMember}
            onRename={renameMember}
          />
        </section>
      </div>
    </div>
  )
}
