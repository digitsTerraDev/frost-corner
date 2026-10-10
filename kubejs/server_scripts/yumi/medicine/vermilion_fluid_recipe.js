ServerEvents.recipes(event => {
    event.recipes.tfc.pot(
        [
            'minecraft:redstone',
            'minecraft:redstone',
            'minecraft:redstone',
            '#c:powders/sulfur',
            '#c:powders/sulfur'
        ],
        Fluid.of('minecraft:water', 1000),
        500,
        500
    )
    .fluidOutput(Fluid.of('terra:vermilion_fluid', 1000));
});