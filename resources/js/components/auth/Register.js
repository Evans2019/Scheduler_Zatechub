import React, { Component, useEffect, useState } from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { SiGnuprivacyguard } from "react-icons/si";
import axios from "axios";

const Register =()=>{
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

                <Form.Group className="mb-3" >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        placeholder="Enter confirmation password" 
                        
                        id='confirmPassword'
                        name='confirmPassword' 
                    />
                </Form.Group>
                <Button variant="outline-secondary"><SiGnuprivacyguard style={{marginRight: '10px'}} />Register</Button>
            </Form>
        </>
    );
};

export default Register;