import React from "react";
import {useState} from "react"
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

export interface AppProps {
    //num: number
}

type Page = "login" | "home" | "tripDetails" | "signUp" | "individual-pack" | "archive" | "individual cost" | "test"

export interface AppState {
    page: Page
    user: String
    showEdits: boolean
}

interface Person {
    name: string;
    surname: string;
}

//const [show, setShow] = useState(false);

export class App extends React.Component<AppProps, AppState> {
    constructor(props: any){
        super(props)
        this.state =  {
            page: "archive",
            user: "Caroline Zhu",
            showEdits: false
        }
    }


    render():React.ReactNode {
        let nodes : JSX.Element[]= [];
        
        if (this.state.page === "login" || this.state.page === "signUp")
        {
            nodes.push(
                <div>
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
                            <Nav.Link href="#">Log in</Nav.Link>
                            <Nav.Link href="#">Sign Up</Nav.Link>

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
                <div>
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
                                <NavDropdown.Item id = "logout button" href="#">Logout</NavDropdown.Item>
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
            nodes.push(
                <>
                    <Container fluid className = "p-3">
                        <Stack gap = {3} >
                        <div id = "planned trips title" className = "mx-auto">
                            <h2 className = "mx-auto">
                                Planned Trips
                            </h2>
                        </div>
                        <div className="mx-auto">
                            <h5> <a onClick={this.handleToHorseshoe} className = "remove-line" id = "camping" href = "#">Camp at HorseShoe</a></h5>
                        </div>
                        <div className="mx-auto">
                            <h5> <a className = "remove-line" id = "LA" href = "#">Trip to LA</a></h5>
                        </div>
                        <div className="mx-auto">
                            <h5> <a className = "remove-line" id = "Mexico" href = "#">Trip to Mexico</a></h5>
                        </div>
                        
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
                            <Form.Control type="text" placeholder="Amazing Trip" />
                        </FloatingLabel>
                            <Button size = "sm" className = "color-lightBlue p-1" type="submit">
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
                            <Form.Control type="email" placeholder="Email" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                            Password
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="password" placeholder="Password" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalCheck">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check label="Remember me" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={BootRow} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button className = "color-lightBlue" type="submit">Sign in</Button>
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
                            <Form.Control type="email" placeholder="Email" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                            First Name
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="text" placeholder="Enter first name" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                            Password
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="password" placeholder="Enter password" />
                            </Col>
                        </Form.Group>
                        <Form.Group as={BootRow} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                            Confirm Password
                            </Form.Label>
                            <Col sm={10}>
                            <Form.Control type="password" placeholder="Confirm password" />
                            </Col>
                        </Form.Group>

                        <Form.Group as={BootRow} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Button className = "color-lightBlue" type="submit">Sign in</Button>
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
                                Horseshoe Cove Camping
                            </h2>
                        </div>

                        <Container className = "w-100">
                            <h5><b>Where: </b> Horseshoe Cove Campground </h5>
                            <h5><b>When: </b> 3/11-7/12 </h5>
                            
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
                                        type="text"
                                    />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Date of trip</Form.Label>
                                    <Form.Control
                                        type="text"
                                    />
                                    </Form.Group>
                                    <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                    >
                                    <Form.Label>Additional Details</Form.Label>
                                    <Form.Control as="textarea" rows={3} />
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
                            <Button className=" color-lightBlue" onClick={this.handleCloseEdits}>
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
                            <p><b>Additional Details: </b>book plane tickets no later than saturday!</p>
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
    handleToHome = () => {
        this.setState({page:"home"})
    }
    handleToHorseshoe = () => {
        this.setState({page: "tripDetails"})
    }
    handleToArchive = () => {
        this.setState({page: "archive"})
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
