const COMMON_REAGENTS = [
    '#c:bark_powder'
]

const UNCOMMON_REAGENTS = [
    'ktfcc:tea/tieguanyin',
    'ktfcc:tea/oolong',
    'ktfcc:tea/biluochun',
    'ktfcc:tea/black',
    'ktfcc:mugwort_leaves',
    'coralstfc:coral_powder'
]

const RARE_REAGENTS = [
    '#tfc:gem_powders'
]

const COMMON_EFFECTS = [
    { effect: 'minecraft:blindness', duration: 200, level: 1 },
    { effect: 'minecraft:hunger', duration: 200, level: 1 },
    { effect: 'minecraft:instant_damage', duration: 1, level: 1 },
    { effect: 'minecraft:mining_fatigue', duration: 200, level: 1 },
    { effect: 'minecraft:nausea', duration: 100, level: 1 },
    { effect: 'minecraft:jump_boost', duration: 600, level: 1 },
    { effect: 'minecraft:night_vision', duration: 600, level: 1 },
    { effect: 'minecraft:speed', duration: 1200, level: 1 }
]

const UNCOMMON_EFFECTS = [
    { effect: 'minecraft:poison', duration: 200, level: 1 },
    { effect: 'tfc:overburdened', duration: 200, level: 1 },
    { effect: 'tfc:exhausted', duration: 600, level: 1 },
    { effect: 'minecraft:mining_fatigue', duration: 600, level: 1 },
    { effect: 'minecraft:haste', duration: 1200, level: 1 },
    { effect: 'minecraft:speed', duration: 2400, level: 1 },
    { effect: 'minecraft:night_vision', duration: 2400, level: 1 },
    { effect: 'minecraft:water_breathing', duration: 1200, level: 1 },
    { effect: 'minecraft:strength', duration: 200, level: 1 },
    { effect: 'minecraft:instant_health', duration: 1, level: 1 },
    { effect: 'minecraft:regeneration', duration: 200, level: 1 }
]

const RARE_EFFECTS = [
    { effect: 'minecraft:darkness', duration: 300, level: 1 },
    { effect: 'minecraft:hunger', duration: 600, level: 2 },
    { effect: 'minecraft:poison', duration: 300, level: 2 },
    { effect: 'minecraft:wither', duration: 300, level: 1 },
    { effect: 'minecraft:instant_damage', duration: 1, level: 3 },
    { effect: 'minecraft:absorption', duration: 2400, level: 1 },
    { effect: 'minecraft:strength', duration: 100, level: 2 },
    { effect: 'minecraft:speed', duration: 1200, level: 2 },
    { effect: 'minecraft:haste', duration: 1200, level: 2 }
]

function matchesReagent(item, entry) {
    return Ingredient.of(entry).test(item)
}

function getTier(item) {
    for (let entry of COMMON_REAGENTS) {
        if (matchesReagent(item, entry)) {
            return COMMON_EFFECTS
        }
    }

    for (let entry of UNCOMMON_REAGENTS) {
        if (matchesReagent(item, entry)) {
            return UNCOMMON_EFFECTS
        }
    }

    for (let entry of RARE_REAGENTS) {
        if (matchesReagent(item, entry)) {
            return RARE_EFFECTS
        }
    }

    return null
}

function hashString(string) {
    let hash = 2166136261

    for (let i = 0; i < string.length; i++) {
        hash ^= string.charCodeAt(i)
        hash = Math.imul(hash, 16777619)
    }

    return hash >>> 0
}

function chooseEffect(seed, reagentId, effects) {
    let hash = hashString(seed + '|' + reagentId)
    return effects[hash % effects.length]
}

function getMedicineMappings(server) {
    let data = server.persistentData
    let mappings = {}

    let mappingString = data.getString('terra_medicine_effects')

    if (mappingString) {
        try {
            mappings = JSON.parse(mappingString)
        } catch (error) {
            mappings = {}
        }
    }

    for (let itemId of Object.keys(mappings)) {
        if (!mappings[itemId]) {
            delete mappings[itemId]
        }
    }

    data.putString(
        'terra_medicine_effects',
        JSON.stringify(mappings)
    )

    return mappings
}

ServerEvents.loaded(event => {
    getMedicineMappings(event.server)
})

ItemEvents.crafted('terra:medicine', event => {
    let reagent = null

    for (let i = 0; i < event.inventory.getSlots(); i++) {
        let item = event.inventory.getStackInSlot(i)

        if (
            !item.isEmpty() && Ingredient.of('#terra:medicine_reagents').test(item)
        ) {
            reagent = item
            break
        }
    }

    if (!reagent) {
        return
    }

    let effects = getTier(reagent)

    if (!effects) {
        return
    }

    let server = event.player.server
    let mappings = getMedicineMappings(server)
    let reagentId = reagent.id

    if (!mappings[reagentId]) {
        let seed = server.worldData.worldGenOptions().seed().toString()

        mappings[reagentId] = chooseEffect(
            seed,
            reagentId,
            effects
        )

        server.persistentData.putString(
            'terra_medicine_effects',
            JSON.stringify(mappings)
        )
    }

    let selected = mappings[reagentId]

    event.item.set(
        'minecraft:custom_data',
        {
            effect: selected.effect,
            duration: selected.duration,
            amplifier: selected.level - 1
        }
    )
})