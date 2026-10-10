ServerEvents.recipes(event => {

    event.recipes.tfc.quern(
        '4x terra:vermilion_base',
        'terra:vermilion_crystal'
    )

    event.recipes.create.milling(
        '4x terra:vermilion_base',
        Ingredient.of('terra:vermilion_crystal')
    )

    event.recipes.create.crushing(
        [
		'4x terra:vermilion_base',
		CreateItem.of('minecraft:redstone', 0.5)
	],
        Ingredient.of('terra:vermilion_crystal')
    )

})