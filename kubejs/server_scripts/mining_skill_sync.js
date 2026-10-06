const MiningSyncSkills = Java.loadClass('net.puffish.skillsmod.api.SkillsAPI')
const MiningSyncIds = Java.loadClass('net.minecraft.resources.ResourceLocation')
const miningSyncCategory = MiningSyncIds.parse('terraskills:miner')

PlayerEvents.tick(event => {
    const player = event.player
    if (player.tickCount % 20 !== 0) return
    const category = MiningSyncSkills.getCategory(miningSyncCategory)
    const ranks = { mining: 0, deep: 0, stone: 0, excavating: 0 }
    if (category.isPresent()) {
        const tracks = { mining: 'miner', deep: 'deep_mining', stone: 'stone_mining', excavating: 'excavating' }
        Object.keys(tracks).forEach(key => {
            for (let i = 1; i <= 5; i++) {
                const skill = category.get().getSkill(`${tracks[key]}_${i}`)
                if (!skill.isPresent() || skill.get().getState(player).name() !== 'UNLOCKED') break
                ranks[key] = i
            }
        })
    }
    global.terraMiningRanks[player.getUUID().toString()] = ranks
    player.sendData('terra_mining_ranks', ranks)
})

PlayerEvents.loggedOut(event => {
    delete global.terraMiningRanks[event.player.getUUID().toString()]
})
