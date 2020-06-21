import io from 'socket.io-client';

const port = 'http://192.168.1.71:8000/'; //need to change it before deployment
const socket = io(port);
export default socket;
