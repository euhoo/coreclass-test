import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import axios from 'axios';

import io from 'socket.io-client';
import gon from 'gon';
import app from './components';
// import cookies from 'js-cookie';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
/*
const str = 'test';
axios.get('/api/v1/data/', str)
  .then((data) => {
    // store.byId = {...data.byId};
  // store.allIds = [...data.allIds]
  // console.log(store);
  });
const socket = io();
const store = gon;
console.log(store);

socket.on('data', (data) => {
  // store.byId = {...data.byId};
  // store.allIds = [...data.allIds]
  // console.log(store);
});
*/
const getData = async () => {
 const a = await axios.get('/api/v1/data/', 'qsd');
 console.log(a);
};
getData();

const store = gon;
app(store);
