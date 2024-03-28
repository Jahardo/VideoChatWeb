import io from 'socket.io-client';

const options:object = {
    'force new connection': true,
    reconnectionAttempts: 'Infinity',
    timeout: 10000,
    transports: ['websocket'],
};

export const socket = io('http://localhost:3003', options);
// vdfnvidnvdi
