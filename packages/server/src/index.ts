import { log } from 'node:console'
import type { AddressInfo } from 'node:net'
import express, { Router, json, urlencoded } from 'express'
import type { ErrorRequestHandler, Response, RouterOptions } from 'express'
import type{ OptionsUrlencoded } from 'body-parser'

const port = 3000
const defaultUrlencodedOptions = <OptionsUrlencoded>{ extended: true }
const defaultRouterOptions = <RouterOptions>{ mergeParams: true, caseSensitive: true, strict: true }

const handleError: () => ErrorRequestHandler = () => (error, _request, response, next) => {
  if (error instanceof Error)
    return response.status(500).json({ message: error.message || 'Internal Server Error' })

  next()
}

const app = express().disable('x-powered-by')
const server = app.listen(port, 'localhost')
const router = Router(defaultRouterOptions)

router.get('/', (_request, response: Response<{ message: string }>) => response.json({ message: 'Hello World!' }))

app.use(json(), urlencoded(defaultUrlencodedOptions), (_request, response, next) => {
  response.header('Access-Control-Allow-Origin', 'http://localhost:5173')
  response.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept')
  response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  next()
})
app.use(router)
app.use(handleError())

server.addListener('listening', () => {
  const { address, port } = <AddressInfo>server.address()

  log(`Server is listening on http://${address}:${port}`)
})
