module.exports.getNormalizedCharacterName = (character) => {
  return character.toLowerCase()
}

module.exports.getNormalizedGuildName = (character) => {
  return character.toLowerCase().replace(/-/g, '-')
}
