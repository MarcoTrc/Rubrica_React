import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  Nav } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import RouteEnum from '../Enum/RouteEnum';



function Header() {

    // const navigate = useNavigate()

    return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand><img src="https://cdn.pixabay.com/photo/2016/01/03/11/24/gear-1119298_960_720.png" className="App-logo" /></Navbar.Brand>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href={RouteEnum.Home}>Home</Nav.Link>
                        <Nav.Link href={RouteEnum.Inserisci}>Inserisci</Nav.Link>
                        <Nav.Link href={RouteEnum.Contatti}>Contatti</Nav.Link>
                        {/* <Nav.Link onClick={() => navigate(RouteEnum.Home)}>Home</Nav.Link>
                        <Nav.Link onClick={() => navigate(RouteEnum.Inserisci)}>Inserisci</Nav.Link>
                        <Nav.Link onClick={() => navigate(RouteEnum.Contatti)}>Contatti</Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
    )
}
export default Header;

