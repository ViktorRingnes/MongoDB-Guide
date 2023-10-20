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
});
