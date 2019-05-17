import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import axios from 'axios';
import io from 'socket.io-client';
import gon from 'gon';
// import cookies from 'js-cookie';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
const str = 'test';
axios.get('/', str)
  .then(data => console.log(data));
const socket = io();

socket.on('data', ( data ) => {
  console.log('here');
});
