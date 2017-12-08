const http = require('http');
const express = require('express');
const proxy = require('express-http-proxy');
const { spawn } = require('child_process');

const RESET = '\x1b[0m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const RED = '\x1b[31m';
const MAGENTA = '\x1b[35m';
const UNDERSCORE = '\x1b[4m';

const reformat = (colour, name) => data => {
  const prefix = `${colour}${name}${RESET} `;
  const _data = String(data)
    .replace(/\n$/, '')
    .replace(/^\n+/m, '')
    .replace(/\n/mg, `\n${prefix}`);
  return prefix + _data + '\n';
};

const wrap = (name, colour, ex, args) => {
  const child = spawn(ex, args);
  const out = reformat(colour, name);
  child.stdout.on('data', data => process.stdout.write(out(data)));
  child.stderr.on('data', data => process.stderr.write(out(data)));
  return child;
};

const functions = wrap('λ ', BLUE, 'npm', ['run', 'serve']);
const neutrino  = wrap('⚛︎ ', YELLOW, 'npm', ['run', 'start']);

const app = express();

app.use('/api', proxy('localhost:5000', {
  proxyReqPathResolver: req => `/api${req.url}`,
}));
app.use('/', proxy('localhost:5010'));

app.locals.port = process.env.PORT ? +process.env.PORT : 5020;
const server = app
  .listen(app.locals.port, function debugPort() {
   process.stdout.write(`Server running on port ${UNDERSCORE}${RED}http://localhost:${app.locals.port}${RESET}\n\n`);
  })
  .on('error', error => {
    process.stderr.write(`Failed to start server: ${error.message}\n`);
    server.close();
  });
