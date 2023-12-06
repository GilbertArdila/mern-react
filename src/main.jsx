import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { UserProvider } from './context/context.jsx';

import './bootstrap.min.css';
import 'react-responsive-modal/styles.css';


ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>,
)
