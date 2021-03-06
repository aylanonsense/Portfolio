import { ExternalSite } from 'helpers/enums'

export default function parseExternalSite(url: string): ExternalSite | undefined {
  if (/^(https?:\/\/)?(www\.)?(.+\.)?castle.games(\/.*)?$/i.test(url)) {
    return ExternalSite.CastleGames
  }
  else if (/^(https?:\/\/)?(www\.)?(.+\.)?epicgames.com(\/.*)?$/i.test(url)) {
    return ExternalSite.EpicGames
  }
  else if (/^(https?:\/\/)?(www\.)?(.+\.)?gamejolt.com(\/.*)?$/i.test(url)) {
    return ExternalSite.GameJolt
  }
  else if (/^(https?:\/\/)?(www\.)?(.+\.)?github.com(\/.*)?$/i.test(url)) {
    return ExternalSite.GitHub
  }
  else if (/^(https?:\/\/)?(www\.)?(.+\.)?instagram.com(\/.*)?$/i.test(url)) {
    return ExternalSite.Instagram
  }
  else if (/^(https?:\/\/)?(www\.)?(.+\.)?itch.io(\/.*)?$/i.test(url)) {
    return ExternalSite.Itch
  }
  else if (/^(https?:\/\/)?(www\.)?(.+\.)?lexaloffle.com(\/.*)?$/i.test(url)) {
    return ExternalSite.Lexaloffle
  }
  else if (/^(https?:\/\/)?(www\.)?(.+\.)?newgrounds.com(\/.*)?$/i.test(url)) {
    return ExternalSite.Newgrounds
  }
  else if (/^(https?:\/\/)?(www\.)?(.+\.)?nintendo.com\/.*-switch(\/.*)?$/i.test(url)) {
    return ExternalSite.NintendoSwitch
  }
  else if (/^(https?:\/\/)?(www\.)?(.+\.)?twitter.com(\/.*)?$/i.test(url)) {
    return ExternalSite.Twitter
  }
}
