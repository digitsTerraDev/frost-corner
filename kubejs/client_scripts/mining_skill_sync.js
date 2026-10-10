NetworkEvents.dataReceived('terra_mining_ranks', event => {
    global.terraMiningRanks[event.player.getUUID().toString()] = {
        mining: event.data.getInt('mining'),
        deep: event.data.getInt('deep'),
        stone: event.data.getInt('stone'),
        excavating: event.data.getInt('excavating')
    }
})

ClientEvents.loggedOut(event => {
    global.terraMiningRanks = {}
})
