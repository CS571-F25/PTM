import { useState } from 'react';
import { Container, Row, Col, Card, Button, Offcanvas, Nav } from 'react-bootstrap';
import { Link } from 'react-router';
import './Home.css';

export default function Home() {
    const [backlogTasks, setBacklogTasks] = useState([
        { id: 1, title: 'Complete CS 571 Homework', class: 'CS 571', priority: 'High', pomodoroCount: 3 },
        { id: 2, title: 'Read Chapter 5', class: 'History', priority: 'Medium', pomodoroCount: 2 }
    ]);
    
    const [todayTasks, setTodayTasks] = useState([]);
    const [futureTasks, setFutureTasks] = useState([]);
    const [breakDuration, setBreakDuration] = useState(5);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    return (
        <div className="app-container">
            <Button 
                variant="light" 
                className="hamburger-btn"
                onClick={handleShowMenu}
            >
                <span className="hamburger-icon">☰</span>
            </Button>

            <Offcanvas show={showMenu} onHide={handleCloseMenu} className="sidebar-menu">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menu</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Nav className="flex-column">
                        <Nav.Link as={Link} to="/" onClick={handleCloseMenu}>
                            🏠 Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/about" onClick={handleCloseMenu}>
                            👤 About Me
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            <Container fluid className="py-4 main-content">
                <h1 className="text-center mb-4 app-title">Pomodoro Task Manager</h1>
                <Row className="mb-4">
                    <Col md={12}>
                        <Card className="timer-card">
                            <Card.Body>
                                <h4 className="timer-title">🍅 Pomodoro Timer</h4>
                                <div className="d-flex align-items-center gap-3 mb-3 flex-wrap">
                                    <span className="break-label">Break Duration: <strong>{breakDuration} mins</strong></span>
                                    <input 
                                        type="range" 
                                        min="5" 
                                        max="10" 
                                        value={breakDuration}
                                        onChange={(e) => setBreakDuration(e.target.value)}
                                        className="custom-range"
                                    />
                                </div>
                                <Button 
                                    className={`timer-btn ${isTimerActive ? 'active' : ''}`}
                                    onClick={() => setIsTimerActive(!isTimerActive)}
                                >
                                    {isTimerActive ? "⏸ Stop Timer" : "▶ Start Timer"}
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <Row className="task-columns">
                    <Col lg={4} md={6} className="mb-4">
                        <Card className="task-column backlog-column">
                            <Card.Header>
                                <h5 className="mb-0">📋 Backlog</h5>
                                <small>All Tasks</small>
                            </Card.Header>
                            <Card.Body>
                                {backlogTasks.map(task => (
                                    <Card key={task.id} className={`task-card ${task.priority.toLowerCase()}-priority`}>
                                        <Card.Body>
                                            <Card.Title className="task-title">{task.title}</Card.Title>
                                            <div className="mb-2 task-badges">
                                                <span className="task-badge class-badge">{task.class}</span>
                                                <span className="task-badge priority-badge">
                                                    {task.priority}
                                                </span>
                                            </div>
                                            <p className="pomodoro-count">🍅 {task.pomodoroCount} cycles × 25 mins</p>
                                            <Button size="sm" className="move-btn">
                                                Move to Today →
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4} md={6} className="mb-4">
                        <Card className="task-column today-column">
                            <Card.Header>
                                <h5 className="mb-0">⭐ Today's Tasks</h5>
                                <small>Focus on these today</small>
                            </Card.Header>
                            <Card.Body>
                                {todayTasks.length === 0 ? (
                                    <div className="empty-state">
                                        <p className="empty-text">
                                            Drag tasks here to work on them today
                                        </p>
                                        <div className="empty-icon">📌</div>
                                    </div>
                                ) : (
                                    todayTasks.map(task => (
                                        <Card key={task.id} className={`task-card ${task.priority.toLowerCase()}-priority`}>
                                            <Card.Body>
                                                <Card.Title className="task-title">{task.title}</Card.Title>
                                                <div className="mb-2 task-badges">
                                                    <span className="task-badge class-badge">{task.class}</span>
                                                    <span className="task-badge priority-badge">
                                                        {task.priority}
                                                    </span>
                                                </div>
                                                <p className="pomodoro-count">🍅 {task.pomodoroCount} cycles</p>
                                            </Card.Body>
                                        </Card>
                                    ))
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                    
                    <Col lg={4} md={6} className="mb-4">
                        <Card className="task-column future-column">
                            <Card.Header>
                                <h5 className="mb-0">🚀 Future Tasks</h5>
                                <small>Upcoming work</small>
                            </Card.Header>
                            <Card.Body>
                                {futureTasks.length === 0 ? (
                                    <div className="empty-state">
                                        <p className="empty-text">
                                            Plan ahead by adding future tasks here
                                        </p>
                                        <div className="empty-icon">🗓️</div>
                                    </div>
                                ) : (
                                    futureTasks.map(task => (
                                        <Card key={task.id} className={`task-card ${task.priority.toLowerCase()}-priority`}>
                                            <Card.Body>
                                                <Card.Title className="task-title">{task.title}</Card.Title>
                                                <div className="mb-2 task-badges">
                                                    <span className="task-badge class-badge">{task.class}</span>
                                                    <span className="task-badge priority-badge">
                                                        {task.priority}
                                                    </span>
                                                </div>
                                                <p className="pomodoro-count">🍅 {task.pomodoroCount} cycles</p>
                                            </Card.Body>
                                        </Card>
                                    ))
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}