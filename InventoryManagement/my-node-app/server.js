const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const session = require('express-session');

const app = express();
const port = 3000;

// In-memory "database" for demonstration purposes
let users = [];

app.use(bodyParser.json());
app.use(session({
    secret: 'inventory secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // For development purposes only, use 'true' for production
}));

// Middleware to check if user is logged in
function isAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        return next();
    }
    res.status(401).send("You are not authenticated");
}

// Registration endpoint
app.post('/register', async (req, res) => {
    const { username, password, role } = req.body;

    if (!username || !password || !role) {
        return res.status(400).send("Missing fields");
    }

    // Check if user already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        return res.status(409).send("User already exists");
    }

    try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = { username, password: hashedPassword, role };
        users.push(newUser);

        // Automatically log in the user after registration
        req.session.user = newUser;
        
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).send("User not found");
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(401).send("Invalid credentials");
    }

    // Set user session
    req.session.user = user;
    res.send("Logged in successfully");
});

// Inventory route (protected)
app.get('/inventory', isAuthenticated, (req, res) => {
    // Example inventory data
    res.json([{ id: 1, name: "Printer Paper", quantity: 100 }]);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
