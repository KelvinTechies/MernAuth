import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../Component/FormContainer'
import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLoginMutation} from '../Slices/UserApiSlice'
import {setCredentials} from '../Slices/AuthSlice'
import { toast }from 'react-toastify'
import Loader from '../Component/Loader';

const LoginScreen = () => {
    const [email, SetEmail] = useState('')
    const [password, SetPassword] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()


    const[login, {isLoading }]=useLoginMutation()

    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(() => {
        if (userInfo){
            navigate('/')
        }
    }, [navigate, userInfo])


    const subitHandler = async (e) => {
        e.preventDefault()
        try {
          const res = await login({email, password}).unwrap()
          dispatch(setCredentials({...res}))
          navigate('/')
        } catch (err) {
            toast.error(err?.data?.message || err.error );
           
            
        }
    }
    return (

        <FormContainer>
            <h1>Sign In</h1>

            <Form onSubmit={subitHandler}>
            <Form.Group className='my-2' controlId='email'>
                    <Form.Label >Email Address</Form.Label>
                    <Form.Control type='email' placeholder='Enter Email'
                        value={email}
                        onChange={(e) => SetEmail(e.target.value)}></Form.Control>
                </Form.Group>

                <Form.Group className='my-2' controlId='password'>
                    <Form.Label >Password</Form.Label>
                    <Form.Control type='password' placeholder='Enter password'
                        value={password}
                        onChange={(e) => SetPassword(e.target.value)}></Form.Control>
                </Form.Group>
                {isLoading && <h2><Loader /></h2>}
                <Button type='submit' variant='primary' className='mt-3'>Sign In</Button>
                <Row className='py-3'>
                    <Col>
                        New Customer? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    )
}

export default LoginScreen
