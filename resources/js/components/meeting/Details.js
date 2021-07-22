import React, { Component, useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import { GrLinkPrevious } from "react-icons/gr";
import { GrPlan } from "react-icons/gr";
import { GrNotes } from "react-icons/gr";
import { GrMailOption } from "react-icons/gr";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillReplyAllFill } from "react-icons/bs";


const MeetingDetails =(props)=> {

    /* State to store created meeting */
    const [meeting, setMeeting ] = useState(props.location.state.meeting);

    /* get current meeting after redirect */
    useEffect(()=>{

        /* Collecting Created Meeting */
        setMeeting(props.location.state.meeting);

        /* Use this id (better use slug) to query the meeting */
        console.log(props.location.state.meeting); 
    });

    return (
        <>
            <Card>
                {
                    meeting ? 
                        (
                            <>
                                <Card body >
                                    <Button variant="outline-secondary" style={{marginBottom: '20px'}}><GrLinkPrevious/> Back</Button>    
                                    <Card.Body className="text-center">
                                        <Card.Title>
                                            {meeting.title} 
                                        </Card.Title>
                                        <Card.Text>
                                            Channel: {meeting.channel}
                                        </Card.Text>
                                        <Card.Text>
                                            {meeting.note} <GrNotes style={{marginLeft: '12px'}}/>
                                        </Card.Text>
                                        <Card.Text>
                                            {meeting.date} <GrPlan style={{marginLeft: '12px'}}/>
                                        </Card.Text>
                                        <Card.Text>
                                            Start: {meeting.start_time} - end: {meeting.end_time} <AiOutlineClockCircle style={{marginLeft: '12px'}}/>
                                        </Card.Text>
                                        <Card.Text>
                                            {meeting.creator_name}
                                        </Card.Text>
                                        <Card.Text>
                                            {meeting.creator_email}
                                        </Card.Text> 
                                        <Button variant="outline-secondary" style={{marginBottom: '20px', width: '100%'}}><BsFillReplyAllFill style={{marginRight: '12px'}}/>Share link</Button>    
                                        {/* Invite user form here */} 
                                        <InputGroup>
                                            <InputGroup.Text aria-label="Radio button for following text input" ><GrMailOption style={{marginRight: '12px'}}/>Share</InputGroup.Text>
                                            <FormControl placeholder="Press enter emails to send invitation" />
                                        </InputGroup>
                                    </Card.Body>
                                </Card>
                            </>
                        ):  (
                                <>
                                    <Card.Body>
                                        <Card.Title>
                                            Something wrong
                                        </Card.Title>
                                    </Card.Body>
                                </> 
                            )
                }
            </Card>
        </>
    )
};

export default MeetingDetails;