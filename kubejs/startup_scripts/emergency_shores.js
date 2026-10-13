// Block registration only: placement gates and arrest attempts belong to Powers.
// These are consumable emergency shores, not permanent TFC support beams.
StartupEvents.registry('block', event => {
    ;[
        ['copper_braced_shore', 'Copper-Braced Shore', 2.5, 'stone'],
        ['black_steel_shore', 'Black Steel Shore', 4.0, 'iron']
    ].forEach(shore => {
        event.create(`kubejs:${shore[0]}`)
            .displayName(shore[1])
            .hardness(shore[2])
            .notSolid()
            .box(0, 0, 6, 3, 13, 10, true)
            .box(13, 0, 6, 16, 13, 10, true)
            .box(0, 13, 5, 16, 16, 11, true)
            .tagBlock('minecraft:mineable/pickaxe')
            .tagBlock(`minecraft:needs_${shore[3]}_tool`)
            .requiresTool(true)
    })
})
