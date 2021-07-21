import React, { Component, useEffect, useState } from 'react';
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";

const MeetingDetails =(props)=> {

    /* State to store created meeting */
    const [meeting, setMeeting ] = useState([]);

    /* get current meeting after redirect */
    useEffect(()=>{

        /* Collecting Created Meeting */
        setMeeting(props.location.state.meeting);

        /* Use this id (better use slug) to query the meeting */
        console.log(props.match.params.id); 
    });

    return (
        <>
            <Card>
                {
                    meeting ? 
                        (
                            <>
                                <Card.Body>
                                    <Card.Title>
                                        {meeting.title}
                                    </Card.Title>
                                    <Card.Text>
                                        Channel: {meeting.channel}
                                    </Card.Text>
                                    <Card.Text>
                                        {meeting.note}
                                    </Card.Text>
                                    <Card.Text>
                                        Start: {meeting.start_time} - end: {meeting.end_time}
                                    </Card.Text>
                                    <Card.Text>
                                        {meeting.creator_name}
                                    </Card.Text>
                                    <Card.Text>
                                        {meeting.creator_email}
                                    </Card.Text> 
                                    <Button variant="outline-success"><i className="fa fa-share"></i>Share link</Button>    
                                    {/* Invite user form here */}           
                                </Card.Body>
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