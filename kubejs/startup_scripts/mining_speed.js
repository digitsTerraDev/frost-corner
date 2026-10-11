// // Runs on both sides; ranks are supplied by server scripts and synced to clients.
// global.terraMiningRanks = {}
// const MiningSpeedTools = Java.loadClass('net.minecraft.tags.ItemTags')
// const MiningSpeedBlocks = Java.loadClass('net.minecraft.tags.BlockTags')
// const MiningSpeedRegistries = Java.loadClass('net.minecraft.core.registries.BuiltInRegistries')

// NativeEvents.onEvent('net.neoforged.neoforge.event.entity.player.PlayerEvent$BreakSpeed', event => {
//     const player = event.getEntity()
//     const ranks = global.terraMiningRanks[player.getUUID().toString()]
//     if (!ranks) return
//     const held = player.getMainHandItem()
//     const state = event.getState()
//     let bonus = ranks.mining * 0.05
//     if (held.is(MiningSpeedTools.PICKAXES)) {
//         const pos = event.getPosition()
//         if (pos.isPresent() && pos.get().getY() < 0) bonus += ranks.deep * 0.05
//         const block = MiningSpeedRegistries.BLOCK.getKey(state.getBlock()).toString()
//         if (block.startsWith('tfc:rock/raw/')) bonus += ranks.stone * 0.04
//     }
//     if (held.is(MiningSpeedTools.SHOVELS) && state.is(MiningSpeedBlocks.MINEABLE_WITH_SHOVEL)) {
//         bonus += ranks.excavating * 0.03
//     }
//     // Add skill percentages together before applying them to the current speed.
//     event.setNewSpeed(event.getNewSpeed() * (1 + bonus))
// })
