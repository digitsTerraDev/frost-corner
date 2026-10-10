ServerEvents.recipes(event => {
    event.custom({
        type: 'firmalife:drying',
        ingredient: {
            item: 'terra:flower_shaving'
        },
        result: {
            count: 1,
            id: 'terra:dried_flower_shaving'
        }
    });
});