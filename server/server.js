const http = require('http');
const app = require('./app');
const { connection } = require('./database/modals');

const httpServer = http.Server(app);


const port = app.get('port');

connection.sync().then(() => {
  httpServer.listen(port, () => {
    console.log(port);
  });
});
