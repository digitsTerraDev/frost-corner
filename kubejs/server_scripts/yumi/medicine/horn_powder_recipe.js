ServerEvents.recipes(event => {

    event.recipes.tfc.quern(
        '2x terra:horn_powder',
        '#terra:horns'
    )

    event.recipes.create.milling(
        '2x terra:horn_powder',
        Ingredient.of('#terra:horns')
    )

    event.recipes.create.crushing(
        '3x terra:horn_powder',
        Ingredient.of('#terra:horns')
    )

})