const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const usersFilePath = path.join(__dirname, '../data/users.json');

router.post('/register', (req, res, next) => {
    const { firstname, lastname,username, email, password,mobile,dob,favorite_sports,male,female,country} = req.body;

    // Create a new user object
    const newUser = {
        firstname,
        lastname,
        username,
        email,
        password, 
        mobile,
        dob,
        favorite_sports,
        male,
        female,
        country
    };

    // Read the existing users from user.json
    fs.readFile(usersFilePath, 'utf-8', (err, data) => {
        if (err) {
            const err = new Error('Error reading user data');
            err.status = 500;
            return next(err); // Forward to error-handling middleware
        }

        let users = [];
        if (data) {
            users = JSON.parse(data); // Parse existing users
        }

        // Check if user already exists by email
        const existingUser = users.find(user => user.email === email);
        if (existingUser) {
            const err = new Error('User with this email already exists');
            err.status = 400;
            return next(err); // Forward to error-handling middleware
        }

        // Add the new user to the array
        users.push(newUser);
        
        // Write the updated users array back to user.json
        fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (writeErr) => {
            if (writeErr) {
                const err = new Error('Error saving user data');
                err.status = 500;
                return next(err); // Forward to error-handling middleware
            }
            // Render the success page with the user's first name
            res.render('register_success', { firstname: firstname });
        });
    });
});

module.exports = router;
