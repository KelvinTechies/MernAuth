import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import {LinkContainer} from 'react-router-bootstrap'
import { useSelector, useDispatch } from "react-redux";
import {useLogoutMutation} from '../Slices/UserApiSlice'
import {logout} from '../Slices/AuthSlice'
import { useNavigate } from "react-router-dom";


const MyHeader = () => {

    const {userInfo} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [logoutApiCall] = useLogoutMutation();

   const LogoutHandler = async () => {
       try {
           await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/')
       } catch (err) {
           console.log(err);
           
       }
   }
    return ( 
        
        <header>
            <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
                <Container>
                    <Navbar.Brand href='/'>Mern Stack App</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                        {userInfo ? (
                <>
                <NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                <NavDropdown.Item>
                    profile
                    </NavDropdown.Item>
                </LinkContainer>
                <NavDropdown.Item onClick={LogoutHandler}> Log Out</NavDropdown.Item>
                
                </NavDropdown>
                </>
            ) : (
                <>
                <LinkContainer to='/login'>
                
        <Nav.Link>
                                <FaSignInAlt />Sign In
                          </Nav.Link>
                </LinkContainer>
                <LinkContainer to='/register'>
                
                <Nav.Link >
                                <FaSignOutAlt />SignUp
                             </Nav.Link>
                        </LinkContainer>
                            </>
            )}
                        </Nav>
                           
                    </Navbar.Collapse>
                </Container>
            </Navbar>
          
           
        </header>
     );
}
 
export default MyHeader;