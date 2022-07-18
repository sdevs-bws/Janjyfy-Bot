async function flags(target) {
    let Flags = await target.user.fetchFlags();
    Flags = Flags.toArray();
  
    let FlagsArray = []
  
    const badgearray = [
      'DISCORD_EMPLOYEE',
      'PARTNERED_SERVER_OWNER',
      'HYPESQUAD_EVENTS',
      'BUG_HUNTER_LEVEL_1',
      'HOUSE_BRAVERY',
      'HOUSE_BRILLIANCE',
      'HOUSE_BALANCE',
      'EARLY_SUPPORTER',
      'TEAM_USER',
      'BUG_HUNTER_LEVEL_2',
      'VERIFIED_BOT',
      'EARLY_VERIFIED_BOT_DEVELOPER'
    ]
  
    const badgeemoji = [
      '<:builder:962312525104439346>',
      '<:partner:962312519211421757>',
      '<:events:962312527830720542>',
      '<:bughunter:962312527541313606>',
      '<:discordbadge:962312524664012821>',
      '<:discordbadge:962312518582280282>',
      '<:discordbadge:962312526127833139>',
      '<:earlynitro:962312525599367198>',
      '<:TEAM_USER:876933196833488896>',
      '<:megabughunter:962312526090096660>',
      '<:verifiedbot:962312515952468018>',
      '<:botdev:962312526991884288>'
    ]
  
    for (let i = 0; i < 19; i++) {
  
      if (Flags.includes(badgearray[i])) {
        FlagsArray.push(badgeemoji[i]);
      }
    }
    
    if (!FlagsArray.join(" ")) return 'ㅤ'
    return FlagsArray.join(" ");
  }
  
  module.exports = flags