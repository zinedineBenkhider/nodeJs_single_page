var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var dbURI = 'mongodb://zinedineBnk:Boubibooba06@cluster0-shard-00-00.xq8t8.mongodb.net:27017,cluster0-shard-00-01.xq8t8.mongodb.net:27017,cluster0-shard-00-02.xq8t8.mongodb.net:27017/<dbname>?ssl=true&replicaSet=atlas-2ded0r-shard-0&authSource=admin&retryWrites=true&w=majority';
var dbConnection = mongoose.createConnection(dbURI);


module.exports = dbConnection;


dbConnection.on('connected',
  () => {
    console.log('db.js : connected to '+ dbURI);
  }
);
dbConnection.on('disconnected',
  () => {
    console.log('db.js : disconnected from '+ dbURI);
  }
);
dbConnection.on('error',
  (err) => {
    console.log('connection error '+ err);
  }
);


//
// gestion "propre" de la fermeture de la connexion
//
var shutdown = function(msg, callback) {
  dbConnection.close(() => {
      console.log(' Mongoose shutdown : '+msg)
      callback();
    }
  );
}

// application killed (ctrl+c)
process.on('SIGINT', () => shutdown('application ends', () => process.exit(0)) );
// pour nodemon
process.once('SIGUSR2', () => shutdown('nodemon restarting', () => process.kill(process.pid, 'SIGUSR2')) );
// process killed (POSIX)
process.on('SIGTERM', () =>  shutdown('SIGTERM received', () => process.exit(0)) );
