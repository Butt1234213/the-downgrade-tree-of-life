const express = require('express');
const path = require('path');
const app = express();
const helmet = require('helmet');
const port = 3000;
/* 
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'"],
    },
  })
); */
/* app.use(function (req, res, next) {
  res.setHeader(
    'Content-Security-Policy', "img-src 'self'"
  );
  res.setHeader('Content-Security-Policy', "default-src 'self' connect-src 'self';")
  
  next();
}); */

app.use(express.static(path.join(__dirname, 'node_modules/break_eternity.js/dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

// To build the .exe file use
// pkg -t node*-win-x64 server.js
// in git bash