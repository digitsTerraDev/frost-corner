StartupEvents.registry('fluid', event => {

    event.create('terra:vermilion_fluid')
        .displayName('Vermilion Fluid')
        .noBlock()
        .renderType('solid')
        .stillTexture('terra:block/vermilion_fluid')
        .flowingTexture('terra:block/vermilion_fluid')
})
