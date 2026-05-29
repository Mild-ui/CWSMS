const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt  = require('jsonwebtoken');
const app = express();
const PORT = 5000;
const secreat = "FaziDirector@2026__In.Exam.Nationale";

// Middleware
app.use(cors());
app.use(express.json());

// Connection of Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'CWSMS'
})

db.connect(err => {
    if(err) {
        console.log('Error while trying to connect to database')
    } else {
        console.log('Database connected Successfully')
    }
})

// Register User 
app.post('/register' ,  (req,res) => {
    const {UserName , Password} = req.body;
    db.query('SELECT * FROM Users WHERE UserName = ?' , [UserName] , async(err,results) => {
        if(results.length > 0) {
            return res.status(400).json({message : "User Already Exists"});
        }

        const HashedPassword = await bcrypt.hash(Password , 12);
        db.query('INSERT INTO Users (UserName , Password) VALUES (? , ?)' ,[UserName , HashedPassword] , (err,results) => {
            if(err) {
                return res.status(500).json(err)
            }

            res.status(200).json({message : "User Created"})
        })
    })
})

// Login
app.post('/login' , (req ,res) => {
    const {UserName , Password} = req.body;
    db.query('SELECT * FROM Users WHERE UserName = ?' , [UserName] , async(err ,results) => {
        if(results.length === 0) {
            return res.status(400).json({message : "User Not Found"})
        }

        const User = results[0];
        const ValidPassword = await bcrypt.compare(Password , User.Password);
        if(!ValidPassword) {
            return res.status(400).json({message : "Password Should Be Valid"})
        }

        const token = jwt.sign({id : User.id} , secreat , {expiresIn: '1d'})
        res.status(200).json({message : "User Logged in successfully", token} )
    })
})

// Reset/Update User Password
// app.put('/reset-password', (req, res) => {
//     const { UserName, NewPassword } = req.body;
//     db.query('SELECT * FROM Users WHERE UserName = ?', [UserName], async (err, results) => {
//         if (err) {
//             return res.status(500).json(err);
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ message: "Username not found in system record" });
//         }

//         const HashedPassword = await bcrypt.hash(NewPassword, 12);
//         db.query('UPDATE Users SET Password = ? WHERE UserName = ?', [HashedPassword, UserName], (err, results) => {
//             if (err) {
//                 return res.status(500).json(err);
//             }

//             res.status(200).json({ message: "Password updated successfully" });
//         });
//     });
// });


// Try me 
app.put('/reset-password' , (req,res) => {
    const {UserName , NewPassword} = req.body;
    db.query('SELECT * FROM Users WHERE UserName =  ?' , [UserName] , async(err,results) => {
        if(err) {
            return res.status(500).json(err)
        }

        if(results.length === 0) {
            return res.status(400).json({message : "User Not found"})
        }

        const NewHashedPassword =await bcrypt.hash(NewPassword , 12);
        db.query('UPDATE Users SET Password = ? WHERE UserName = ?' , [NewHashedPassword , UserName] , (err,results) => {
            if(err) {
                return res.status(500).json(err)
            }

            res.status(200).json({message : "Password updated successfully"})
        })
    })
})

// Get Packages
app.get('/get-packages' , (req,res) => {
    db.query('SELECT * FROM Package' , (err,results) => {
        if(err) {
            return res.status(500).json(err);
        }

        res.status(200).json(results);
    })
})

// Store a car in database
app.post('/store-car' , (req,res) => {
    const {PlateNumber , CarType , CarSize , DriverName , PhoneNumber} = req.body;
    db.query('INSERT INTO Car (PlateNumber , CarType , CarSize , DriverName , PhoneNumber) VALUES (? , ? , ? , ? , ?)' , [ PlateNumber , CarType , CarSize , DriverName ,PhoneNumber] , (err,results) => {
        if(err) {
            return res.status(500).json(err)
        }

        res.status(200).json({message : "Car Created Successfully"})
    })
})

// Retrieve cars in database
app.get('/get-cars' , (req,res) => {  
    db.query('SELECT * FROM Car' , (err,results) => {
        if(err) {
            return res.status(500).json(err)
        }

        res.status(200).json(results)
    })
})

// Retrieve a single car by Plate Number
app.get('/get-car/:PlateNumber', (req, res) => {
    const { PlateNumber } = req.params;
    db.query('SELECT * FROM Car WHERE PlateNumber = ?', [PlateNumber], (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (results.length === 0) {
            return res.status(404).json({ message: "Car not found" });
        }
        res.status(200).json(results[0]); 
    });
});


// Update car in database
app.put('/update-car/:PlateNumber' , (req,res) => {
    const {PlateNumber} = req.params;
    const {CarType , CarSize , DriverName,PhoneNumber} = req.body;

    db.query('UPDATE Car SET CarType = ? , CarSize = ? , DriverName = ? , PhoneNumber = ? WHERE PlateNumber = ?' , [ CarType , CarSize , DriverName , PhoneNumber , PlateNumber] , (err,results) => {
        if(err) {
            return res.status(500).json(err);
        }

        res.status(200).json({message : "Car Updated Successfully"})
    })
})

// Delete a car from database
app.delete('/delete-car/:PlateNumber' , (req,res) => {
    const {PlateNumber} = req.params;
    db.query('DELETE FROM Car WHERE PlateNumber = ?' , [PlateNumber] , (err,results) => {
        if(err) {
            return res.status(500).json(err)
        }

        res.status(200).json({message : "Car deleted successfully"})
    })
})

// Create a service package
app.post('/create-service-package' , (req,res) => {
    const { RecordNumber , PackageNumber , PlateNumber , ServiceDate } = req.body;
    db.query('INSERT INTO ServicePackage (RecordNumber , PackageNumber , PlateNumber , ServiceDate) VALUES (? , ? , ? , ?)' , [RecordNumber , PackageNumber , PlateNumber , ServiceDate] , (err,results) => {
        if(err) {
            return res.status(500).json(err)
        }

        res.status(200).json({message : "The Service Created Successfully"})
    })
})

// Select a service package
app.get('/get-service-Package', (req, res) => {
    const query = `
        SELECT 
            s.RecordNumber, 
            s.PlateNumber, 
            p.PackageName, 
            s.serviceDate
        FROM ServicePackage s
        INNER JOIN Car c ON s.PlateNumber = c.PlateNumber
        INNER JOIN Package p ON s.PackageNumber = p.PackageNumber
        ORDER BY s.serviceDate DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error("Database error in get-service-Package:", err);
            return res.status(500).json(err);
        }
        res.status(200).json(results);
    });
});



// Insert payment records 
app.post('/create-payment-record', (req, res) => {
    const { AmountPaid, PaymentDate, RecordNumber } = req.body;

    db.query(
        'INSERT INTO Payment (AmountPaid, PaymentDate, RecordNumber) VALUES (?, ?, ?)', 
        [AmountPaid, PaymentDate, RecordNumber], 
        (err, results) => {
            if (err) {
                return res.status(500).json(err);
            }
            res.status(200).json({ message: "Payment Recorded Successfully" });
        }
    );
});


//  Retrieve payments 
app.get('/get-payment-record', (req, res) => {  
    const query = `
        SELECT 
            p.PaymentNumber,
            p.AmountPaid,
            p.PaymentDate,
            c.PlateNumber,
            c.DriverName,
            sp.PackageNumber
        FROM Payment p
        JOIN ServicePackage sp ON p.RecordNumber = sp.RecordNumber
        JOIN Car c ON sp.PlateNumber = c.PlateNumber
        ORDER BY p.PaymentDate DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(results);
    });
});

// Report page
app.get('/retrieve-report', (req, res) => {
    const query = `
        SELECT 
            p.PaymentNumber,
            p.AmountPaid,
            p.PaymentDate,
            c.PlateNumber,
            c.CarType,
            c.CarSize,
            c.DriverName,
            c.PhoneNumber,
            sp.ServiceDate,
            sp.PackageNumber AS PackageName
        FROM Payment p
        JOIN ServicePackage sp ON p.RecordNumber = sp.RecordNumber
        JOIN Car c ON sp.PlateNumber = c.PlateNumber
        ORDER BY p.PaymentDate DESC
    `;

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.status(200).json(results);
    });
});


// Start server
app.listen(PORT , () => {
    console.log(`Server is running on the port of ${PORT}`);
})