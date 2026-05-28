import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Offcanvas, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router';
import './Home.css';

export default function AboutMe() {
    const [showMenu, setShowMenu] = useState(false);

    const handleShowMenu = () => setShowMenu(true);
    const handleCloseMenu = () => setShowMenu(false);

    const backgrounds = [
        { id: 'default', gradient: 'linear-gradient(135deg, #0b4f7a 0%, #1a5f8f 100%)' },
        { id: 'sunset', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)' },
        { id: 'forest', gradient: 'linear-gradient(135deg, #134e4a 0%, #14532d 100%)' },
        { id: 'purple', gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' },
        { id: 'midnight', gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' },
        { id: 'cherry', gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' }
    ];

    useEffect(() => {
        const selectedBackground = localStorage.getItem('selectedBackground') || 'default';
        const background = backgrounds.find(bg => bg.id === selectedBackground);
        if (background) {
            document.querySelector('.app-container').style.background = background.gradient;
        }
    }, []);

    // Scroll-reveal: add .visible on entry, remove on exit so it replays every scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    } else {
                        entry.target.classList.remove('visible');
                    }
                });
            },
            { threshold: 0.12 }
        );

        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div className="app-container">
            <Button variant="light" className="hamburger-btn" onClick={handleShowMenu}>
                <span className="hamburger-icon">&#9776;</span>
            </Button>

            <Offcanvas show={showMenu} onHide={handleCloseMenu} className="sidebar-menu">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/" onClick={handleCloseMenu}>Home</Nav.Link>
                        <Nav.Link as={Link} to="/about" onClick={handleCloseMenu}>About</Nav.Link>
                        <Nav.Link as={Link} to="/settings" onClick={handleCloseMenu}>Settings</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            <div className="main-content">
                <Container>
                    <h1 className="text-center mb-5 app-title">About the Pomodoro Technique</h1>

                    <Row className="justify-content-center">
                        <Col lg={10}>
                            {/* What is Pomodoro */}
                            <Card className="about-card mb-4 reveal">
                                <Card.Body>
                                    <h2 className="about-section-title">What is the Pomodoro Technique?</h2>
                                    <p className="about-text">
                                        The Pomodoro Technique is a time management method developed by Francesco Cirillo in the late 1980s.
                                        It uses a kitchen timer to break work into focused intervals, traditionally 25 minutes in length,
                                        separated by short breaks. Each interval is known as a "pomodoro," the Italian word for tomato,
                                        after the tomato-shaped kitchen timer Cirillo used as a university student.
                                    </p>
                                </Card.Body>
                            </Card>

                            {/* How It Works */}
                            <Card className="about-card mb-4 reveal">
                                <Card.Body>
                                    <h2 className="about-section-title">How It Works</h2>
                                    <div className="pomodoro-steps">
                                        <div className="step-item reveal reveal-delay-1">
                                            <span className="step-number">1</span>
                                            <div className="step-content">
                                                <h5>Choose a Task</h5>
                                                <p>Pick a task you want to work on and add it to your list.</p>
                                            </div>
                                        </div>
                                        <div className="step-item reveal reveal-delay-2">
                                            <span className="step-number">2</span>
                                            <div className="step-content">
                                                <h5>Set the Timer</h5>
                                                <p>Set the timer for 25 minutes and focus completely on your task.</p>
                                            </div>
                                        </div>
                                        <div className="step-item reveal reveal-delay-3">
                                            <span className="step-number">3</span>
                                            <div className="step-content">
                                                <h5>Work Until the Timer Rings</h5>
                                                <p>Work with full concentration until the timer goes off.</p>
                                            </div>
                                        </div>
                                        <div className="step-item reveal reveal-delay-4">
                                            <span className="step-number">4</span>
                                            <div className="step-content">
                                                <h5>Take a Short Break</h5>
                                                <p>Take a 5-10 minute break to rest and recharge.</p>
                                            </div>
                                        </div>
                                        <div className="step-item reveal reveal-delay-5">
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
                            <Card className="about-card mb-4 reveal">
                                <Card.Body>
                                    <h2 className="about-section-title">Benefits for Students</h2>
                                    <Row>
                                        <Col md={6}>
                                            <div className="benefit-item reveal reveal-delay-1">
                                                <h5>Enhanced Focus</h5>
                                                <p>Short, timed work sessions help maintain concentration and reduce mental fatigue.</p>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="benefit-item reveal reveal-delay-2">
                                                <h5>Reduces Procrastination</h5>
                                                <p>Breaking tasks into manageable chunks makes starting easier and less overwhelming.</p>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="benefit-item reveal reveal-delay-3">
                                                <h5>Better Time Awareness</h5>
                                                <p>Track how long tasks actually take and improve your time estimation skills.</p>
                                            </div>
                                        </Col>
                                        <Col md={6}>
                                            <div className="benefit-item reveal reveal-delay-4">
                                                <h5>Prevents Burnout</h5>
                                                <p>Regular breaks help maintain energy levels throughout study sessions.</p>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* About This App */}
                            <Card className="about-card mb-4 reveal">
                                <Card.Body>
                                    <h2 className="about-section-title">About This Website</h2>
                                    <p className="about-text">
                                        This Pomodoro Task Manager is designed specifically for college students to help you:
                                    </p>
                                    <ol className="app-features">
                                        <li>Organize tasks by class and priority</li>
                                        <li>Plan your daily workload effectively</li>
                                        <li>Track pomodoro cycles for each task</li>
                                        <li>Stay focused with a distraction-free timer</li>
                                        <li>Build better study habits over time</li>
                                    </ol>
                                    <p className="about-text">
                                        Start your journey to more productive study sessions today!
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
