const express = require('express');
const app = express();
const port = 3000;

const sequelize = require('./config/db_config');
const employee = require('./models/employee');
const check = require('./models/checks');

app.use(express.json());

app.post('/employees', async (req, res) => {
    try {
        const { id, lastName, firstName, dateCreated, department } = req.body;
        
        const employee = await Employee.create({
            id,
            lastName,
            firstName,
            dateCreated,
            department
        });
        res.status(201).json({ message: 'Employee created successfully', employee });
    } catch (error) {
        console.error('Error creating employee:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
 // get all employees or employees created in a certain date

  // Route to get employees
  app.get('/employees', async (req, res) => {
    const { date } = req.query; // Get the value of the 'date' query parameter
    try {
        let employees;
        if (date) {
            employees = await employee.findAll({
                where: sequelize.where(sequelize.fn('DATE', sequelize.col('createdAt')), '=', new Date(date))
            });
        } else {
            employees = await employee.findAll();
        }
        res.status(200).json(employees);
    } catch (error) {
        console.error('Error fetching employees:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to handle check-in
app.post('/check-in', async (req, res) => {
    const { employeeId, comment } = req.body;
    try {
        // Find the employee by employeeId
        const emp = await employee.findByPk(employeeId);
        if (!emp) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Perform check-in
        await check.create({
            employee_id: employeeId,
            checkin: new Date(),
            comment: comment
        });

        res.status(201).json({ message: 'Check-in successful' });
    } catch (error) {
        console.error('Error performing check-in:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to handle check-out
app.post('/check-out', async (req, res) => {
    const { employeeId, comment } = req.body;
    try {
        // Find the employee by employeeId
        const emp = await employee.findByPk(employeeId);
        if (!emp) {
            return res.status(404).json({ error: 'Employee not found' });
        }

        // Perform check-out
        await check.update({
            checkout: new Date(),
            comment: comment
        }, {
            where: {
                employee_id: employeeId,
                checkout: null // Only update if checkout is null (not already checked out)
            }
        });

        res.status(200).json({ message: 'Check-out successful' });
    } catch (error) {
        console.error('Error performing check-out:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
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


async function initializeDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');

        // Sync the model with the database
        await employee.sync({ force: false }); 
        await check.sync({ force: false });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

initializeDatabase();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});