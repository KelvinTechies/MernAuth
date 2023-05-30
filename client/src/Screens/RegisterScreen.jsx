import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../Component/FormContainer'
import React from 'react'
import { toast }from 'react-toastify'
import Loader from '../Component/Loader';
import {useRegisterMutation} from '../Slices/UserApiSlice'
import {setCredentials} from '../Slices/AuthSlice'
import {useDispatch, useSelector} from 'react-redux'





const RegisterScreen = () => {
    const [name, setname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()


    const[register, {isLoading }]=useRegisterMutation()

    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(() => {
        if (userInfo){
            navigate('/')
        }
    }, [navigate, userInfo])

    const subitHandler = async (e) => {
        e.preventDefault()
        if (password !==cpassword){
            toast.error('Passwords Mixmatch')
        }else{
            try {
                const res = await register({name, email, password}).unwrap()
                dispatch(setCredentials({...res}))
                navigate('/')
            } catch (err) {
            toast.error(err?.data?.message || err.error );
                
            }
        }
    }
    return (

        <FormContainer>
            <h1>Sign up</h1>

            <Form onSubmit={subitHandler}>
                <Form.Group className='my-2' controlId='name'>
                    <Form.Label >Full Name</Form.Label>
                    <Form.Control type='text' placeholder='Enter FullName'
                        value={name}
                        onChange={(e) => setname(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='email'>
                    <Form.Label >Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId='password'>
                    <Form.Label> password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                    <Form.Group className='my-2' controlId='cpassword'>
                        <Form.Label > Confirm password</Form.Label>
                        <Form.Control type='password' placeholder='Enter Confirm password'
                            value={cpassword}
                            onChange={(e) => setCpassword(e.target.value)}></Form.Control>
                    </Form.Group>
                    {isLoading && <h2><Loader /></h2>}

                    <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>
                    <Row className='py-3'>
                        <Col>
                            New Customer? <Link to='/login'>Sign in</Link>
                        </Col>
                    </Row>
                </Form>
        </FormContainer>
            )
        }
        
        export default RegisterScreen
