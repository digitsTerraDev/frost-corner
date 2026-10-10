StartupEvents.registry('item', event => {

    event.create('terra:unfired_ceremetal')
    .displayName('Unfired Ceremetal')
    .maxStackSize(32)

    event.create('terra:hardtack_sandwich')
    .displayName('Hardtack Sandwich')
    .maxStackSize(32)
    event.create('terra:medicine')
        .displayName('Suspicious Medicine')
        .maxStackSize(16)
        .useAnimation('eat')
        .useDuration(itemstack => 8)
        .use((level, player, hand) => global.medicineUse(level, player, hand))
        .finishUsing((itemstack, level, entity) =>
            global.medicineFinishUsing(itemstack, level, entity)
        )

    event.create('terra:horn_powder')
        .displayName('Horn Powder')

    event.create('terra:flower_shaving')
        .displayName('Flower Shaving')

    event.create('terra:dried_flower_shaving')
        .displayName('Dried Flower Shaving')

    event.create('terra:vermilion_crystal')
        .displayName('Vermilion Crystal')

    event.create('terra:vermilion_base')
        .displayName('Vermilion Base')

    event.create('terra:medicine_base')
        .displayName('Medicine Base')
})


// hi 
