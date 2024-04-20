const express = require('express');
const app = express();
const port = 3000; 

const Employee = require('./models/employee'); // Import the Employee model

app.use(express.json());

// // create new employee
// app.post('/employees', async (req, res) => {
//   try {
//     const { id, lastName, firstName, dateCreated, department } = req.body;
//     const employee = new Employee({ 
//         id, 
//         lastName,
//         firstName,
//         dateCreated,
//         department,
//          });
//     await employee.save();
//     res.status(201).json(employee);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });
//  // get all employees or employees created in a certain date

//   app.get('/employees', async (req, res) => {
//     try {
//       const { dateCreated } = req.query;
  
//       const query = dateCreated ? { dateCreated } : {};
  
//       const employees = await Employee.find(query);
  
//       res.json(employees);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
// // adding a checkin time for existing employee using id and a comment as well

//   app.put('/check-in', async (req, res) => {
//     try {
//       const { employeeId, comment } = req.body;
  
//       const employee = await Employee.findById(employeeId);
  
//       if (!employee) {
//         return res.status(404).json({ error: 'Employee not found' });
//       }

//       employee.checkIns = new Date();
  
//       if (comment) {
//         employee.comments = comment;
//       }
  
//       await employee.save();
  
//       res.status(201).json(employee);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });
  
//   // inserting Check-out time into existing employee based on id and calculating the time between checkin and out
//   app.put('/check-out', async (req, res) => {
//     try {
//       const { employeeId, comment } = req.body;
        
//       const employee = await Employee.findById(employeeId);
  
//       if (!employee) {
//         return res.status(404).json({ error: 'Employee not found' });
//       }






      
  
//       const checkInTime = employee.checkIns;
//       const checkOutTime = new Date();
//       const timeDifference = checkOutTime - checkInTime;
  
//       employee.checkOuts = checkOutTime;
//       employee.timeDifference = timeDifference;

//       //employee.checkOuts(new Date());
  
//       if (comment) {
//         employee.comments=comment;
//       }
  
//       await employee.save();
  
//       res.status(201).json(employee);
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

//   app.delete('/delete-all', async (req, res) => {
//     try {
//       // Use the deleteMany method with an empty filter to delete all documents
//       const result = await Employee.deleteMany({});
  
//       if (result.deletedCount === 0) {
//         return res.status(404).json({ message: 'No records found to delete' });
//       }
  
//       res.status(200).json({ message: 'All records deleted', deletedCount: result.deletedCount });
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

const sequelize = require('./config/db_config');
const employee = require('./models/employee');

async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');

        // Sync the model with the database
        await employee.sync({ force: true }); // Use force: true to drop the table if it already exists
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initializeDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});