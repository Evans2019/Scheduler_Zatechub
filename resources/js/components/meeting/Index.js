import React, { Component, useEffect, useState } from 'react';
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useFormik } from 'formik'

const CreateMeeting = ()=> {

    /* Modal states */
    const [isOpen, setIsOpen] = useState(false);

    /* Continue button loading state */
    const [isLoading, setLoading] = useState(false);

    /* Check if user want to create account */
    const [createAccount, setCreateAccount] = useState(false);

    /* Steps title */
    const [stepTitle, setStepTitle] = useState('');

    /* Step1 for multiple form */
    const [step, setStep]= useState(1);

    /* Formik to collect data */
    const formik = useFormik({
        initialValues:{
            title:'',
            note:'',
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
                                    onChange={e => {
                                        console.log("e.target.value", e.target.value);
                                    }}
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
            <button type="button" className="btn btn-danger" onClick={showModal} ><i className="fa fa-plus"></i> Create Meeting</button>
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
                                <Button variant="outline-secondary"  onClick={hideModal} ><i className="fa fa-angle-left"></i> Cancel</Button>
                            </>
                        ):(
                            <>
                                <Button variant="outline-secondary"  onClick={prevScreen} ><i className="fa fa-angle-left"></i> Back</Button>
                            </>
                        )
                    }
                    {
                        step == 3 ? (<>
                                <Button variant="success">
                                    Confrim
                                </Button>
                            </>):(<>
                                <Button 
                                    disabled={isLoading}
                                    onClick={!isLoading ? nextScreen : null}
                                    variant="success">
                                    {isLoading ? 'Loading…' : 'Continue'}
                                </Button>
                            </>)
                    }
                </Modal.Footer>
            </Modal>
        </div>
    );
}
    
export default CreateMeeting;