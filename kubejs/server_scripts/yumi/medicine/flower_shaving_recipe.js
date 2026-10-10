ServerEvents.recipes(event => {
    event.custom({
        type: 'tfc:advanced_shapeless_crafting',
        ingredients: [
            {
                tag: 'minecraft:bee_food'
            },
            {
                tag: 'c:tools/knife'
            }
        ],
        primary_ingredient: {
            tag: 'c:tools/knife'
        },
        remainder: {
            modifiers: [
                {
                    type: 'tfc:damage_crafting_remainder'
                }
            ]
        },
        result: {
            modifiers: [],
            stack: {
                count: 1,
                id: 'terra:flower_shaving'
            }
        }
    });
});