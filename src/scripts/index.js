import bootstrap from 'bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/index.css';

if (process.env.NODE_ENV === 'development') {
  require('../index.html');
}

console.log('webpack starterkit');
