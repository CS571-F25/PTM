import { useState } from 'react';
import { Row, Col, Card, Button, Offcanvas, Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import './Home.css';

export default function Settings (props) {
    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => setShowMenu(true);
    const handleCloseMenu = () => setShowMenu(false);

    return <div>
        {/* Hamburger Menu Button */}
        <Button variant="light" className="hamburger-btn" onClick={handleShowMenu}>
            <span className="hamburger-icon">☰</span>
        </Button>

        {/* Offcanvas Sidebar Menu */}
        <Offcanvas show={showMenu} onHide={handleCloseMenu} className="sidebar-menu">
            <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column">
                    <Nav.Link as={Link} to="/" onClick={handleCloseMenu}> 🏠 Home </Nav.Link>
                    <Nav.Link as={Link} to="/about" onClick={handleCloseMenu}> 👤 About Me </Nav.Link>
                    <Nav.Link as={Link} to="/settings" onClick={handleCloseMenu}> ⚙️ Settings </Nav.Link>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    </div>
}