import React from 'react'
import ReactDOMServer from 'react-dom/server'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'

import Html from './html'

const app = express()
const port = process.env.PORT || 8000

app.use(compression())
app.use('/build', express.static('build'))

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// send HTML
app.get(/^\/(?!api).*/, (req, res) => {
  res.send(`<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(<Html />)}`)
});

app.listen(port)
console.log(`Server started on port ${port}`) // eslint-disable-line
