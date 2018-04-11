import React from 'react';
import path from 'path';
import fs from 'fs';

const isProduction = process.env.NODE_ENV === 'production'
const buildDir = isProduction ? fs.readdirSync(path.resolve(__dirname, '../../build')) : ''
const appJS = isProduction ? buildDir.find(file => /^app\-\w+\.js$/.test(file)) : ''
const appCSS = isProduction ? buildDir.find(file => /^app\-\w+\.css$/.test(file)) : ''
const scripts = isProduction ? `/build/${appJS}` : '//localhost:8080/build/app.js'

export default () =>
  <html>
    <head>
      <meta charSet="utf-8" />
      <title>Simple loan calculator</title>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap-reboot.css" rel="stylesheet" />
      <link href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.0.0/css/bootstrap.css" rel="stylesheet" />

      {isProduction && <link href={`/build/${appCSS}`} rel="stylesheet" />}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link rel="shortcut icon" href="data:image/x-icon;," type="image/x-icon" />
    </head>
    <body>
      <div id="app-root" />
      <script src={scripts} type="text/javascript" />
    </body>
  </html>
