import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/application.css';
import gon from 'gon';
import app from './components';
// import cookies from 'js-cookie';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}
/* при загрузке server добавляет store в window.gon */

const store = gon;
app(store);
