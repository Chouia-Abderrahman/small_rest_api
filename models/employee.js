const mongoose = require('mongoose');

const dbURI = 'mongodb://localhost/biometric-time-clock';

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const employeeSchema = new mongoose.Schema({
  id: String,
  thing:String,
  lastName: String,
  firstName: String,
  dateCreated: Date,
  department: String,
  checkIns: Date,
  checkOuts: Date,
  timeDifference: Number,
  comments: String,
});

module.exports = mongoose.model('Employee', employeeSchema);
console.log('ran');
