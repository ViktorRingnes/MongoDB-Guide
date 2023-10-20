// Import necessary modules
const { MongoClient } = require('mongodb'); // MongoDB driver for Node.js
const bodyParser = require('body-parser'); // Middleware to parse incoming request bodies
const cors = require('cors'); // Middleware for enabling CORS (Cross-Origin Resource Sharing)

// Initialize the express application
const app = express();

// MongoDB connection URI (should be kept private)
const uri = "";

// Apply middlewares to the express app
app.use(cors()); // Enable CORS to allow cross-origin requests
app.use(express.json()); // Parse incoming JSON payloads
app.use(bodyParser.json()); // Parse incoming request bodies as JSON

// Configure MongoDB client options
const client = new MongoClient(uri, {
    useNewUrlParser: true, // Use the new URL string parser instead of the deprecated one
    useUnifiedTopology: true // Use a unified topology for the MongoDB driver
});

// Log that the server is starting
console.log("\x1b[41m", "\x1b[37m", "Server starting...", "\x1b[0m");

// Connect to MongoDB
client.connect().then(() => {
    // Get the 'userStorage' database
    const database = client.db("userStorage");
    
    // Get the 'userInfo' collection from the 'userStorage' database
    const usersCollection = database.collection("userInfo");

    // Get the 'SessionStorage' collection from the 'userStorage' database
    const sessionStorageCollection = database.collection("SessionStorage");

    // Log successful database connection
    console.log("\x1b[1m", "\x1b[32m", "------------------------------------");
    console.log('        Connected to Database'); // Console log if we successfully connected to the database
    console.log('        Connection Time:', process.uptime()); // Console log the connection time for future debugging
    console.log("\x1b[1m", "\x1b[32m", "------------------------------------", "\x1b[0m");
    
    // Note: "\x1b[32m" and similar strings are ANSI escape codes for styling the terminal output. 

    // Middleware to log information about incoming requests
    app.use((req, res, next) => {
        console.log("\x1b[30m", "---------------------------------------");
        console.log("\x1b[36m",`${req.method} - ${req.url} - ${req.ip}`);
        next(); // Proceed to the next middleware or route
    });

    // POST route to handle user registration
    app.post('/addUser', async (req, res) => {
        // Extract user information from the request body
        const user = req.body;
        let existingUser = null;

        // Check for existing user
        try {
            existingUser = await usersCollection.findOne({ username: { $regex: new RegExp(`^${user.username}$`, 'i') } });
        } catch (err) {
            console.error('Error checking for existing user:', err);
            return res.status(500).json({ message: 'Error checking for existing user' });
        }

        // If the user already exists, send a response
        if (existingUser) {
            console.log('User exists:', user.username);
            return res.json({ status: "userExists" });
        }

        // Otherwise, add the new user to the database
        try {
            await usersCollection.insertOne(user);
            console.log(user.username, "has been registered.");
            return res.json({ status: "success" });
        } catch (err) {
            console.error('Error adding user:', err);
            return res.status(500).json({ message: 'Error adding user' });
        }
    });

        // Define a POST route for authenticating users
        app.post('/getUser', async (req, res) => {
        
        // Extract the user information from the incoming request
        const loginUser = req.body;
        let user = null;

        try {
            // Search the MongoDB collection for a username that matches the login username
            user = await usersCollection.findOne({ username: { $regex: new RegExp(`^${loginUser.username}$`, 'i') } });
        } catch (err) {
            // Log and send an error message if there's an issue fetching the user
            console.error('Error fetching user:', err);
            return res.status(500).json({ message: 'Error fetching user' });
        }

        // Check if the user exists
        if (user) {
            console.log('User logged in:', loginUser.username); // Log that the user has logged in
            res.status(200).json({ user }); // Send the user data back to the client
        } else {
            console.log('Failed to login:', loginUser.username); // Log that the login failed
            res.json({ loginStatus: "invalidInfo" }); // Send an "invalid login information" status back to the client
        }
        });


});

// Start the server on port 3000 (or any other port of your choice)
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});