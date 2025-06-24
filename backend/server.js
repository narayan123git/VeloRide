const http=require('http');
const app = require('./app');
const { SocketInitialization } = require('./socket');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

SocketInitialization(server); // Initialize sockets here

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
}
);