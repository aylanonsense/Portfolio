require('dotenv').config()
const contentfulManagement = require('contentful-management')

module.exports = function() {
  if (process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN == undefined) {
    throw 'Environment variable CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN is not defined!'
  }
  if (process.env.CONTENTFUL_SPACE_ID == undefined) {
    throw 'Environment variable CONTENTFUL_SPACE_ID is not defined!'
  }
  if (process.env.CONTENTFUL_ENVIRONMENT == undefined) {
    throw 'Environment variable CONTENTFUL_ENVIRONMENT is not defined!'
  }

  const contentfulClient = contentfulManagement.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_API_ACCESS_TOKEN,
  })

  return contentfulClient
    .getSpace(process.env.CONTENTFUL_SPACE_ID)
    .then(space => space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT))
}
