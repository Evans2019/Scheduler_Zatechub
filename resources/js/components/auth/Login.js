import React, { Component, useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { HiLogin } from "react-icons/hi";
import axios from "axios";

const Login =()=>{
    return (
        <>
            <Form className="m-5">
                <Form.Group className="mb-3" >
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        
                        id='email'
                        name='email' 
                    />
                </Form.Group>

                <Form.Group className="mb-3" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter password" 
                        
                        id='password'
                        name='password' 
                    />
                </Form.Group>
                <Button variant="outline-secondary"><HiLogin style={{marginRight: '10px'}}/>Login</Button>
            </Form>
        </>
    );
};

export default Login;