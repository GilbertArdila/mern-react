import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './bootstrap.min.css'
import { UserProvider } from './context/context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <UserProvider>
    <App />
  </UserProvider>,
)
