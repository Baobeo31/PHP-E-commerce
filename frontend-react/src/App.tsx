import { useRoutes } from 'react-router-dom'
import './App.css'
import { routes } from './routes'
import Footer from './components/Footer'; // Import Footer component
import Navbar from './components/Navbar';

function App() {
  const element = useRoutes(routes)

  return (
    <>
      <Navbar/>
      {element}
      <Footer /> {/* Add the Footer component here */}
    </>
  )
}

export default App;