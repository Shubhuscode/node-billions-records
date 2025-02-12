// server.js
const cluster = require('cluster');
const os = require('os');
const app = require('./src/app');
const connectDB = require('./src/config/db');

if (cluster.isMaster) {
  const numCPUs = os.cpus().length;
  console.log(`Master process started. Forking ${numCPUs} workers...`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
} else {
  connectDB().then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Worker process listening on port ${PORT}`);
    });
  });
}
