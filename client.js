const net = require('net');

// Connect to the server
const client = net.createConnection({ host: '127.0.0.1', port: 8000 }, () => {
    console.log('Connected to server');
});

// Handle data received from the server
client.on('data', (data) => {
    process.stdout.write(data.toString()); // Display server response (includes prompt)
});

// Handle connection end
client.on('end', () => {
    console.log('Disconnected from server');
    process.exit();
});

// Handle connection errors
client.on('error', (err) => {
    console.error(`Connection error: ${err.message}`);
    process.exit();
});

// Read user input from the terminal and send it to the server
process.stdin.on('data', (input) => {
    client.write(input.toString().trim()); // Send user input to the server
});
