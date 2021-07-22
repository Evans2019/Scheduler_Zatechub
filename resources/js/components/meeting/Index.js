import React, { Component, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Alert from "react-bootstrap/Alert";
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
import Login from '../auth/Login';
import Register from '../auth/Register';

const CreateMeeting = ()=> {

    /* Modal states */
    const [isOpen, setIsOpen] = useState(false);

    /* Modal Login states */
    const [isOpenLogin, setIsOpenLogin] = useState(false);

    /* Show Alert */
    const [show, setShow] = useState(false);

    /* Error message */
    const [error, setError] = useState();

    /* Modal Register states */
    const [isOpenRegister, setIsOpenRegister] = useState(false);

    /* Continue button loading state */
    const [isLoading, setLoading] = useState(false);

    /* Check if user want to create account */
    const [createAccount, setCreateAccount] = useState(false);

    /* Continue Button disable */
    const [disable, setDisable] = useState(true)

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
            /* Disable button */
            if(step == 1 ){
                if(formik.values.title == ''){
                    setShow(true);
                    setError('Please make sure Title is filled');
                } else {
                    setShow(false);
                    setStep(step + 1); 
                };   
            } else if ( step == 2){
                if(formik.values.endTime == '' || formik.values.date == '' || formik.values.startTime == ''){
                    setShow(true)
                    setError('Please make sure all fields are filled')
                } else {
                    setShow(false);
                    setStep(step + 1); 
                }; 
            }
                 
          });
        };
    }, [isLoading]);

    /* Data submission */
    const submit =()=>{

        if ( step == 3){
            if(formik.values.creatorEmail == '' || formik.values.creatorName == ''){
                setShow(true)
                setError('Please make sure all fields are filled')
            } else {
                setShow(false);
            };
        };

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

    /* Open Modal Login*/
    const showModalLogin = () => {
        setIsOpenLogin(true);
    };
  
    /* Close the Modal Login */
    const hideModalLogin = () => {
        setIsOpenLogin(false);
    };


    /* Open Modal Rgister*/
    const showModalRegister = () => {
        setIsOpenRegister(true);
    };
  
    /* Close the Modal Register */
    const hideModalRegister = () => {
        setIsOpenRegister(false);
    };

    /* Loading Timer for continue button */
    const continueLoadingTime =()=> {
        setShow(false);
        return new Promise((resolve) => setTimeout(resolve, 100));
    };

    /* Moving to the next screen */
    const nextScreen = () => {
        setLoading(true);
    };

    /* Moving to the prev screen */
    const prevScreen =()=>{
        setShow(false);
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
                setStepTitle('Tell us about your meeting?');
                return (
                    <>
                        <Form className="m-5">
                            <Alert show={show} variant="danger">
                                <GiCancel style={{marginRight: '6px'}} onClick={() => setShow(false)}/> {error}
                            </Alert>
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
                                <Form.Label>Channel  (optional) </Form.Label>
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
                                <Form.Label>Note  (optional)</Form.Label>
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
                            <Alert show={show} variant="danger">
                                <GiCancel style={{marginRight: '6px'}} onClick={() => setShow(false)}/> {error}
                            </Alert>
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
                            <Alert show={show} variant="danger">
                                <GiCancel style={{marginRight: '6px'}} onClick={() => setShow(false)}/> {error}
                            </Alert>
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
            {/* Login Modal */}
            <Modal 
                show={isOpenLogin} 
                onHide={hideModalLogin}
                centered
                size="lg"
                dialogClassName={"primaryModal"}
            >
                
                <Modal.Body>
                    <Modal.Header><Card.Title>Login<VscAccount style={{marginLeft: '10px'}}/></Card.Title></Modal.Header>
                    <Login/>
                </Modal.Body>
            </Modal>

            {/* Register */}
            <Modal 
                show={isOpenRegister} 
                onHide={hideModalRegister}
                centered
                size="lg"
                dialogClassName={"primaryModal"}
            >
                
                <Modal.Body>
                    <Modal.Header><Card.Title>Register<VscAccount style={{marginLeft: '10px'}}/></Card.Title></Modal.Header>
                    <Register/>
                </Modal.Body>
            </Modal>

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
                    <Button variant="outline-secondary" style={{margin: '3%'}} onClick={showModalLogin}><HiLogin style={{marginRight: '10px'}}/>Login</Button>
                    <Button variant="outline-secondary" onClick={showModalRegister}><SiGnuprivacyguard style={{marginRight: '10px'}} />Register</Button>
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
                    <Card.Text className="text-center">
                        <small>STEP {step} OF 3</small>                    
                    </Card.Text>
                    <Card.Header>
                        {stepTitle}
                    </Card.Header> 
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