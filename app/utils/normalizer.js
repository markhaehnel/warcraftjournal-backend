module.exports.getNormalizedRealmName = (realm) => {
    return realm
        .replace('\'', '')
        .replace(' ', '-')
        .toLowerCase()
        .replace(/[àáâãäå]/g, 'a')
        .replace(/[èéêë]/g, 'e')
        .replace(/[îíì]/g, 'i')
        .replace(/[öóòô]/g, 'i')
}

module.exports.getNormalizedCharacterName = (character) => {
    return character.toLowerCase()
}
