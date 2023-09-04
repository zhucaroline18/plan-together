import React, {ChangeEvent, MouseEvent} from "react";
//import {useState} from "react"
//import {ReactGrid, Column, Row, CellChange, TextCell} from "@silevis/reactgrid"
//import 'C:\planTogether\client2\src\custom.scss'
//import {style} from "@silevis/reactgrid/styles.css";

import "@silevis/reactgrid/styles.css";
import { MDBInput,MDBBtn, MDBIcon, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
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
import { CloseButton, Col, OverlayTrigger, Popover, Tab, Table, Tabs } from "react-bootstrap";
//import { SignUp } from "./SignUp";
//import { NumberLiteralType } from "typescript";
import { ArrowBarUp, ArrowRight, PersonCheck, Star } from 'react-bootstrap-icons';


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
    memberID: number
}

export interface AppProps {
    //num: number
}

type Page = "login" | "home" | "tripDetails" | "signUp" | "individual-pack" | "archive" | "individual cost" | "test"

type Member = "creator" | "invited" | "joined" | null

type Members = {
    memberID: number
    name: string
    email: string
    status: string
}
type Expense = {
    id: number
    expense:string
    toPay:string
    totalCost:number
}
type GroupItem = {
    id: number
    item :string
    amountNeeded :string
}
type Volunteer = {
    id: number
    itemID: number
    tripId: number
    userId: number
    name: string
    amountVolunteering: number
}
type User = {
    userId: number
    name: string
}


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
    memberStatus: string
    memberID: number
    destination: string
    additionalDetails: string
    date:string
    trip: Trip
    invitedEmail: string
    removedEmail: string
    tripList: SimpleTrip[]
    memberList: Members[]
    invitedTrips:SimpleTrip[]
    expenses: Expense[]
    //totalExpense: number
    costPerPerson: number
    whoToPay: string
    totalAmount: number
    expense: string
    totalCost: number
    accept: boolean
    groupItem: string
    amount:number
    groupItemList: GroupItem[]
    volunteers: Volunteer[]
    archivedTrips: SimpleTrip[]
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
        let archivedTrips: SimpleTrip[] = []
        let memberList: Members[] = []
        let invitedTrips: SimpleTrip[] = []
        let costs : Expense[] = []
        let items: GroupItem[] = []
        let volunteers: Volunteer[] = []

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
            memberStatus: "", 
            memberID: -1, 
            destination: "",
            additionalDetails: "", 
            date: "", 
            trip: trip, 
            invitedEmail: "",
            removedEmail: "",
            tripList: triplist,
            memberList: memberList,
            invitedTrips: invitedTrips, 
            expenses: costs, 
            //totalExpense: 0, 
            costPerPerson: 0, 
            whoToPay:"", 
            totalAmount:0, 
            expense:"",
            totalCost: 0,
            accept: false,
            groupItem: "", 
            amount:1,
            groupItemList: items,
            volunteers: volunteers,
            archivedTrips: archivedTrips
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
                        .large-width {
                            width: 300;
                        }
                        .rightalign {
                            text-align: right;
                        }
                    `}
                    </style>
                    <Navbar className = "color-nav" id = "navBar"  data-bs-theme="dark">
                    <Container id = "navBarContainer">
                    <Navbar.Brand  id = "brand-navBar" href="#home">
                    <img
                        alt=""
                        src="dinoLogo.webp"
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
                        .alignleft {
                            text-align: left;
                        }
                        .table td {
                            text-align: center;
                            } 
                        .table th {
                            text-align: center;
                        } 
                    `}
                    </style>
                    <Navbar className = "color-nav" id = "navBar"  data-bs-theme="dark">
                    <Container id = "navBarContainer">
                    <Navbar.Brand id = "brand-navBar" href="#home" onClick={this.handleToHome}>
                    <img
                        alt=""
                        src="dinoLogo.webp"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        Plan Together
                    </Navbar.Brand>
                    <Navbar.Toggle />
                        <Navbar.Collapse id = "navBarCollapse" className="justify-content-end">
                        <Nav id = "navbar home link" className="me-auto">
                            <Nav.Link onClick={this.handleToArchive} href="#">Archive</Nav.Link>

                        </Nav>
                        <Navbar.Text id = "signed in as">
                            Signed in as: 
                            <NavDropdown title={this.state.user} id="basic-nav-dropdown">
                                <NavDropdown.Item onClick = {this.handleLogOut}id = "logout button" href="#">Logout</NavDropdown.Item>
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
            
            let links: JSX.Element[] = [];
            //console.log(this.state.tripList);
            for (let i = 0; i<this.state.archivedTrips.length; i++)
            {
                const popoverClickRootRestore = (
                    <Popover id="popover-trigger-click-root-close" title="Popover bottom">
                        <div className = "p-1">
                        <Button className = "color-lightBlue" onClick = {(evt) => this.handleUnarchive(evt, this.state.archivedTrips[i].memberID)}>Unarchive Trip</Button>
                        </div>
                    </Popover>
                );
                const popoverClickRootDelete = (
                    <Popover id="popover-trigger-click-root-close" title="Popover bottom">
                        <div className = "m-1">
                        <Button className = "color-lightBlue m-1" onClick = {(evt) => this.handleRemoveMember(evt, this.state.archivedTrips[i].tripID)}>Permanently Delete</Button>
                        </div>
                    </Popover>
                );
                
                links.push(
                    <tr>
                        <td>
                            <h5><a style={{ textDecoration: 'none', color: '#006C84' }} className = "mx-auto" href = "#" onClick = {(evt) => this.handleToTrip(evt, this.state.archivedTrips[i].tripID)} >{this.state.archivedTrips[i].name}</a></h5>
                        </td>
                        <td>
                            <OverlayTrigger
                            trigger ="click" rootClose placement = "bottom" overlay = {popoverClickRootRestore}>
                                <h3>
                                    <a>
                                    <ArrowBarUp />
                                    </a>
                                </h3>
                                

                            </OverlayTrigger>
                        </td>
                        <td>
                            <OverlayTrigger
                            trigger ="click" rootClose placement = "bottom" overlay = {popoverClickRootDelete}>
                            <CloseButton/>
                            </OverlayTrigger>
                        </td>
                    </tr>
                )
            }
            nodes.push(
                <>
                    <Container fluid className = "p-3">
                        <Stack gap = {3} >
                        <div id = "planned trips title" className = "mx-auto">
                            <h2 className = "mx-auto">
                                Archived Trips
                            </h2>
                        </div>
                        
                        
                        <MDBTable borderless hover align = "middle" className = "mx-auto p-3 w-50">
                            <MDBTableBody>
                                {links}
                            </MDBTableBody>
                        </MDBTable>
                        </Stack>
                    </Container>
                    
                </>
            );
        }
        if (this.state.page==="home" )
        {
            let links: JSX.Element[] = [];
            //console.log(this.state.tripList);
            for (let i = 0; i<this.state.tripList.length; i++)
            {
                const popoverClickRootClose = (
                    <Popover id="popover-trigger-click-root-close" title="Popover bottom">
                        <div className = "p-1">
                        <Button className = "color-lightBlue" onClick = {(evt) => this.handleArchive(evt, this.state.tripList[i].memberID)}>Archive Trip</Button>
                        </div>
                    </Popover>
                );
                
                links.push(
                    <tr className = "rightalign">
                        <td className = "align-middle">
                            <h5><a style={{ textDecoration: 'none', color: '#006C84' }} href = "#" onClick = {(evt) => this.handleToTrip(evt, this.state.tripList[i].tripID)} >{this.state.tripList[i].name}</a></h5>
                        </td>
                        <td className = "alignleft">
                            <OverlayTrigger
                            trigger ="click" rootClose placement = "bottom" overlay = {popoverClickRootClose}>
                            <CloseButton/>
                            </OverlayTrigger>
                        </td>
                        
                    </tr>
                    /*
                <Container>
                <div key = {i} className = "mx-auto">
                    <a  style={{ textDecoration: 'none' }} className = "mx-auto" href = "#" onClick = {(evt) => this.handleToTrip(evt, this.state.tripList[i].tripID)} >{this.state.tripList[i].name}</a>
                    <OverlayTrigger
                        trigger ="click" rootClose placement = "bottom" overlay = {popoverClickRootClose}>
                        <CloseButton/>
                    </OverlayTrigger>
                </div>
                </Container>*/
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
                        
                        
                        <Table borderless hover className = "mx-auto p-3 w-50">
                            <tbody>
                                {links}
                            </tbody>
                        </Table>
                        </Stack>
                    </Container>
                    
                </>
            );
            let invited: JSX.Element[] = [];
            if (this.state.invitedTrips.length === 0)
            {
                invited.push(<div>no trips to join!</div>)
            }
            for (let i = 0; i<this.state.invitedTrips.length; i++)
            {
                invited.push(
                    <BootRow>
                        <Col xs = {7}><b>{this.state.invitedTrips[i].name}-</b> invited by 'invitor'</Col>
                        <Col xs = {3}>
                            <div key="reverse-inline-radio" className="me-auto">
                            <Form.Check
                                inline
                                label="Join"
                                name="group1"
                                type="radio"
                                id="inline-radio-1"
                                onClick = {this.handleChangeInvitation1}

                            />
                            <Form.Check
                                inline
                                label="Reject"
                                name="group1"
                                type="radio"
                                id="inline-radio-2"
                                onClick = {this.handleChangeInvitation2}

                            />
                            
                            </div>
                        </Col>
                        <Col>
                            <Button size = "sm" className = "color-lightBlue p-1" onClick = {(evt) =>this.handleAccept(evt, this.state.invitedTrips[i].tripID)}>
                                Confirm
                            </Button>
                        </Col>
                    </BootRow>
                )
            }

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
                            <Button onClick = {this.handleCreateTrip} size = "sm" className = "color-lightBlue p-1" type = "button">
                                Submit
                            </Button>
                        </Form>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                    <Accordion.Header>Join a Trip</Accordion.Header>
                    <Accordion.Body>
                        <Form>
                            {invited}
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
            let members : JSX.Element[]= [];

            if (this.state.memberStatus === "creator")
            {
                for (let i = 0; i<this.state.memberList.length; i++)
                {
                    if (this.state.memberList[i].status === "joined")
                    {
                        const popoverClickRootRestore = (
                            <Popover id="popover-trigger-click-root-close" title="Popover bottom">
                                <div className = "p-1">
                                <Button className = "color-lightBlue" onClick = {(evt) =>this.makeCreator(evt, this.state.memberList[i].memberID)}>Promote to Creator</Button>
                                </div>
                            </Popover>
                        );
                        members.push(
                            <tr>
                                <td>{i+1}</td>
                                <td>{this.state.memberList[i].name}</td>
                                <td>{this.state.memberList[i].email}</td>
                                <td>{this.state.memberList[i].status}</td>
                                <td>
                                <OverlayTrigger
                                    trigger ="click" rootClose placement = "bottom" overlay = {popoverClickRootRestore}>
                                    <PersonCheck/>
                                </OverlayTrigger>
                                </td>
                            </tr>
                        )
                    }
                    else{
                        members.push(
                            <tr>
                                <td>{i+1}</td>
                                <td>{this.state.memberList[i].name}</td>
                                <td>{this.state.memberList[i].email}</td>
                                <td>{this.state.memberList[i].status}</td>
                                <td></td>
                            </tr>
                        )
                    }
                }
            }
            else 
            {
                for (let i = 0; i<this.state.memberList.length; i++)
                {
                    if (this.state.memberList[i].status === "joined")
                    {
                        const popoverClickRootRestore = (
                            <Popover id="popover-trigger-click-root-close" title="Popover bottom">
                                <div className = "p-1">
                                <Button className = "color-lightBlue" onClick = {(evt) =>this.makeCreator(evt, this.state.memberList[i].memberID)}>Promote to Creator</Button>
                                </div>
                            </Popover>
                        );
                        members.push(
                            <tr>
                                <td>{i+1}</td>
                                <td>{this.state.memberList[i].name}</td>
                                <td>{this.state.memberList[i].email}</td>
                                <td>{this.state.memberList[i].status}</td>
                            </tr>
                        )
                    }
                    else{
                        members.push(
                            <tr>
                                <td>{i+1}</td>
                                <td>{this.state.memberList[i].name}</td>
                                <td>{this.state.memberList[i].email}</td>
                                <td>{this.state.memberList[i].status}</td>
                            </tr>
                        )
                    }
                }
            }
            

            let editButton : JSX.Element[]= [];
            if (this.state.memberStatus === "creator")
            {
                editButton.push(
                    <Button variant="primary" className = "color-lightBlue p-1 float-right" onClick={this.handleShowEdit}>
                            Edit Details
                    </Button>
                )
            }
            let editMembers: JSX.Element[] = [];
            if (this.state.memberStatus === "creator")
            {
                editMembers.push(
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
                                <Form.Control onChange = {this.setInvitedEmail} type="email" defaultValue = {this.state.invitedEmail}/>
                                </FloatingLabel>
                                    <Button size = "sm" className = "color-lightBlue p-1" type="button" onClick = {this.sendInvite1} >
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
                                    <Form.Control onChange = {this.setRemovedEmail}type="email" placeholder="Amazing Trip" />
                                </FloatingLabel>
                                    <Button size = "sm" className = "color-lightBlue p-1" type="button" onClick = {this.removeMember} value = "">
                                        Remove Member
                                    </Button>
                                </Form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )
            }
            /*
            const popoverClickRootClose = (
                <Popover id="popover-trigger-click-root-close" title="Popover bottom">
                  <strong>Remove expense?</strong> <Button className = "color-lightBlue" onClick = {this.removeCost}>Delete</Button>
                </Popover>
            );*/
            let itemRows: JSX.Element[] = [];
            //let volunteerRows: JSX.Element[]=[];
            for (let i = 0; i<this.state.groupItemList.length; i++)
            {
                let signedUp:boolean = false;
                let amountSignedUpFor: number = 0;
                let volunteerRows: JSX.Element[]=[];
                
                for (let j = 0; j<this.state.volunteers.length; j++)
                {
                    if (this.state.volunteers[j].itemID === this.state.groupItemList[i].id)
                    {
                        console.log("item id volunteer: " + this.state.volunteers[j].itemID + " item id groupitem: " + this.state.groupItemList[i].id)
                        volunteerRows.push(
                            <p>{this.state.volunteers[j].name}: bringing {this.state.volunteers[j].amountVolunteering}</p>
                        )
                        if (this.state.volunteers[j].userId===this.state.userID)
                        {
                            signedUp = true;
                            amountSignedUpFor = this.state.volunteers[j].amountVolunteering;
                        }
                    }
                }
                /*
                const popoverClickRootClose = (
                    <Popover id="popover-trigger-click-root-close" title="Popover bottom">
                      <strong>Remove expense?</strong> 
                      <Button className = "color-lightBlue" onClick = {(evt) =>this.removeItem(evt, this.state.groupItemList[i].id)}>Delete</Button>
                    </Popover>
                );*/
               
                itemRows.push(
                    //<OverlayTrigger
                    //    trigger ="click" rootClose placement = "bottom" overlay = {popoverClickRootClose}
                    //>
                    <tr>
                        <td><b>{this.state.groupItemList[i].item}</b></td>
                        <td>{this.state.groupItemList[i].amountNeeded}</td>
                        <td>{volunteerRows}</td>
                        <td>
                            <MDBInput className = "d-inline w-25" placeholder='None' id='typeNumber' type='number' min = '0' onChange = {(evt) =>this.handleVolunteer(evt, this.state.groupItemList[i].id)} defaultValue = {amountSignedUpFor}/>
                        </td>
                        <td><CloseButton onClick = {(evt) =>this.removeItem(evt, this.state.groupItemList[i].id)}/></td>
                    </tr>
                    //</OverlayTrigger>
                )
            }


            let expenseRows: JSX.Element[] = [];
            const roundToHundredth = (value: number) => {
                return Number(value.toFixed(2));
              };

            for (let i = 0; i<this.state.expenses.length; i++)
            {
                /*
                const popoverClickRootClose = (
                    <Popover id="popover-trigger-click-root-close" title="Popover bottom">
                      <strong>Remove expense?</strong> 
                      <Button className = "color-lightBlue" onClick = {(evt) =>this.removeCost(evt, this.state.expenses[i].id)}>Delete</Button>
                    </Popover>
                );*/
                
                expenseRows.push(
                    //<OverlayTrigger
                    //    trigger ="click" rootClose placement = "bottom" overlay = {popoverClickRootClose}>
                        <tr>
                        <td>{this.state.expenses[i].expense}</td>
                        <td>{this.state.expenses[i].toPay}</td>
                        <td>{this.state.expenses[i].totalCost}</td>
                        <td>{roundToHundredth(this.state.expenses[i].totalCost/this.state.memberList.length)}</td>
                        <td> <CloseButton onClick ={(evt) =>this.removeCost(evt, this.state.expenses[i].id)}/> </td>
                        </tr>
                    //</OverlayTrigger>

                )
            }

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
                                {this.state.trip.name}
                            </h2>

                        </div>

                        <Container className = "w-100">

                            <h5><b>Where: </b> {this.state.trip.destination} </h5>
                            <h5><b>When: </b> {this.state.trip.date} </h5>
                            
                        </Container>
                        <div className = "text-left">

                        {editButton}

                        <Modal aria-labelledby="contained-modal-title-vcenter" centered show={this.state.showEdits} onHide={this.handleCloseEdits}>
                            <Modal.Header closeButton>
                            <Modal.Title id = "contained-modal-title-vcenter">Edit Trip</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Destination</Form.Label>
                                    <Form.Control
                                        type="text" onChange = {this.handleChangeDestination} defaultValue = {this.state.trip.destination}
                                    />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Date of trip</Form.Label>
                                    <Form.Control
                                        type="text" onChange = {this.handleSetDate} defaultValue = {this.state.trip.date}
                                    />
                                    </Form.Group>
                                    <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                    >
                                    <Form.Label>Additional Details</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange = {this.handleSetAdditionalDetails} defaultValue = {this.state.trip.additionalDetails}/>
                                    </Form.Group>
                                </Form>
                            </Modal.Body>
                            <Modal.Footer>

                            <Button className=" color-pink" onClick={this.handleCloseEdits}>
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
                        <MDBTable striped borderless>
                            <MDBTableHead>
                                <tr>
                                <th className = "large-width">#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Status</th>
                                </tr>
                            </MDBTableHead>
                            <MDBTableBody>
                                {members}
                            </MDBTableBody>
                        </MDBTable>

                        {editMembers}
                        

                        <hr/>

                        <Container>
                            <p><b>Additional Details: </b>{this.state.trip.additionalDetails}</p>
                        </Container>

                        </Tab>


                        <Tab eventKey="GroupTracker" title="GroupTracker">

                            <Table striped borderless hover>
                                <thead>
                                    <tr>
                                    <th>Item</th>
                                    <th>Person to Pay</th>
                                    <th>Total Cost</th>
                                    <th>Cost per Person</th>
                                    <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {expenseRows}
                                    <tr>
                                    <td><b>Cost Totals</b></td>
                                    <td></td>
                                    <td><b>{this.state.totalCost}</b></td>
                                    <td><b>{roundToHundredth(this.state.totalCost/this.state.memberList.length)}</b></td>
                                    <td></td>
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
                                            <Form.Control placeholder="Expense" onChange = {this.setExpense} />
                                            </Col >
                                            <Col xs = {4}>
                                            <Form.Control placeholder="Who to Pay" onChange = {this.setWhoToPay}/>
                                            </Col>
                                            <Col xs = {2}>
                                            <MDBInput placeholder='Total Cost ($)' id='typeNumber' type='number' min = '0' step = '0.01' onChange = {this.setTotalCost}/>
                                            </Col>
                                            <Col>

                                            <Button size = "sm" className = "color-lightBlue p-1" type="button" onClick = {this.addExpense}>
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
                        <Table striped borderless hover>
                                <thead>
                                    <tr>
                                    <th>Item</th>
                                    <th>Amount Needed</th>
                                    <th>Who's bringing it</th>
                                    <th>Sign up</th>
                                    <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {itemRows}

                                </tbody>
                            </Table>
                            <Accordion className = "mx-auto p-3 w-100">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>Add a Group Item</Accordion.Header>
                                    <Accordion.Body>
                                        <Form className = "p-3">
                                        <BootRow>
                                            <Col xs = {4}>
                                            <Form.Control placeholder="Item" onChange = {this.setItem} />
                                            </Col >
                                            <Col xs = {2}>
                                            <MDBInput placeholder='Amount Needed' id='typeNumber' type='number' min = '1' onChange = {this.setAmount}/>
                                            </Col>
                                            <Col>
                                            <Button size = "sm" className = "color-lightBlue p-1" type="button" onClick = {this.addGroupItem}>
                                                Add Item
                                            </Button>
                                            </Col>
                                        </BootRow>
                                    </Form>

                                    
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            
                        </Tab>
                    </Tabs>
                </Container>
            )
        }

        //<SignUp user = {"Caroline"}/>
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
    alertClicked = () => {
        alert("table row pressed!")
    }
    handleChangeInvitation1 = () => {
        this.setState({accept: true})
    }
    handleChangeInvitation2 = () => {
        this.setState({accept: false})
    }


    //////////////////////////////////////////////////////
    handleSaveDetails = () => {
        this.setState({showEdits: false});
        console.log("got to handle save details")
        const url = "/api/set-all";
        fetch(url, {
            method: "POST", 
            body:JSON.stringify({"destination": this.state.destination, "trip_id": this.state.trip.tripID, "date": this.state.date, "additionalDetails": this.state.additionalDetails}),
            headers: {"Content-Type": "application/json"}
        }).then((res: Response) => {
            if (res.status === 200)
            {
                console.log("got to response");
                return res.json();
            }        
        })
        .then((vals: any)=> {
            console.log("trip id when getting details: " + this.state.tripID);
            const url = "/api/get-details?trip_id=" + encodeURIComponent(this.state.trip.tripID);
            return fetch (url, {method: "GET", 
                headers: {"Content-Type": "application/json"}
            });
        })
        .then((res: Response) => {
            if (res.status === 200)
            {
                console.log("successful post of details");
                return res.json();
            }
        })
        .then((vals: any) => {
            console.log("got to handlesettripdetails")
            this.setState({trip: vals});
            this.setState({page: "tripDetails"});
            this.setState({destination: vals.destination});
            this.setState({date: vals.date});
            this.setState({additionalDetails: vals.additionalDetails});
        })
        .catch(this.handleServerError);
    }

    handleDetailsSetResponse = (res: Response) => {
        if (res.status == 200) {
            return res.json()
            .then(this.handleDetailsSet);
        }
    }

    handleDetailsSet = (vals: any) => {
        this.setState({trip: vals});
        this.setState({page: "tripDetails"});
        this.setState({destination: vals.destination});
        this.setState({date: vals.date});
        this.setState({additionalDetails: vals.additionalDetails});
    }
            
//////////////////////////////////////////////

    handleToHome = () => {
        this.setState({page:"home"})
        this.handleRefresh3()
    }
    handleToHorseshoe = () => {
        this.setState({page: "tripDetails"})
    }
    
    handleToArchive = () => {
        this.setState({page: "archive"})
    }

    handleLogOut = () => {
        this.setState({userID:-1});

        this.setState({page: "login"})
        this.setState({user: ""});
        this.setState({email: ""});
        this.setState({password: ""});
        this.setState({confirmPassword: ""});
    }

    goToLogin = () => 
    {
        this.setState({page: "login"})
    }
    goToSignUp = () => 
    {
        this.setState({page: "signUp"})
    }
    setTotalCost = (evt:ChangeEvent<HTMLInputElement>): void => {
        const num = parseFloat(evt.target.value)
        this.setState({totalAmount: num})
    }
    setAmount = (evt:ChangeEvent<HTMLInputElement>): void => {
        const num = parseInt(evt.target.value)
        this.setState({amount: num})
    }
    setItem = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({groupItem: evt.target.value})
    }
    setWhoToPay = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({whoToPay: evt.target.value})
    }
    setExpense = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({ expense : evt.target.value})
    }

    setNewEmail = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({email:evt.target.value})
    }
    setNewName = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({user:evt.target.value})
    }
    setRemovedEmail = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({removedEmail:evt.target.value})
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
    setInvitedEmail = (evt:ChangeEvent<HTMLInputElement>): void => {
        this.setState({invitedEmail:evt.target.value})
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
        //console.log(this.state.confirmPassword + " " + this.state.email + " " + this.state.user + " " + this.state.password)
        const url2 = "/api/has-user?email=" + encodeURIComponent(this.state.email);
                fetch (url2, {method:"GET",
                headers: {"Content-Type": "application/json"}
            }).then(this.handleSignUp2).catch(this.handleServerError)

        
    }
    handleSignUp2 = (res: Response): void => {
        if (res.status === 200)
        {
            res.json().then(this.handleSignup3)
        }
    }
    handleSignup3 = (vals: any) => {
        if (vals === true)
        {
            alert ("email already exists");
        }
        else 
        {
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
    }
    
    handleSignUpResponse = (res: Response): void =>
    {
        if (res.status === 200)
        {
            //console.log("successful post");
            res.json().then(this.handleSignUpSet)
        }
        else 
        {
            console.log("unsuccessful post")
        }
    }
    handleSignUpSet = (vals: number) => {
        //console.log(vals)
        this.setState({userID: vals})
        let triplist: SimpleTrip[] = []
        let archivedTrips: SimpleTrip[] = []
        let invitedTrips: SimpleTrip[] = []
        this.setState({tripList: triplist})
        this.setState({archivedTrips: archivedTrips})
        this.setState({invitedTrips: invitedTrips})

        this.setState({page:"home"})
    }
    handleRefresh4 = (vals: any) => {
        const url2 = "/api/get-all-trips?user_id=" + encodeURIComponent(this.state.userID);
                fetch (url2, {method:"GET",
                headers: {"Content-Type": "application/json"}
            }).then(this.handleSignInResponse3).catch(this.handleServerError)
        const url3 = "/api/get-all-invited-trips?user_id=" + encodeURIComponent(this.state.userID);
            fetch (url3, {method:"GET",
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSignInResponse5).catch(this.handleServerError)

    }
    handleSignInResponse3 = (res: Response): void => {
        if (res.status === 200)
        {
            console.log("getting trips")
            res.json().then(this.handleSignUpSet4)
        }
    }
    handleSignInResponse5 = (res: Response): void => {
        if (res.status === 200)
        {
            res.json().then(this.handleSignUpSet5)
        }
    }
    handleSignUpSet4 = (vals: SimpleTrip[])=>
    {
        this.setState({tripList: vals});
    }
    handleSignUpSet5 = (vals: SimpleTrip[])=>
    {
        this.setState({invitedTrips: vals});
    }

    handleServerError = (_:Response) => {
        console.error("unknown error talking to server")
        //console.log("unknown error server error ")
    }
    
    


    ///////////////////////////////////////////////////////////////////////////////
    handleToTrip = (evt: MouseEvent<HTMLAnchorElement>, tripID: number) => {
        const url2 = "/api/get-all-members?trip_id=" + encodeURIComponent(tripID)
            fetch (url2, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSetUsersResponse).catch(this.handleServerError)

        const url4 = "/api/get-all-costs?trip_id=" + encodeURIComponent(tripID)
            fetch (url4, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSetCostsResponse).catch(this.handleServerError)

        const url3 = "/api/get-member-status?trip_id="+encodeURIComponent(tripID)+"&user_id="+encodeURIComponent(this.state.userID)
            fetch(url3,{method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleToTripResponse2).catch(this.handleServerError)

        const url = "/api/get-details?trip_id=" + encodeURIComponent(tripID);
            fetch (url, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleDetailsSetResponse).catch(this.handleServerError)

        const url5 = "/api/get-all-group-items?trip_id=" + encodeURIComponent(tripID)
            fetch (url5, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSetGroupItemsResponse).catch(this.handleServerError)
        const url6 = "/api/get-all-volunteers?trip_id=" + encodeURIComponent(tripID)
            fetch (url6, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSetVolunteers).catch(this.handleServerError)
    }

    makeCreator = (evt: MouseEvent<HTMLButtonElement>, memberID: number) => {
        document.body.click()
        const url2 = "/api/make-creator"
        fetch(url2, {method: "POST", 
        body:JSON.stringify({"member_id": memberID}),
        headers: {"Content-Type": "application/json"}
        }).then(this.handleMakeCreatorResponse).catch(this.handleServerError)
    }
    handleMakeCreatorResponse =(res: Response): void => {
        if (res.status === 200)
        {
            res.json().then(this.handleCreateMemberSet2)
        }
        else{
            console.log("status for making creator not 200")

        }
    }

    removeCost = (evt: MouseEvent<HTMLButtonElement>, costID: number) => {
        const url2 = "/api/remove-cost"
            fetch(url2, {method: "POST", 
            body:JSON.stringify({"cost_id": costID}),
            headers: {"Content-Type": "application/json"}
        }).then(this.handleRemoveCostResponse).catch(this.handleServerError)
    }
    removeItem= (evt: MouseEvent<HTMLButtonElement>, costID: number) => {
        const url2 = "/api/remove-item"
            fetch(url2, {method: "POST", 
            body:JSON.stringify({"item_id": costID}),
            headers: {"Content-Type": "application/json"}
        }).then(this.handleRemoveItemResponse).catch(this.handleServerError)
    }

    handleVolunteer = (evt:ChangeEvent<HTMLInputElement>, idItem:number)=>
    {
        const amountToChange = parseInt(evt.target.value);
        if (amountToChange=== 0)
        {
            const url = "/api/remove-volunteer"
                fetch(url, {method: "POST", 
                        body:JSON.stringify({"item_id": idItem, "user_id":this.state.userID}),
                        headers: {"Content-Type": "application/json"}
                }).then(this.handleVolunteerResponse).catch(this.handleServerError)
        }
        else
        {
            const url = "/api/add-volunteer"
                fetch(url, {method: "POST", 
                        body:JSON.stringify({"item_id": idItem, "trip_id":this.state.trip.tripID, "user_id": this.state.userID, "amount": amountToChange}),
                        headers: {"Content-Type": "application/json"}
                }).then(this.handleVolunteerResponse).catch(this.handleServerError)
        }
    }

    handleAccept = (evt:MouseEvent<HTMLButtonElement>, tripID: number) => {
        if (this.state.accept === true)
        {
            const url = "/api/join-trip"
            fetch(url, {method: "POST", 
                    body:JSON.stringify({"user_id": this.state.userID, "trip_id": tripID}),
                    headers: {"Content-Type": "application/json"}
            }).then(this.handleAcceptResponse).catch(this.handleServerError)
        }
        else 
        {
            const url = "/api/remove-member"
            {
                fetch(url, {method: "POST", 
                    body:JSON.stringify({"user_id": this.state.userID, "trip_id": tripID}),
                    headers: {"Content-Type": "application/json"}
            }).then(this.handleRejectResponse).catch(this.handleServerError)
            }
        }
    }
    handleVolunteerResponse=(res: Response): void => {
        if (res.status === 200)
        {
            res.json().then(this.handleRefreshVolunteers)
        }
        else{
            console.log("status for volunteering not 200")

        }
    }



    handleAcceptResponse = (res: Response): void => {
        if (res.status === 200)
        {   
            //console.log("status 200 for joining trip")
            res.json().then(this.handleRefresh4)
        }
        else 
        {
            console.log("status for joining trip not 200")
        }
    }
    handleArchiveResponse = (res: Response): void => {
        if (res.status === 200)
        {   
            console.log("status 200 for archiving trip")
            res.json().then(this.handleArchived)
        }
        else 
        {
            console.log("status for archiving not 200")
        }
    }

    handleArchived = (vals: any) => {
        console.log("got to setting archived")
        const url2 = "/api/get-all-trips?user_id=" + encodeURIComponent(this.state.userID);
                fetch (url2, {method:"GET",
                headers: {"Content-Type": "application/json"}
            }).then(this.handleSignInResponse3).catch(this.handleServerError)

        const url3 = "/api/get-all-archived-trips?user_id=" + encodeURIComponent(this.state.userID);
            fetch (url3, {method:"GET",
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSignInSetResponse3).catch(this.handleServerError)    
    }

    handleRejectResponse = (res: Response): void => {
        if (res.status === 200)
        {   
            res.json().then(this.handleRefresh3)
        }
        else 
        {
            console.log("status for rejecting trip not 200")
        }
    }

    handleRefresh3 = () : void => {
        const url2 = "/api/get-all-invited-trips?user_id=" + encodeURIComponent(this.state.userID);
                fetch (url2, {method:"GET",
                headers: {"Content-Type": "application/json"}
            }).then(this.handleSignInSetResponse2).catch(this.handleServerError)

        const url = "/api/get-all-trips?user_id=" + encodeURIComponent(this.state.userID);
                fetch (url, {method:"GET",
                headers: {"Content-Type": "application/json"}
            }).then(this.handleSignInSetResponse).catch(this.handleServerError)
    }
    handleRefreshVolunteers = () : void => {
        const url6 = "/api/get-all-volunteers?trip_id=" + encodeURIComponent(this.state.trip.tripID)
            fetch (url6, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSetVolunteers).catch(this.handleServerError)
    }

    handleArchive = (evt: MouseEvent<HTMLButtonElement>, memberID: number)=>{
        //this.hidePopover()
        document.body.click()
        console.log("got to handleArchive")
        const url2 = "/api/archive"
            fetch(url2, {method: "POST", 
            body:JSON.stringify({"member_id": memberID}),
            headers: {"Content-Type": "application/json"}
        }).then(this.handleArchiveResponse).catch(this.handleServerError)
    }

    /*
    hidePopover = () => {
        this.refs.overaly.hide();
    }*/
    handleUnarchive = (evt: MouseEvent<HTMLButtonElement>, memberID: number)=>{
        document.body.click()
        console.log("got to handleUnarchive")
        const url2 = "/api/unarchive"
            fetch(url2, {method: "POST", 
            body:JSON.stringify({"member_id": memberID}),
            headers: {"Content-Type": "application/json"}
        }).then(this.handleArchiveResponse).catch(this.handleServerError)
    }
    handleRemoveMember = (evt: MouseEvent<HTMLButtonElement>, tripID: number) => {
        document.body.click()

        const url = "/api/remove-member"
            fetch(url, {method: "POST", 
                        body:JSON.stringify({"user_id": this.state.userID, "trip_id": tripID}),
                        headers: {"Content-Type": "application/json"}
                }).then(this.handleRemoveMemberResponse5).catch(this.handleServerError)
    }
    


    addGroupItem = (): void => {
        const url = "/api/add-group-item"
            fetch(url, {method: "POST", 
                    body:JSON.stringify({"item": this.state.groupItem,"trip_id": this.state.trip.tripID, "amountNeeded": this.state.amount}),
                    headers: {"Content-Type": "application/json"}
            }).then(this.handleAddGroupItemResponse).catch(this.handleServerError)
    }
    handleAddGroupItemResponse = (res: Response): void => {
        if (res.status === 200)
        {   
            //console.log("status 200 for adding cost")
            res.json().then(this.handleSetGroupItems)
        }
        else 
        {
            console.log("status for adding cost not 200")
        }
    }

    addExpense = () : void => {
        const url = "/api/add-cost"
            fetch(url, {method: "POST", 
                    body:JSON.stringify({"trip_id": this.state.trip.tripID, "expense": this.state.expense, "whoToPay": this.state.whoToPay, "totalCost": this.state.totalAmount}),
                    headers: {"Content-Type": "application/json"}
            }).then(this.handleAddCostResponse).catch(this.handleServerError)

    }

    
    handleAddCostResponse = (res: Response): void => {
        if (res.status === 200)
        {   
            //console.log("status 200 for adding cost")
            res.json().then(this.handleSetCosts)
        }
        else 
        {
            console.log("status for adding cost not 200")
        }
    }
    handleRemoveMemberResponse5 = (res: Response): void => {
        if (res.status === 200)
        {   
            //console.log("status 200 for adding cost")
            res.json().then(this.handleArchived)
        }
        else 
        {
            console.log("status for adding cost not 200")
        }
    }
    


    handleRemoveCostResponse = (res: Response): void => {
        if (res.status === 200)
        {   
            //console.log("status 200 for removing cost")
            res.json().then(this.handleSetCosts)
        }
        else 
        {
            console.log("status for removing cost not 200")
        }
    }
    handleRemoveItemResponse = (res: Response): void => {
        if (res.status === 200)
        {   
            //console.log("status 200 for removing cost")
            res.json().then(this.handleSetGroupItems)
        }
        else 
        {
            console.log("status for removing item not 200")
        }
    }

    handleSetGroupItems = (vals: any)=> {
        const url4 = "/api/get-all-group-items?trip_id=" + encodeURIComponent(this.state.trip.tripID)
            fetch (url4, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSetGroupItemsResponse).catch(this.handleServerError)
    }
    handleSetVolunteers = (res: Response): void => {
        if (res.status === 200)
        {
            //console.log("successful get costs");
            res.json().then(this.handleVolunteersSet)
        }
    }
    handleSetGroupItemsResponse =(res: Response): void => {
        if (res.status === 200)
        {
            //console.log("successful get costs");
            res.json().then(this.handleGroupitemsSet)
        }
    }

    handleVolunteersSet = (vals: Volunteer[])=> {
        console.log(vals);
        console.log(vals.length);
        this.setState({volunteers: vals});
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// to do
    handleGroupitemsSet = (vals: GroupItem[]) => {
        console.log(vals);
        console.log(vals.length)
        
        this.setState({groupItemList: vals});

        /*
        for (let i = 0; i<vals.length; i++)
        {
            const id = vals[i].id;
            vals[i].volunteers = this.handleAddVolunteers(i, id)
        }
        */

        this.setState({groupItem: ""})
        this.setState({amount: 1})

    }


    
    handleSetCosts = (vals: string) => {
        const url4 = "/api/get-all-costs?trip_id=" + encodeURIComponent(this.state.trip.tripID)
            fetch (url4, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSetCostsResponse).catch(this.handleServerError)
    }
    
    handleToTripResponse2 = (res: Response): void => {
        if (res.status === 200)
        {
            //console.log("successful got member status");
            res.json().then(this.handleSetMemberStatus)
        }
    }
    handleSetMemberStatus = (vals: string) =>
    {
        this.setState({memberStatus: vals});
        //console.log(vals);
        //console.log(this.state.memberStatus);
    }
    handleSetUsersResponse = (res: Response): void => {
        if (res.status === 200)
        {
            //console.log("successful get users");
            res.json().then(this.handleUsersSet)
        }
    }
    handleSetCostsResponse = (res: Response): void => {
        if (res.status === 200)
        {
            //console.log("successful get costs");
            res.json().then(this.handleCostSet)
        }
    }
    handleCostSet = (vals: Expense[]) => {
        //console.log(vals);
        //console.log(vals.length)
        this.setState({expenses: vals});
        let amount = 0;
        for (let i = 0; i<vals.length; i++)
        {
            amount = amount + vals[i].totalCost;
        }
        this.setState({totalCost: amount})
        this.setState({expense: ""})
        this.setState({totalAmount: 0})
        this.setState({whoToPay: ""})

    }

    handleUsersSet = (vals:Members[])=>
    {
        //console.log(vals);
        //console.log(vals.length)
        this.setState({memberList: vals});
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
            //console.log("successful post");
            res.json().then(this.handleCreateTripSet)
        }
    }
    handleCreateTripSet = (vals:number)=> {
        //console.log("Successful!!")
        //console.log(vals);
        this.setState({tripID: vals});
        this.setState({memberStatus:"creator"})

        //console.log(this.state.tripID);
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
        const url2 = "/api/get-all-members?trip_id=" + encodeURIComponent(vals)
            fetch (url2, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSetUsersResponse).catch(this.handleServerError)

        const url = "/api/add-member"
        fetch(url, {method: "POST", 
                    body:JSON.stringify({"user_id": this.state.userID, "trip_id": vals, "status": "creator" }),
                    headers: {"Content-Type": "application/json"}
            }).then(this.handleCreateMemberResponse).catch(this.handleServerError)
    }
    handleRefresh2 = () : void => {
        const url2 = "/api/get-all-invited-trips?user_id=" + encodeURIComponent(this.state.userID);
                fetch (url2, {method:"GET",
                headers: {"Content-Type": "application/json"}
            }).then(this.handleSignInSetResponse2).catch(this.handleServerError)

        const url = "/api/get-all-trips?user_id=" + encodeURIComponent(this.state.userID);
                fetch (url, {method:"GET",
                headers: {"Content-Type": "application/json"}
            }).then(this.handleSignInSetResponse).catch(this.handleServerError)
    }

    ///////////////////////////////////////////////////
    removeMember = (): void => {
        const url = "/api/get-user-id?email=" + encodeURIComponent(this.state.removedEmail)
            fetch (url, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.hanldeSetRemoveMemberResponse).catch(this.handleServerError)
    }
    hanldeSetRemoveMemberResponse= (res: Response) => {
        if (res.status === 200)
        {
            res.json().then(this.removeMember1)
            //console.log("status 200 for removing member ")
        }
        else {
            console.log("not 200 for removing member")
        }
    }
    removeMember1 = (vals: number): void => {
        if (vals<0)
        {
            alert("email is not in the trip")
        }
        else 
        {
            const url = "/api/remove-member"
            fetch(url, {method: "POST", 
                        body:JSON.stringify({"user_id": vals, "trip_id": this.state.trip.tripID}),
                        headers: {"Content-Type": "application/json"}
                }).then(this.handleRemoveMemberResponse2).catch(this.handleServerError)
            //alert ("member removed from trip!")
        }
    }
    handleRemoveMemberResponse2= (res: Response): void => {
        if (res.status === 200)
        {
            //console.log("successful post");
            res.json().then(this.handleSetParamsForRemoval)
        }
    }
    handleSetParamsForRemoval = (vals: any) => {
        this.setState({removedEmail: ""});
        const url2 = "/api/get-all-members?trip_id=" + encodeURIComponent(this.state.trip.tripID)
            fetch (url2, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSetUsersResponse).catch(this.handleServerError)
    }

    /////////////////////////////////////////////


    sendInvite1 = (): void => {
        this.setState({invitedEmail: ""});

        const url = "/api/get-user-id?email=" + encodeURIComponent(this.state.invitedEmail)
            fetch (url, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSetInviteResponse).catch(this.handleServerError)
    }
    handleSetInviteResponse = (res: Response) => {
        if (res.status === 200)
        {
            res.json().then(this.sendInvite)
            //console.log("status 200 for inviting member ")
        }
        else {
            console.log("not 200 for inviting member")
        }
    }
    sendInvite = (vals: number): void => {
        if (vals<0)
        {
            alert("email is not signed up with PlanTogether or email has already been invited")
        }
        else 
        {
            
            const url = "/api/add-member"
            fetch(url, {method: "POST", 
                        body:JSON.stringify({"user_id": vals, "trip_id": this.state.trip.tripID, "status": "invited" }),
                        headers: {"Content-Type": "application/json"}
                }).then(this.handleCreateMemberResponse2).catch(this.handleServerError)
        }
    }


    handleCreateMemberResponse = (res: Response): void => {
        if (res.status === 200)
        {
            //console.log("successful post");
            res.json().then(this.handleCreateMemberSet)
        }
    }
    handleCreateMemberResponse2 = (res: Response): void => {
        if (res.status === 200)
        {
            //console.log("successful post");
            res.json().then(this.handleCreateMemberSet2)
        }
    }
    handleCreateMemberSet2 = (vals: any) => {
        const url2 = "/api/get-all-members?trip_id=" + encodeURIComponent(this.state.trip.tripID)
            fetch (url2, {method: "GET", 
            headers: {"Content-Type": "application/json"}
        }).then(this.handleSetUsersResponse).catch(this.handleServerError)
    }
    handleCreateMemberSet = (vals: number) => {
        //console.log("Successful member creation!");
        //console.log(vals);
        this.setState({memberID: vals});
        this.setState({page: "tripDetails"});

    }


    handleSignIn = (): void => {
        //console.log("got to handle sign in")
        const url = "/api/is-valid?email=" + encodeURIComponent(this.state.email)+ "&password=" + encodeURIComponent(this.state.password);
        fetch (url, {method: "GET", 
        headers: {"Content-Type": "application/json"}
    }).then(this.handleSignInResponse).catch(this.handleServerError)
    }
    handleSignInResponse = (res: Response) => {
        if (res.status === 200)
        {
            res.json().then(this.handleSignInSet)
            //console.log("status 200 for sign in ")
        }
        else {
            console.log("not 200 for sign in ")
        }
    }
    handleSignInSet = (vals:User): void => {
        if (vals.userId <0 )
        {
            alert("Username or Password invalid!");
        }
        else 
        {
            //console.log(vals);
            this.setState({userID: vals.userId});
            this.setState({user: vals.name});

            const url2 = "/api/get-all-invited-trips?user_id=" + encodeURIComponent(vals.userId);
                fetch (url2, {method:"GET",
                headers: {"Content-Type": "application/json"}
            }).then(this.handleSignInSetResponse2).catch(this.handleServerError)

            const url = "/api/get-all-trips?user_id=" + encodeURIComponent(vals.userId);
                fetch (url, {method:"GET",
                headers: {"Content-Type": "application/json"}
            }).then(this.handleSignInSetResponse).catch(this.handleServerError)

            const url3 = "/api/get-all-archived-trips?user_id=" + encodeURIComponent(vals.userId);
                fetch (url3, {method:"GET",
                headers: {"Content-Type": "application/json"}
            }).then(this.handleSignInSetResponse3).catch(this.handleServerError)



            
        }
    }
    

    handleSignInSetResponse = (res: Response): void => 
    {
        if (res.status === 200)
        {
            //console.log("successful get of signing in");
            res.json().then(this.handleSetTrips)
        }
    }
    handleSignInSetResponse2 = (res: Response): void => 
    {
        if (res.status === 200)
        {
            //console.log("successful get of invited trips ");
            res.json().then(this.handleSetTrips2)
        }
    }
    handleSignInSetResponse3 = (res: Response): void => {
        if (res.status === 200)
        {
            //console.log("successful get of invited trips ");
            res.json().then(this.handleSetTrips7)
        }
    }
    handleSetTrips = (vals:any) => {
        this.setState({tripList: vals});
        this.setState({page: "home"});
    }
    handleSetTrips2 = (vals:any) => {
        //console.log("invited trips:")
        //console.log(vals);
        this.setState({invitedTrips: vals});
    }
    handleSetTrips7 = (vals: any) => {
        this.setState({archivedTrips: vals});
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
