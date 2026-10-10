ServerEvents.recipes(event => {
    event.custom({
        type: 'tfc:advanced_shapeless_crafting',
        ingredients: [
            {
                item: 'terra:medicine_base'
            },
            {
                tag: 'terra:medicine_reagents'
            },
            {
                tag: 'tfc:foods/sweeteners'
            },
            {
                type: 'tfc:and',
                children: [
                    {
                        tag: 'c:foods/flour'
                    },
                    {
                        type: 'tfc:not_rotten'
                    }
                ]
            }
        ],
        primary_ingredient: {
            item: 'terra:medicine_base'
        },
        remainder: {
            modifiers: []
        },
        result: {
            modifiers: [],
            stack: {
                count: 3,
                id: 'terra:medicine'
            }
        }
    })
})