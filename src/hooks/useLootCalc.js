const LEADER_CUT_PCT = 0.02

export function calcLoot({
  totalLoot,
  guildTax,
  splitterTax,
  repairCost,
  members,
}) {
  const loot = parseFloat(totalLoot) || 0
  const guildTaxAmt = loot * ((parseFloat(guildTax) || 0) / 100)
  const splitterTaxAmt = parseFloat(splitterTax) || 0
  const repairCostAmt = parseFloat(repairCost) || 0
  const leaderAmt = loot * LEADER_CUT_PCT
  const distributable =
    loot - guildTaxAmt - splitterTaxAmt - repairCostAmt - leaderAmt
  const perShare = members.length > 0 ? distributable / members.length : 0

  return {
    loot,
    guildTaxAmt,
    splitterTaxAmt,
    repairCostAmt,
    leaderAmt,
    distributable,
    perShare,
  }
}
