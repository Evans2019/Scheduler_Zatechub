import React, { Component, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Card from "react-bootstrap/Card";
import { FaPlus } from 'react-icons/fa';
import  { Redirect } from 'react-router-dom'
import { useFormik } from 'formik'
import { VscAccount } from "react-icons/vsc";
import { SiGnuprivacyguard } from "react-icons/si";
import { HiLogin } from "react-icons/hi";
import { FcCalendar } from "react-icons/fc";
import { GiCancel } from "react-icons/gi";
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import axios from "axios";

const CreateMeeting = ()=> {

    /* Modal states */
    const [isOpen, setIsOpen] = useState(false);

    /* Continue button loading state */
    const [isLoading, setLoading] = useState(false);

    /* Check if user want to create account */
    const [createAccount, setCreateAccount] = useState(false);

    /* Steps title */
    const [stepTitle, setStepTitle] = useState('');

    /* Redirect state */
    const [redirect, setRedirect] = useState(false);

    /* meeting datat */
    const [createdMeeting, setCreatedMeeting] = useState([]);


    /* Step1 for multiple form */
    const [step, setStep]= useState(1);

    /* Formik to collect data */
    const formik = useFormik({
        initialValues:{
            title:'',
            note:'',
            channel: '',
            date:'',
            startTime:'',
            endTime:'',
            timeZone:'',
            creatorName:'',
            creatorEmail:''
        }
    });

    /* UseEffect to monitor is isLoading state change to run continueLoadingTime()*/
    useEffect(() => {
        if (isLoading) {
            continueLoadingTime().then(() => {
            setLoading(false);
            setStep(step + 1);            
          });
        };
    }, [isLoading]);

    /* Data submission */
    const submit =()=>{
        const meetingData = {
            title: formik.values.title,
            note: formik.values.note,
            channel: formik.values.channel,
            date: formik.values.date,
            start_time: formik.values.startTime,
            end_time: formik.values.endTime,
            time_zone: 'Africa/Johannesburg', /* to replace */
            creator_name: formik.values.creatorName,
            creator_email: formik.values.creatorEmail,
        };

        axios.post('/meetings', meetingData)
            .then((response) => {
                setCreatedMeeting(response.data);
                setRedirect(true);
              })
            .catch(error => {
                //Error notification
                console.log("ERROR:: ",error.response.data);
            });
    }

    /* Open Modal */
    const showModal = () => {
        setIsOpen(true);
    };
  
    /* Close the Modal */
    const hideModal = () => {
        setIsOpen(false);
    };

    /* Loading Timer for continue button */
    const continueLoadingTime =()=> {
        return new Promise((resolve) => setTimeout(resolve, 100));
    };

    /* Moving to the next screen */
    const nextScreen = () => {
        setLoading(true);
    };

    /* Moving to the prev screen */
    const prevScreen =()=>{
        setStep(step - 1);
    };

    /* Check if check box is checked or not */
    const isChecked = ()=>{
        setCreateAccount(createAccount ? false : true );
    };

    /* Redirect */
    if (redirect) {
        return <Redirect 
                    to={{
                        pathname: `/meeting`,
                        state: { meeting: createdMeeting }
                    }} 
                />
    }
            
    const SwitchSteps = () =>{

        /* Switch between steps */
        switch(step) {
            case 1:
                setStepTitle('What is the occasion?');
                return (
                    <>
                        <Form className="m-5">
                            <Form.Group className="mb-3" >
                                <Form.Label>Title</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter Title" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.title }
                                    id='title'
                                    name='title' 
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Channel</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={formik.handleChange} 
                                    value={formik.values.channel}
                                    id='channel'
                                    name='channel'
                                >
                                    <option value="select">Select Option</option>
                                    <option value="Zoom">Zoom</option>
                                    <option value="Skype">Skype</option>
                                    <option value="Google Hangouts">Google Hangouts</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Note</Form.Label>
                                <Form.Control 
                                    as="textarea" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.note }
                                    id='note'
                                    name='note'
                                />
                            </Form.Group>
                        </Form>
                    </>
                );

            case 2:
                setStepTitle('What are the options?');
                return (
                    <>
                        <Form className="m-5">
                            <Form.Group className="mb-3" >
                                <Form.Label>Date</Form.Label>
                                <Form.Control 
                                    onChange={formik.handleChange} 
                                    value={formik.values.date }
                                    id='date'
                                    type="date" 
                                    name='date'
                                />
                                
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Start Time</Form.Label>
                                <Form.Control 
                                    onChange={formik.handleChange} 
                                    value={formik.values.startTime }
                                    id='startTime'
                                    type="time" 
                                    name='startTime'
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>End Time</Form.Label>
                                <Form.Control 
                                    type="time"
                                    onChange={formik.handleChange} 
                                    value={formik.values.endTime }
                                    id='endTime'
                                    name='endTime'
                                />
                            </Form.Group>
                        </Form>
                    </>
                );

            case 3:
                setStepTitle('Tell your participants who you are');
                return (
                    <>
                        <Form className="m-5">
                            <Form.Group className="mb-3" >
                                <Form.Label>Name</Form.Label>
                                <Form.Control 
                                    type="text" 
                                    placeholder="Enter your Name" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.creatorName }
                                    id='creatorName'
                                    name='creatorName'
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" >
                                <Form.Label>Email</Form.Label>
                                <Form.Control 
                                    type="email" 
                                    placeholder="Enter ypur Email" 
                                    onChange={formik.handleChange} 
                                    value={formik.values.creatorEmail }
                                    id='creatorEmail'
                                    name='creatorEmail'
                                    autoComplete="off"
                                />
                            </Form.Group>

                            <Form.Group className={ createAccount ?  "mb-3" : "mb-3 d-none" } controlId="formpassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control autoComplete="off" type="password" placeholder="Enter your password" />
                            </Form.Group>

                            <Form.Group className={ createAccount ?  "mb-3" : "mb-3 d-none" } controlId="formConfrimPassword">
                                <Form.Label>Confrim Password</Form.Label>
                                <Form.Control type="password" placeholder="Confrim Password" />
                            </Form.Group>

                            <Form.Check
                                inline
                                label="Do you want to create account ?"
                                name="CreateAccount"
                                checked={createAccount}
                                onChange ={isChecked}
                            />
                        </Form>
                    </>
                );
        };
    };

    return (
        <div>
            <Navbar>
                <Container>
                    <Navbar.Brand>Meeting Creator <FcCalendar style={{marginRight: '4%'}}/></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <button type="button" className="btn btn-danger" onClick={showModal} ><FaPlus style={{margin: '5px'}}/>Create Meeting</button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Card body className="text-center">
                <Card.Body>
                    <Card.Title>Create Account <VscAccount/></Card.Title>
                    <Card.Text>
                        Create account to have access to all the features!
                    </Card.Text>
                    <Button variant="outline-secondary" style={{margin: '3%'}}><HiLogin style={{marginRight: '10px'}}/>Login</Button>
                    <button className="btn btn-secondary"><SiGnuprivacyguard style={{marginRight: '10px'}}/>Register</button>
                </Card.Body>
            </Card>
            <Modal 
                show={isOpen} 
                onHide={hideModal}
                backdrop="static"
                keyboard={false}
                centered
                size="lg"
                dialogClassName={"primaryModal"}
            >
                <Modal.Header>
                    <div className="mx-auto">
                        STEP {step} OF 3 - {stepTitle}
                    </div> 
                </Modal.Header>
                <Modal.Body>
                    <SwitchSteps/>
                </Modal.Body>
                <Modal.Footer>
                    {
                        step <= 1 ? (
                            <>
                                <Button variant="outline-secondary"  onClick={hideModal} ><GiCancel style={{marginRight: '6px'}}/> Cancel</Button>
                            </>
                        ):(
                            <>
                                <Button variant="outline-secondary"  onClick={prevScreen} ><IoIosArrowDropleft style={{marginRight: '6px'}}/> Back</Button>
                            </>
                        )
                    }
                    {
                        step == 3 ? (<>
                                <Button variant="success" onClick={submit}>
                                    Confrim and Share Link
                                </Button>
                            </>):(<>
                                <Button 
                                    disabled={isLoading}
                                    onClick={!isLoading ? nextScreen : null}
                                    variant="success">
                                    {isLoading ? 'Loading…' : (<>Continue <IoIosArrowDropright style={{ marginLeft: '8px'}}/></>)}
                                </Button>
                            </>)
                    }
                </Modal.Footer>
            </Modal>
        </div>
    );
}
    
export default CreateMeeting;