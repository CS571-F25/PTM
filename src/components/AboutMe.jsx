import { useState } from 'react';
import { Row, Col, Card, Button, Offcanvas, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router';
import './Home.css';

export default function AboutMe() {
    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => setShowMenu(true);
    const handleCloseMenu = () => setShowMenu(false);

    return (
        <div className="app-container">
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
                        <Nav.Link as={Link} to="/" onClick={handleCloseMenu}>🏠 Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" onClick={handleCloseMenu}>👤 About Me</Nav.Link>
                        <Nav.Link as={Link} to="/settings" onClick={handleCloseMenu}>⚙️ Settings</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            <div className="main-content">
                <Container>
                    <h1 className="text-center mb-5 app-title">About the Pomodoro Technique</h1>

                    <Row className="justify-content-center">
                        <Col lg={10}>
                            {/* What is Pomodoro */}
                            <Card className="about-card mb-4">
                                <Card.Body>
                                    <h2 className="about-section-title">🍅 What is the Pomodoro Technique?</h2>
                                    <p className="about-text">
                                        The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s. 
                                        It uses a kitchen timer to break work into focused intervals, traditionally 25 minutes in length, 
                                        separated by short breaks. Each interval is known as a "pomodoro," the Italian word for tomato, 
                                        after the tomato-shaped kitchen timer Cirillo used as a university student.
                                    </p>
                                </Card.Body>
                            </Card>

                            {/* How It Works */}
                            <Card className="about-card mb-4">
                                <Card.Body>
                                    <h2 className="about-section-title">⚙️ How It Works</h2>
                                    <div className="pomodoro-steps">
                                        <div className="step-item">
                                            <span className="step-number">1</span>
                                            <div className="step-content">
                                                <h5>Choose a Task</h5>
                                                <p>Pick a task you want to work on and add it to your list.</p>
                                            </div>
                                        </div>
                                        <div className="step-item">
                                            <span className="step-number">2</span>
                                            <div className="step-content">
                                                <h5>Set the Timer</h5>
                                                <p>Set the timer for 25 minutes and focus completely on your task.</p>
                                            </div>
                                        </div>
                                        <div className="step-item">
                                            <span className="step-number">3</span>
                                            <div className="step-content">
                                                <h5>Work Until the Timer Rings</h5>
                                                <p>Work with full concentration until the timer goes off.</p>
                                            </div>
                                        </div>
                                        <div className="step-item">
                                            <span className="step-number">4</span>
                                            <div className="step-content">
                                                <h5>Take a Short Break</h5>
                                                <p>Take a 5-10 minute break to rest and recharge.</p>
                                            </div>
                                        </div>
                                        <div className="step-item">
                                            <span className="step-number">5</span>
                                            <div className="step-content">
                                                <h5>Repeat</h5>
                                                <p>After 4 pomodoros, take a longer break of 15-30 minutes.</p>
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Benefits */}
                            <Card className="about-card mb-4">
                                <Card.Body>
                                    <h2 className="about-section-title">✨ Benefits for Students</h2>
                                    <Row>
                                        <Col md={6}>
                                            <div className="benefit-item">
                                                <span className="benefit-icon">🎯</span>
                                                <h5>Enhanced Focus</h5>
                                                <p>Short, timed work sessions help maintain concentration and reduce mental fatigue.</p>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="benefit-item">
                                                <span className="benefit-icon">🚫</span>
                                                <h5>Reduces Procrastination</h5>
                                                <p>Breaking tasks into manageable chunks makes starting easier and less overwhelming.</p>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="benefit-item">
                                                <span className="benefit-icon">📈</span>
                                                <h5>Better Time Awareness</h5>
                                                <p>Track how long tasks actually take and improve your time estimation skills.</p>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="benefit-item">
                                                <span className="benefit-icon">💪</span>
                                                <h5>Prevents Burnout</h5>
                                                <p>Regular breaks help maintain energy levels throughout study sessions.</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* About This App */}
                            <Card className="about-card mb-4">
                                <Card.Body>
                                    <h2 className="about-section-title">📱 About This App</h2>
                                    <p className="about-text">
                                        This Pomodoro Task Manager is designed specifically for college students to help you:
                                    </p>
                                    <ul className="app-features">
                                        <li>Organize tasks by class and priority</li>
                                        <li>Plan your daily workload effectively</li>
                                        <li>Track pomodoro cycles for each task</li>
                                        <li>Stay focused with a distraction-free timer</li>
                                        <li>Build better study habits over time</li>
                                    </ul>
                                    <p className="about-text">
                                        Start your journey to more productive study sessions today! 🎓
                                    </p>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}