const http = require('http');
const express = require('express');
const proxy = require('express-http-proxy');
const { spawn } = require('child_process');

const RESET = '\x1b[0m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';


const wrap = (name, color, ex, args) => {
  const child = spawn(ex, args);
  const out = data => `${color}${name}>${RESET} ${data}`;
  child.stdout.on('data', data => process.stdout.write(out(data)));
  child.stderr.on('data', data => process.stderr.write(out(data)));
  return child;
};

const functions = wrap('λ ', BLUE, 'npm', ['run', 'serve']);
const neutrino  = wrap('⚛︎ ', YELLOW, 'npm', ['run', 'start']);

const app = express();

app.use('/api', proxy('localhost:5000', {
  proxyReqPathResolver: req => `/api${req.url}`,
  parseReqBody: true,
  preserveHostHdr: true,
}));
app.use('/', proxy('localhost:5010'));

app.locals.port = process.env.PORT ? +process.env.PORT : 5020;
const server = app
  .listen(app.locals.port, function debugPort() {
    console.log(`Server running on port http://localhost:${app.locals.port}`);
  })
  .on('error', error => {
    console.error(`Failed to start server: ${error.message}`);
    server.close();
  });
