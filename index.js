require('dotenv').config()

const fetch = require('node-fetch')

const createClient = require('@commercetools/sdk-client').createClient

const createAuthMiddlewareForClientCredentialsFlow = require('@commercetools/sdk-middleware-auth')
  .createAuthMiddlewareForClientCredentialsFlow

const createLoggerMiddleware = require('@commercetools/sdk-middleware-logger')
  .createLoggerMiddleware

const client = createClient({
  middlewares: [
    createAuthMiddlewareForClientCredentialsFlow({
      host: process.env.AUTH_HOST,
      projectKey: process.env.PROJECT_KEY,
      credentials: {
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
      },
      scopes: [
        `view_project_settings:${process.env.PROJECT_KEY}`,
        `view_products:${process.env.PROJECT_KEY}`,
        `manage_products:${process.env.PROJECT_KEY}`,
      ],
      fetch,
    }),
    createLoggerMiddleware(),
  ],
})

const getProduct = async () => {
  try {
    const request = {
      uri: `${process.env.API_HOST}/${process.env.PROJECT_KEY}/products`,
      method: 'GET',
    }
    client
      .execute(request)
      .then((result) => console.log('result', result))
      .catch((error) => console.log('error', error))
  } catch (e) {
    console.log('process error', e)
  }
}

getProduct()
