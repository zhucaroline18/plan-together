import React, {ChangeEvent, MouseEvent} from "react";
//import {useState} from "react"
//import {ReactGrid, Column, Row, CellChange, TextCell} from "@silevis/reactgrid"
//import 'C:\planTogether\client2\src\custom.scss'
//import {style} from "@silevis/reactgrid/styles.css";

import "@silevis/reactgrid/styles.css";
import { MDBInput } from 'mdb-react-ui-kit';
import 'bootstrap/dist/css/bootstrap.min.css';
//import 'mdb-react-ui-kit/dist/css/mdb.min.css';

//import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Stack from 'react-bootstrap/Stack';
import BootRow from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';

import Accordion from 'react-bootstrap/Accordion';
import { Col, Tab, Table, Tabs } from "react-bootstrap";
import { SignUp } from "./SignUp";

type Trip = {
    tripID: number
    name: string
    archived: number
    destination: string
    date: string
    additionalDetails: string
    groupPack: string
}
type SimpleTrip = {
    tripID: number
    name: string
}

export interface AppProps {
    //num: number
}

type Page = "login" | "home" | "tripDetails" | "signUp" | "individual-pack" | "archive" | "individual cost" | "test"

type Member = "creator" | "invited" | "joined" | null

export interface AppState {
    page: Page
    user: string
    email: string
    password: string
    confirmPassword: string
    showEdits: boolean
    userID: number
    tripName: string
    tripID: number
    memberStatus: Member
    memberID: number
    destination: string
    additionalDetails: string
    date:string
    trip: Trip
    tripList: SimpleTrip[]
}
/*
interface Person {
    name: string;
    surname: string;
}*/

//const [show, setShow] = useState(false);

export class App extends React.Component<AppProps, AppState> {
    constructor(props: any){
        super(props)
        const trip: Trip = {
            tripID: -1 ,
            archived: 0,
            name: "",
            destination:"", 
            date:"",
            additionalDetails:"",
            groupPack: ""
        }
        let triplist: SimpleTrip[] = []

        this.state =  {
            page: "login",
            user: "",
            email: "", 
            password: "", 
            confirmPassword: "",
            showEdits: false, 
            userID: -1,
            tripName: "",
            tripID: -1, 
            memberStatus: null, 
            memberID: -1, 
            destination: "",
            additionalDetails: "", 
            date: "", 
            trip: trip, 
            tripList: triplist
        }
    }

    render():React.ReactNode {
        let nodes : JSX.Element[]= [];
        
        if (this.state.page === "login" || this.state.page === "signUp")
        {
            nodes.push(
                <div key = "nav bar special">
                    <style type="text/css">
                    {`
                        .color-nav {
                        background-color: rgb(0, 108, 132);
                        }
                        .color-lightBlue {
                            background-color: rgb(110, 181, 192);
                        }
                        .color-darkBlue {
                            background-color: rgb(0, 108, 132);
                        }
                        .color-pink {
                            background-color: #FFCCBB;
                        }
                        .remove-line {
                            text-decoration: none;
                            color: rgb(110, 181, 192);
                            }
                        .nav-tabs .nav-item .nav-link {
                                color: rgb(110, 181, 192);
                            }
                        .nav-tabs .nav-item .nav-link.active {
                                color:rgb(0, 108, 132);
                            }
                        .accordion-button:not(.collapsed) {
                            background-color: #FFCCBB;
                        }
                    `}
                    </style>
                    <Navbar className = "color-nav" id = "navBar"  data-bs-theme="dark">
                    <Container id = "navBarContainer">
                    <Navbar.Brand  id = "brand-navBar" href="#home">
                    <img
                        alt=""
                        src="client\build\logo192.png"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        Plan Together
                    </Navbar.Brand>
                    <Navbar.Toggle />
                        <Navbar.Collapse id = "navBarCollapse" className="justify-content-end">
                        <Nav id = "navbar home link" className="me-auto">
                            <Nav.Link href="#" onClick = {this.goToLogin}>Log in</Nav.Link>
                            <Nav.Link onClick = {this.goToSignUp} href="#">Sign Up</Nav.Link>

                        </Nav>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>
                </div>
            );
        }
        else 
        {
            nodes.push(
                <div key = "nav bar regular">
                    <style type="text/css">
                    {`
                        .color-nav {
                        background-color: rgb(0, 108, 132);
                        }
                        .color-lightBlue {
                            background-color: rgb(110, 181, 192);
                            }
                        .color-pink {
                            background-color: #FFCCBB;
                        }
                        .remove-line {
                            text-decoration: none;
                            color: rgb(110, 181, 192);
                            }
                        .nav-tabs .nav-item .nav-link {
                                color: rgb(110, 181, 192);
                            }
                        .nav-tabs .nav-item .nav-link.active {
                                color:rgb(0, 108, 132);
                            }
                        .accordion-button:not(.collapsed) {
                            background-color: #FFCCBB;
                        }
                    `}
                    </style>
                    <Navbar className = "color-nav" id = "navBar"  data-bs-theme="dark">
                    <Container id = "navBarContainer">
                    <Navbar.Brand id = "brand-navBar" href="#home" onClick={this.handleToHome}>
                    <img
                        alt=""
                        src="C:\planTogether\client2\img\dinoLogo.webp"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        Plan Together
                    </Navbar.Brand>
                    <Navbar.Toggle />
                        <Navbar.Collapse id = "navBarCollapse" className="justify-content-end">
                        <Nav id = "navbar home link" className="me-auto">
                            <Nav.Link onClick={this.handleToHome} href="#">Home</Nav.Link>
                            <Nav.Link onClick={this.handleToArchive} href="#">Archive</Nav.Link>

                        </Nav>
                        <Navbar.Text id = "signed in as">
                            Signed in as: 
                            <NavDropdown title={this.state.user} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick = {this.handleLogOut}id = "logout button" href="#">Logout</NavDropdown.Item>
                                <NavDropdown.Item id = "edit profile button" href="#">Edit Profile</NavDropdown.Item>
                            </NavDropdown>
                        </Navbar.Text>
                        </Navbar.Collapse>
                    </Container>
                    </Navbar>
                </div>
            );
        }
        if (this.state.page === "archive")
        {
            nodes.push(
                <>
                    <Container fluid className = "p-3">
                        <Stack gap = {3} >
                        <div id = "planned trips title" className = "mx-auto">
                            <h2 className = "mx-auto">
                                Archived Trips
                            </h2>
                        </div>
                        <div className="mx-auto">
                            <h5> <a onClick={this.handleToHorseshoe} className = "remove-line" id = "camping" href = "#">Silver Springs</a></h5>
                        </div>

                        <div className="mx-auto">
                            <h5> <a className = "remove-line" id = "LA" href = "#">Second Beach</a></h5>
                        </div>
                        <div className="mx-auto">
                            <h5> <a className = "remove-line" id = "Mexico" href = "#">rattlesnake lake</a></h5>
                        </div>
                        <BootRow>
                                <Col xs = {7}><b>Silver Springs-</b> invited by Caroline Zhu</Col>

                                <Col xs = {3}>
                                    <div key="reverse-inline-radio" className="me-auto">
                                    <Form.Check
                                        inline
                                        label="Join"
                                        name="group1"
                                        type="radio"
                                        id="inline-radio-1"
                                    />
                                    <Form.Check
                                        inline
                                        label="Reject"
                                        name="group1"
                                        type="radio"
                                        id="inline-radio-2"
                                    />
                                    
                                    </div>
                                </Col>
                                <Col>
                                    <Button size = "sm" className = "color-lightBlue p-1" type="submit">
                                        Confirm
                                    </Button>
                                </Col>
                            </BootRow>
                        
                        </Stack>
                    </Container>
                    
                </>
            );
        }
        if (this.state.page==="home" )
        {
            let links: JSX.Element[] = [];
            console.log(this.state.tripList);
            for (let i = 0; i<this.state.tripList.length; i++)
            {
                
                links.push(
                <Container>
                <div key = {i} className = "mx-auto">
                    <a href = "#" onClick = {(evt) => this.handleToTrip(evt, this.state.tripList[i].tripID)} >{this.state.tripList[i].name}</a>
                </div>
                </Container>
                )
            }
            nodes.push(
                <>
                    <Container fluid className = "p-3">
                        <Stack gap = {3} >
                        <div id = "planned trips title" className = "mx-auto">
                            <h2 className = "mx-auto">
                                Planned Trips
                            </h2>
                        </div>
                        {links}
                        </Stack>
                    </Container>
                    
                </>
            );

            nodes.push(
            <Accordion className = "mx-auto p-3 w-50">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Create a Trip</Accordion.Header>
                    <Accordion.Body>
                        <Form className = "mx-auto">
                            
                        <FloatingLabel
                            controlId="floatingInput"
                            label="Trip Name"
                            className="mb-3"
                        >
                            <Form.Control type="text" placeholder="Amazing Trip" onChange = {this.setNewTripName} />
                        </FloatingLabel>
                            <Button onClick = {this.handleCreateTrip} size = "sm" className = "color-lightBlue p-1" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Join a Trip</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            <BootRow>
                                <Col xs = {7}><b>Silver Springs-</b> invited by Caroline Zhu</Col>

                                <Col xs = {3}>
                                    <div key="reverse-inline-radio" className="me-auto">
                                    <Form.Check
                                        inline
                                        label="Join"
                                        name="group1"
                                        type="radio"
                                        id="inline-radio-1"
                                    />
                                    <Form.Check
                                        inline
                                        label="Reject"
                                        name="group1"
                                        type="radio"
                                        id="inline-radio-2"
                                    />
                                    
                                    </div>
                                </Col>
                                <Col>
                                    <Button size = "sm" className = "color-lightBlue p-1" type="submit">
                                        Confirm
                                    </Button>
                                </Col>
                            </BootRow>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                </Accordion>
            );

        }


        else if (this.state.page === "login")
        {
            nodes.push(
                <Container>
                    <h2 className = "p-3 text-center"> Log In </h2>
                    <Form>
                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Email
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control onChange ={this.setNewEmail} type="email" placeholder="Email" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Password
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control onChange = {this.setNewPassword} type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalCheck">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check label="Remember me" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={BootRow} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button onClick = {this.handleSignIn} className = "color-lightBlue" type="button">Log In</Button>
                            </Col>
                        </Form.Group>
                        </Form>
                </Container>
            )
        }
        else if (this.state.page === "signUp")
        {
            nodes.push(
            <Container>
                    <h2 className = "p-3 text-center"> Sign Up </h2>
                    <Form>
                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            Email Address
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control onChange = {this.setNewEmail} type="email" placeholder="Email" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            First Name
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control onChange = {this.setNewName} type="text" placeholder="Enter first name" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                            Password
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control onChange = {this.setNewPassword} type="password" placeholder="Enter password" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalConfirmPassword">
                            <Form.Label column sm={2}>
                            Confirm Password
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control onChange = {this.setNewConfirmPassword} type="password" placeholder="Confirm password" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={BootRow} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button onClick = {this.handleSignUp} className = "color-lightBlue">Sign Up</Button>
                            </Col>
                        </Form.Group>
                        </Form>
                </Container>
            )
        }

        else if (this.state.page==="tripDetails"){
            nodes.push(
                <Container>
                    <Tabs 
                        defaultActiveKey="details"
                        id="uncontrolled-tab-example"
                        className="mb-3 p-3"
                        >
                        <Tab eventKey="details" title="Details">

                        <div id = "trip title" className = "text-center">
                            <h2 className = "text-center">
                                {this.state.tripName}
                            </h2>

                        </div>

                        <Container className = "w-100">
                            <h5><b>Where: </b> {this.state.trip.destination} </h5>
                            <h5><b>When: </b> {this.state.trip.date} </h5>
                            
                        </Container>
                        <div className = "text-left">

                        <Button variant="primary" className = "color-lightBlue p-1 float-right" onClick={this.handleShowEdit}>
                            Edit Details
                        </Button>

                        <Modal aria-labelledby="contained-modal-title-vcenter" centered show={this.state.showEdits} onHide={this.handleCloseEdits}>
                            <Modal.Header closeButton>
                            <Modal.Title id = "contained-modal-title-vcenter">Edit Trip</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Destination</Form.Label>
                                    <Form.Control
                                        type="text" onChange = {this.handleChangeDestination} value = {this.state.destination}
                                    />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Date of trip</Form.Label>
                                    <Form.Control
                                        type="text" onChange = {this.handleSetDate} value = {this.state.date}
                                    />
                                    </Form.Group>
                                    <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                    >
                                    <Form.Label>Additional Details</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange = {this.handleSetAdditionalDetails} value = {this.state.additionalDetails}/>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>

                            <Button className = "color-pink float-left" variant="warning" onClick={this.handleCloseEdits}>
                                Archive Trip
                            </Button>

                            <Button className=" color-lightBlue" onClick={this.handleCloseEdits}>
                                Close
                            </Button>
                            <Button className=" color-lightBlue" onClick={this.handleSaveDetails}>
                                Save Changes
                            </Button>
                            </Modal.Footer>
                        </Modal>
            
                        </div>

                        <hr/>

                        <h5>Group Members:</h5>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>1</td>
                                <td>Caroline Zhu</td>
                                <td>Creator</td>
                                </tr>

                                <tr>
                                <td>2</td>
                                <td>Cathleen 2</td>
                                <td>Group Member</td>
                                </tr>

                                <tr>
                                <td>3</td>
                                <td>Cathleen Zhu</td>
                                <td>Invited</td>
                                </tr>
                            </tbody>
                        </Table>
                        <Accordion className = "mx-auto p-3 w-75">
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Add a Member</Accordion.Header>
                            <Accordion.Body>
                                <Form className = "mx-auto">
                                    
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email of invited member"
                                    className="mb-3"
                                >
                                    <Form.Control type="email" placeholder="Amazing Trip" />
                                </FloatingLabel>
                                    <Button size = "sm" className = "color-lightBlue p-1" type="submit">
                                        Send Invite
                                    </Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Remove a Member</Accordion.Header>
                            <Accordion.Body>
                                <Form className = "mx-auto">
                                    
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email of member you wish to remove"
                                    className="mb-3"
                                >
                                    <Form.Control type="email" placeholder="Amazing Trip" />
                                </FloatingLabel>
                                    <Button size = "sm" className = "color-lightBlue p-1" type="submit">
                                        Remove Member
                                    </Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                        </Accordion>
                        <hr/>

                        <Container>
                            <p><b>Additional Details: </b>{this.state.trip.additionalDetails}</p>
                        </Container>

                        </Tab>


                        <Tab eventKey="GroupTracker" title="GroupTracker">
                        <Form>
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="custom dividing"
                            />
                            </Form>

                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                    <th>Item</th>
                                    <th>Person to Pay</th>
                                    <th>Total Cost</th>
                                    <th>Cost per Person</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                    <td>Campground Fee</td>
                                    <td>Caroline</td>
                                    <td>198</td>
                                    <td>20</td>

                                    </tr>

                                    <tr>
                                    <td>Groceries</td>
                                    <td>Cathleen</td>
                                    <td>20</td>
                                    <td>4</td>
                                    </tr>

                                    <tr>
                                    <td>Gas</td>
                                    <td>Caroline</td>
                                    <td>30</td>
                                    <td>6</td>
                                    </tr>
                                </tbody>
                            </Table>
                            <Accordion className = "mx-auto p-3 w-100">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Add an Expense</Accordion.Header>
                                    <Accordion.Body>
                                        <Form className = "p-3">
                                        <BootRow>
                                            <Col xs = {4}>
                                            <Form.Control placeholder="Expense" />
                                            </Col >
                                            <Col xs = {4}>
                                            <Form.Control placeholder="Who to Pay" />
                                            </Col>
                                            <Col xs = {2}>
                                            <MDBInput placeholder='Total Cost ($)' id='typeNumber' type='number' min = '0' step = '0.01' />
                                            </Col>
                                            <Col>

                                            <Button size = "sm" className = "color-lightBlue p-1" type="submit">
                                                Add Expense
                                            </Button>
                                            </Col>
                                        </BootRow>
                                    </Form>

                                    
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        </Tab>

                        <Tab eventKey="GroupPacker" title="GroupPacker">
                            <SignUp user = {"Caroline"}/>
                        </Tab>
                    </Tabs>
                </Container>
            )
        }

        return (
            <div>
                {nodes}
            </div>
        )
    }

    handleShowEdit = ()=>{
        this.setState({showEdits: true})
      }
    handleCloseEdits = () => {
        this.setState({showEdits: false})
    }


    //////////////////////////////////////////////////////
    handleSaveDetails = () => {
        this.setState({showEdits: false});
        const url = "/api/set-all"
            fetch(url, {method: "POST", 
                    body:JSON.stringify({"destination": this.state.destination, "trip_id": this.state.trip.tripID, "date": this.state.date, "additionalDetails": this.state.additionalDetails}),
                    headers: {"Content-Type": "application/json"}
            }).then(this.handleSaveDetailsResponse).catch(this.handleServerError)

    }
    handleSaveDetailsResponse = (res: Response): void => {
        if (res.status === 200)
        {
            console.log("successful post");
            res.json().then(this.handleSaveDetailsSet)
        }
    }
    handleSaveDetailsSet = (vals:any)=> {
        const url = "/api/get-details?trip_id=" + encodeURIComponent(this.state.trip.tripID);
            fetch (url, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleDetailsSetResponse).catch(this.handleServerError)
    }
    handleDetailsSetResponse = (res: Response): void => {
        if (res.status === 200)
        {
            console.log("successful post");
            res.json().then(this.handleSetTripDetails)
        }
    }
    handleSetTripDetails = (vals: any) => {
        this.setState({trip: vals});
        this.setState({page: "tripDetails"});
    }
//////////////////////////////////////////////



    handleToHome = () => {
        this.setState({page:"home"})
    }
    handleToHorseshoe = () => {
        this.setState({page: "tripDetails"})
    }
    
    handleToArchive = () => {
        this.setState({page: "archive"})
    }

    handleLogOut = () => {
        this.setState({page: "login"})
        this.setState({user: ""});
        this.setState({email: ""});
        this.setState({password: ""});
        this.setState({confirmPassword: ""});
        this.setState({userID:-1});
    }

    goToLogin = () => 
    {
        this.setState({page: "login"})
    }
    goToSignUp = () => 
    {
        this.setState({page: "signUp"})
    }

    setNewEmail = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({email:evt.target.value})
    }
    setNewName = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({user:evt.target.value})
    }
    handleChangeDestination = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({destination:evt.target.value})
    }
    handleSetAdditionalDetails = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({additionalDetails:evt.target.value})
    }
    handleSetDate = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({date:evt.target.value})
    }
    setNewPassword = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({password:evt.target.value})
    }
    setNewTripName = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({tripName:evt.target.value})
    }
    setNewConfirmPassword = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({confirmPassword:evt.target.value})
    }
    
    handleSignUp = (): void => {
        console.log(this.state.confirmPassword + " " + this.state.email + " " + this.state.user + " " + this.state.password)
        if (this.state.password===this.state.confirmPassword)
        {
            const url = "/api/create-user"
            fetch(url, {method: "POST", 
                    body:JSON.stringify({"name": this.state.user, "email": this.state.email, "password": this.state.password}),
                    headers: {"Content-Type": "application/json"}
            }).then(this.handleSignUpResponse).catch(this.handleServerError)
        }
        else 
        {
            alert("passwords do not match!")
        }
    }
    handleSignUpResponse = (res: Response): void =>
    {
        if (res.status === 200)
        {
            console.log("successful post");
        res.json().then(this.handleSignUpSet)
        }
        else 
        {
            console.log("unsuccessful post")
        //this.handleServerError
        }
    }
    handleSignUpSet = (vals: number) => {
        console.log(vals)
        this.setState({page:"home"})
        this.setState({userID: vals})
    }
    handleServerError = (_:Response) => {
        console.error("unknown error talking to server")
        console.log("unknown error server error ")
    }

    ///////////////////////////////////////////////////////////////////////////////
    handleToTrip = (evt: MouseEvent<HTMLAnchorElement>, tripID: number) => {
        const url = "/api/get-details?trip_id=" + encodeURIComponent(tripID);
            fetch (url, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleDetailsSetResponse).catch(this.handleServerError)
    }

    /*handleToTrip = (tripID: number): void => {
        const url = "/api/get-details?trip_id=" + encodeURIComponent(tripID);
            fetch (url, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleDetailsSetResponse).catch(this.handleServerError)
    }*/

    ///////////////////////////////////////////////////
    handleCreateTrip = () : void => {
        const url = "/api/create-trip"
            fetch(url, {method: "POST", 
                    body:JSON.stringify({"name": this.state.tripName}),
                    headers: {"Content-Type": "application/json"}
            }).then(this.handleCreateTripResponse).catch(this.handleServerError)

    }
    handleCreateTripResponse = (res: Response): void => {
        if (res.status === 200)
        {
            console.log("successful post");
            res.json().then(this.handleCreateTripSet)
        }
    }
    handleCreateTripSet = (vals:number)=> {
        console.log("Successful!!")
        console.log(vals);
        this.setState({tripID: vals});
        this.setState({memberStatus:"creator"})
        console.log(this.state.tripID);
        const trips: Trip = {
            tripID: vals, 
            archived: 0,
            name: this.state.tripName, 
            destination:"", 
            date:"",
            additionalDetails:"",
            groupPack:""
        }
        this.setState({trip : trips})

        const url = "/api/add-member"

        fetch(url, {method: "POST", 
                    body:JSON.stringify({"user_id": this.state.userID, "trip_id": this.state.tripID, "status": "creator" }),
                    headers: {"Content-Type": "application/json"}
            }).then(this.handleCreateMemberResponse).catch(this.handleServerError)
    }
    /*
    handleCreateMember = (): void =>{
        const url = "/api/add-member"

        fetch(url, {method: "POST", 
                    body:JSON.stringify({"user_id": this.state.userID, "trip_id": this.state.tripID, "status": "creator" }),
                    headers: {"Content-Type": "application/json"}
            }).then(this.handleCreateMemberResponse).catch(this.handleServerError)
    }*/

    handleCreateMemberResponse = (res: Response): void => {
        if (res.status === 200)
        {
            console.log("successful post");
            res.json().then(this.handleCreateMemberSet)
        }
    }
    handleCreateMemberSet = (vals: number) => {
        console.log("Successful member creation!");
        console.log(vals);
        this.setState({memberID: vals});
        this.setState({page: "tripDetails"});

    }

    /*
    handleSignIn = async () => {
        console.log(this.state.email + " " + this.state.password)
            const url = "/api/is-valid"
            const response = await fetch(url, {method: "GET", 
                    body:JSON.stringify({"email": this.state.email, "password": this.state.password}),
                    headers: {"Content-Type": "application/json"}
            });
            if (response.status === 200) {
                var jsonObj = await response.json();
                if (jsonObj< 0) {
                    this.handleServerError;
                }
                else 
                {
                    this.setState({userID:jsonObj})
                    console.log(this.state.userID);
                }
            }
    }*/
    /*
    handleSignIn = (): void => {
            const url = "/api/is-valid"
            fetch(url, {method: "GET", 
                    body:JSON.stringify({"email": this.state.email, "password": this.state.password}),
                    headers: {"Content-Type": "application/json"}
            }).then(this.handleSignInResponse).catch(this.handleServerError)
        
    }*/

    handleSignIn = (): void => {
        console.log("got to handle sign in")
        const url = "/api/is-valid?email=" + encodeURIComponent(this.state.email)+ "&password=" + encodeURIComponent(this.state.password);
        fetch (url, {method: "GET", 
        headers: {"Content-Type": "application/json"}
    }).then(this.handleSignInResponse).catch(this.handleServerError)
    }
    handleSignInResponse = (res: Response) => {
        if (res.status === 200)
        {
            res.json().then(this.handleSignInSet)
            console.log("status 200 for sign in ")
        }
        else {
            console.log("not 200 for sign in ")
        }
    }
    handleSignInSet = (vals:number): void => {
        if (vals <0 )
        {
            alert("Username or Password invalid!");
        }
        else 
        {
            console.log(vals);
            this.setState({userID: vals});

            const url = "/api/get-all-trips?user_id=" + encodeURIComponent(vals);
                fetch (url, {method:"GET",
                headers: {"Content-Type": "application/json"}
            }).then(this.handleSignInSetResponse).catch(this.handleServerError)
        }
    }

    handleSignInSetResponse = (res: Response): void => 
    {
        if (res.status === 200)
        {
            console.log("successful post");
            res.json().then(this.handleSetTrips)
        }
    }
    handleSetTrips = (vals:any) => {
        this.setState({tripList: vals});
        this.setState({page: "home"});
    }
}


/*import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
