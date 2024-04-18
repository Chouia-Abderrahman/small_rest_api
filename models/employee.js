// const mongoose = require('mongoose');

// const dbURI = 'mongodb://mongo:27017/biometric-time-clock';
// //mongoose.connect('your-database-name', { useNewUrlParser: true, useUnifiedTopology: true });

// mongoose.connect(dbURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// const db = mongoose.connection;

// db.on('error', console.error.bind(console, 'MongoDB connection error:'));
// db.once('open', () => {
//   console.log('Connected to MongoDB');
// });

// const employeeSchema = new mongoose.Schema({
//   id: String,
//   lastName: String,
//   firstName: String,
//   dateCreated: Date,
//   department: String,
//   checkIns: Date,
//   checkOuts: Date,
//   timeDifference: Number,
//   comments: String,
// });

// module.exports = mongoose.model('Employee', employeeSchema);
// console.log('ran');
//////////////////////////////// postgres connection
const { Client } = require('pg');

const client = new Client({
	user: 'node',
	password: 'node',
	host: 'localhost',
	port: '5432',
	database: 'node_db',
});
console.log('pg connection sucess');