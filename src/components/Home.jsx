import { useState } from 'react';
import { Row, Col, Card, Button, Offcanvas, Nav } from 'react-bootstrap';
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
            {/* Hamburger Menu Button */}
            <Button 
                variant="light" 
                className="hamburger-btn"
                onClick={handleShowMenu}
            >
                <span className="hamburger-icon">☰</span>
            </Button>

            {/* Offcanvas Sidebar Menu */}
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
                        <Nav.Link as={Link} to="/statistics" onClick={handleCloseMenu}>
                            📊 Statistics
                        </Nav.Link>
                        <Nav.Link as={Link} to="/settings" onClick={handleCloseMenu}>
                            ⚙️ Settings
                        </Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            <div className="main-content">
                <h1 className="text-center mb-4 app-title">Pomodoro Task Manager</h1>
                
                {/* Split Section: Timer and Add Task */}
                <Row className="mb-4 gx-3">
                    {/* Pomodoro Timer Section */}
                    <Col md={6}>
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

                    {/* Add Task Section */}
                    <Col md={6}>
                        <Card className="add-task-card">
                            <Card.Body>
                                <h4 className="add-task-title">➕ Add New Task</h4>
                                <form onSubmit={(e) => e.preventDefault()}>
                                    <div className="mb-3">
                                        <input 
                                            type="text" 
                                            className="form-control task-input"
                                            placeholder="Task title..."
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <Row>
                                            <Col xs={6}>
                                                <input 
                                                    type="text" 
                                                    className="form-control task-input"
                                                    placeholder="Class/Category"
                                                />
                                            </Col>
                                            <Col xs={6}>
                                                <select className="form-select task-input">
                                                    <option>Priority</option>
                                                    <option>High</option>
                                                    <option>Medium</option>
                                                    <option>Low</option>
                                                </select>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mb-3">
                                        <input 
                                            type="number" 
                                            className="form-control task-input"
                                            placeholder="Number of Pomodoro cycles"
                                            min="1"
                                        />
                                    </div>
                                    <Button className="add-task-btn w-100">
                                        Add to Backlog
                                    </Button>
                                </form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                {/* Task Columns */}
                <Row className="task-columns">
                    {/* Backlog Column */}
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

                    {/* Today's Tasks Column */}
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

                    {/* Future Tasks Column */}
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
            </div>
        </div>
    );
}