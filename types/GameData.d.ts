type GameData = {
  title: string,
  slug: string,
  image: ImageAssetData,
  order: number,
  role?: string | undefined,
  releaseDate?: string | undefined,
  itchUrl?: string | undefined,
  lexaloffleUrl?: string | undefined,
  newgroundsUrl?: string | undefined,
  gameJoltUrl?: string | undefined,
  gitHubUrl?: string | undefined,
  overview?: Document | undefined,
  development?: Document | undefined,
  reception?: Document | undefined,
  credits?: Document | undefined
}
