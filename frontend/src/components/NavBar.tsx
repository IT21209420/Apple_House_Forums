import { Container, Nav, Navbar } from "react-bootstrap";
import { Role, User } from "../models/user";
import LoggedInView from "./LoggedInView";
import LoggedOutView from "./LoggedOutView";
import { Link } from "react-router-dom";


interface NavBarProps {
    loggedInUser: User | null,
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
    onLogoutSuccessful: () => void,
}

const NavBar = ({ loggedInUser, onSignUpClicked, onLoginClicked, onLogoutSuccessful }: NavBarProps) => {
    
    return (
        <Navbar bg="primary" variant="dark" expand="sm" sticky="top" margin-botttom="20px" >
            <Container>
                <Navbar.Brand as={Link}to="/" >
               
                    Apple House Forums
               
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-navbar" />
                <Navbar.Collapse id="main-navbar">
                    <Nav>
                        {  
                           loggedInUser?.roles === Role.ADMIN ? <Nav.Link as={Link}to="/tobeApproved">To Be Approved Posts
                           
                       </Nav.Link > : <Nav.Link as={Link} to="/myposts" >
                           My Posts
                           
                        </Nav.Link> 
                        }
                       
                    </Nav>
                    <Nav className="ms-auto">
                        {loggedInUser
                            ? <LoggedInView user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful} />
                            : <LoggedOutView onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked} />
                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;