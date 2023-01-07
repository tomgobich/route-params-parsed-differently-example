/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async ({ response }) => {
  let failedUrl = ''

  try {
    // fails because it's expecting 'slug.html' as param name
    failedUrl = Route.makeUrl('test', { slug: 'somevalue' })
  } catch (error) {
    console.error({ error })
  }

  // works, but ends up excluding `.html` from final url output 
  // since it's considered a part of the param name
  const workingUrl1 = Route.makeUrl('test', { 'slug.html': 'somevalue' })
  const workingUrl2 = Route.makeUrl('test', ['somevalue'])

  return response.json({
    failedUrl,    // output: ""                 expected: "/test/somevalue.html"
    workingUrl1,  // output: "/test/somevalue"  expected: "/test/somevalue.html"
    workingUrl2   // output: "/test/somevalue"  expected: "/test/somevalue.html"
  })
})

Route.get('/test/:slug.html', async ({ response, params }) => {
  return response.json(params) // output: { slug: "somevalue" }  expected: { slug: "somevalue" }
}).as('test')
