import {Outlet} from 'react-router-dom'
import {Container} from 'react-bootstrap'
import MyHeader from './Component/MyHeader';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
const App = () => {
  return (

    <>
    <MyHeader />
    <ToastContainer />
    <Container className='my-2'>
         <Outlet />
    </Container>
 
    </>
  )
}

export default App
