import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import FormContainer from '../Component/FormContainer'
import { toast }from 'react-toastify'
import Loader from '../Component/Loader';
import {setCredentials} from '../Slices/AuthSlice'
import {useDispatch, useSelector} from 'react-redux'
import {useUpdateUserMutation} from '../Slices/UserApiSlice'






function ProfileScreen() {
    const [name, setname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')


    const navigate = useNavigate()
    const dispatch = useDispatch()


    const [updateProfile, {isLoading}] = useUpdateUserMutation()
    const {userInfo} = useSelector((state)=>state.auth)

    useEffect(() => {
       setname(userInfo.name)
       setEmail(userInfo.email)
       setname(userInfo.name)
    }, [userInfo.setname, userInfo.setEmail])

    const subitHandler = async (e) => {
        e.preventDefault()
        if (password !==cpassword){
            toast.error('Passwords Mixmatch')
        }else{
            
            try {
                const res = await updateProfile({
                    id:userInfo._id,
                    name,
                    email,
                     password
                }).unwrap()
                dispatch(setCredentials({...res}))
                toast.success('Profile Updated')
                navigate('/')
            } catch (err) {
            toast.error(err?.data?.message || err.error );
                
            }
        }
    }
    return (

        <FormContainer>
            <h1>Update Your Account</h1>

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
                    
                </Form>
        </FormContainer>
            )
        }

export default ProfileScreen
