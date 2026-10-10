// Conditional reach replaces the unconditional Pufferfish attribute rewards.
// Query skill state directly so existing progress, refunds and resets are respected.
const ExcavationSkills = Java.loadClass('net.puffish.skillsmod.api.SkillsAPI')
const ExcavationAttributes = Java.loadClass('net.minecraft.world.entity.ai.attributes.Attributes')
const ExcavationModifier = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier')
const ExcavationOperation = Java.loadClass('net.minecraft.world.entity.ai.attributes.AttributeModifier$Operation')
const ExcavationItemTags = Java.loadClass('net.minecraft.tags.ItemTags')
const ExcavationResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const excavationCategory = ExcavationResourceLocation.parse('terraskills:miner')
const excavationModifierId = ExcavationResourceLocation.parse('terra:excavation_reach')

PlayerEvents.tick(event => {
    const player = event.player
    const attribute = player.getAttribute(ExcavationAttributes.BLOCK_INTERACTION_RANGE)
    if (attribute === null) return

    const held = player.getMainHandItem()
    let rank = 0
    if (held.is(ExcavationItemTags.PICKAXES) || held.is(ExcavationItemTags.SHOVELS)) {
        const category = ExcavationSkills.getCategory(excavationCategory)
        if (category.isPresent()) {
            for (let level = 1; level <= 5; level++) {
                const skill = category.get().getSkill(`careful_excavation_${level}`)
                if (!skill.isPresent() || skill.get().getState(player).name() !== 'UNLOCKED') break
                rank = level
            }
        }
    }

    const amount = rank * 0.5
    const existing = attribute.getModifier(excavationModifierId)
    if (existing !== null && existing.amount() === amount) return
    if (existing !== null) attribute.removeModifier(excavationModifierId)
    if (amount > 0) {
        attribute.addTransientModifier(new ExcavationModifier(
            excavationModifierId, amount, ExcavationOperation.ADD_VALUE
        ))
    }
})
