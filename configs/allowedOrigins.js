const SERVER_PORT = process.env.PORT;
const REACT_PORT = 5173;

const allowedOrigins = [
    `http://localhost:${SERVER_PORT}`,
    `http://localhost:${REACT_PORT}`,
    'http://127.0.0.1.5500',
];

module.exports = allowedOrigins;