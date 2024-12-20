const net = require('net');

// In-memory storage
const store = {};

const server = net.createServer((connection) => {
    console.log('Client connected');
    connection.write('127.0.0.1:8000> '); // Initial prompt

    connection.on('data', (data) => {
        const input = data.toString().trim();
        const [command, key, value] = input.split(' ');

        let response = '';
        switch (command.toUpperCase()) {
            case 'SET':
                if (key && value) {
                    store[key] = value;
                    response = `OK\n`;
                } else {
                    response = `Error: Usage: SET <key> <value>\n`;
                }
                break;
            case 'GET':
                if (key) {
                    response = store[key] !== undefined ? `${store[key]}\n` : `Error: Key not found\n`;
                } else {
                    response = `Error: Usage: GET <key>\n`;
                }
                break;
            case 'DEL':
                if (key) {
                    if (store[key] !== undefined) {
                        delete store[key];
                        response = `OK\n`;
                    } else {
                        response = `Error: Key not found\n`;
                    }
                } else {
                    response = `Error: Usage: DEL <key>\n`;
                }
                break;
            case 'KEYS':
                response = Object.keys(store).join('\n') + '\n';
                break;
            case 'EXIT':
                response = `Bye!\n`;
                connection.write(response);
                return connection.end();
            default:
                response = `Error: Unknown command\n`;
        }

        // Send the response with a single prompt
        connection.write(response + '127.0.0.1:8000> ');
    });

    connection.on('end', () => {
        console.log('Client disconnected');
    });
});

server.listen(8000, () => {
    console.log('Server started on port 8000');
});
