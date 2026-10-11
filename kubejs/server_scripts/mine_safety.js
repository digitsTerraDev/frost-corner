// // Deliberate support inspection, never a change to collapse probabilities.
// const MineSafetySupport = Java.loadClass('net.dries007.tfc.util.data.Support')
// const MineSafetyTags = Java.loadClass('net.dries007.tfc.common.TFCTags$Blocks')
// const MineSafetyTools = Java.loadClass('net.minecraft.tags.ItemTags')
// const MineSafetySkills = Java.loadClass('net.puffish.skillsmod.api.SkillsAPI')
// const MineSafetyIds = Java.loadClass('net.minecraft.resources.ResourceLocation')

// BlockEvents.rightClicked(event => {
//     const player = event.player
//     if (!player || !player.isShiftKeyDown() || event.hand.name() !== 'MAIN_HAND') return
//     if (!player.getMainHandItem().is(MineSafetyTools.PICKAXES)) return
//     const category = MineSafetySkills.getCategory(MineSafetyIds.parse('terraskills:miner'))
//     if (!category.isPresent()) return
//     let rank = 0
//     for (let i = 1; i <= 5; i++) {
//         const skill = category.get().getSkill(`support_assessment_${i}`)
//         if (!skill.isPresent() || skill.get().getState(player).name() !== 'UNLOCKED') break
//         rank = i
//     }
//     if (rank === 0) return
//     const level = event.level
//     const now = level.getGameTime()
//     const data = player.persistentData
//     if (data.contains('terraMineSafetyNext') && now < data.getLong('terraMineSafetyNext')) return
//     data.putLong('terraMineSafetyNext', now + 100)

//     const pos = event.block.pos
//     const radius = rank - 1
//     const unsupported = MineSafetySupport.findUnsupportedPositions(
//         level, pos.offset(-radius, -radius, -radius), pos.offset(radius, radius, radius)
//     )
//     let candidates = 0
//     unsupported.forEach(candidate => {
//         if (level.getBlockState(candidate).is(MineSafetyTags.CAN_START_COLLAPSE)) candidates++
//     })
//     player.tell(`Mine Safety: ${candidates} unsupported collapse candidate(s) within ${radius} block(s) of the inspected block. This does not guarantee safe mining.`)
// })
