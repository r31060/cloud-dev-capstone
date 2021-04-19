// TODO: Once your application is deployed, copy an API id here so that the frontend could interact with it
const apiId = 'bvzytfc2j7'
export const apiEndpoint = `https://${apiId}.execute-api.us-west-2.amazonaws.com/dev`

export const authConfig = {
  // TODO: Create an Auth0 application and copy values from it into this map
  domain: 'tk4211.us.auth0.com',            // Auth0 domain
  clientId: 'zDSRiVkMKfriIvVW0wjy5TST3XgyaYFd',          // Auth0 client id
  callbackUrl: 'http://localhost:3000/callback'
}