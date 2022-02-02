type SiteData = {
  title: string,
  subtitle?: string | undefined,
  description: string,
  author: PersonData,
  shortBio?: Document | undefined,
  bigProjects?: Document | undefined,
  smallProjects?: Document | undefined,
  speakingExperience?: Document | undefined,
  contactInformation?: Document | undefined,
  disclaimer?: Document | undefined
}
