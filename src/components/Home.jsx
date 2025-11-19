import { useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

export default function Home() {
    const [backlogTasks, setBacklogTasks] = useState([
        { id: 1, title: 'Complete CS 571 Homework', class: 'CS 571', priority: 'High', pomodoroCount: 3 },
        { id: 2, title: 'Read Chapter 5', class: 'History', priority: 'Medium', pomodoroCount: 2 },
        { id: 3, title: 'Math Problem Set', class: 'Math', priority: 'High', pomodoroCount: 4 }
    ]);
    
    const [todayTasks, setTodayTasks] = useState([]);
    const [futureTasks, setFutureTasks] = useState([]);
    const [breakDuration, setBreakDuration] = useState(5);
    const [isTimerActive, setIsTimerActive] = useState(false);

    return (
        <Container fluid className="py-4">
            <h1 className="text-center mb-4">Pomodoro Task Manager</h1>
            
            {/* Timer Controls Section */}
            <Row className="mb-4">
                <Col md={12}>
                    <Card className="bg-light">
                        <Card.Body>
                            <h4>Pomodoro Timer</h4>
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <span>Break Duration: {breakDuration} mins</span>
                                <input 
                                    type="range" 
                                    min="5" 
                                    max="10" 
                                    value={breakDuration}
                                    onChange={(e) => setBreakDuration(e.target.value)}
                                    className="form-range"
                                    style={{ width: '200px' }}
                                />
                            </div>
                            <Button 
                                variant={isTimerActive ? "danger" : "success"}
                                onClick={() => setIsTimerActive(!isTimerActive)}
                            >
                                {isTimerActive ? "Stop Timer" : "Start Timer"}
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Task Columns */}
            <Row>
                {/* Backlog Column */}
                <Col md={4}>
                    <Card className="h-100">
                        <Card.Header className="bg-primary text-white">
                            <h5 className="mb-0">Backlog</h5>
                            <small>All Tasks</small>
                        </Card.Header>
                        <Card.Body style={{ minHeight: '400px', overflowY: 'auto' }}>
                            {backlogTasks.map(task => (
                                <Card key={task.id} className="mb-3 shadow-sm">
                                    <Card.Body>
                                        <Card.Title>{task.title}</Card.Title>
                                        <div className="mb-2">
                                            <span className="badge bg-secondary me-2">{task.class}</span>
                                            <span className={`badge ${task.priority === 'High' ? 'bg-danger' : 'bg-warning'}`}>
                                                {task.priority}
                                            </span>
                                        </div>
                                        <p className="mb-2">🍅 {task.pomodoroCount} cycles (25 mins each)</p>
                                        <Button size="sm" variant="outline-primary">
                                            Move to Today →
                                        </Button>
                                    </Card.Body>
                                </Card>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Today's Tasks Column */}
                <Col md={4}>
                    <Card className="h-100">
                        <Card.Header className="bg-success text-white">
                            <h5 className="mb-0">Today's Tasks</h5>
                            <small>Focus on these today</small>
                        </Card.Header>
                        <Card.Body style={{ minHeight: '400px', overflowY: 'auto' }}>
                            {todayTasks.length === 0 ? (
                                <p className="text-muted text-center mt-4">
                                    Drag tasks here to work on them today
                                </p>
                            ) : (
                                todayTasks.map(task => (
                                    <Card key={task.id} className="mb-3 shadow-sm">
                                        <Card.Body>
                                            <Card.Title>{task.title}</Card.Title>
                                            <div className="mb-2">
                                                <span className="badge bg-secondary me-2">{task.class}</span>
                                                <span className={`badge ${task.priority === 'High' ? 'bg-danger' : 'bg-warning'}`}>
                                                    {task.priority}
                                                </span>
                                            </div>
                                            <p className="mb-2">🍅 {task.pomodoroCount} cycles</p>
                                        </Card.Body>
                                    </Card>
                                ))
                            )}
                        </Card.Body>
                    </Card>
                </Col>

                {/* Future Tasks Column */}
                <Col md={4}>
                    <Card className="h-100">
                        <Card.Header className="bg-info text-white">
                            <h5 className="mb-0">Future Tasks</h5>
                            <small>Upcoming work</small>
                        </Card.Header>
                        <Card.Body style={{ minHeight: '400px', overflowY: 'auto' }}>
                            {futureTasks.length === 0 ? (
                                <p className="text-muted text-center mt-4">
                                    Plan ahead by adding future tasks here
                                </p>
                            ) : (
                                futureTasks.map(task => (
                                    <Card key={task.id} className="mb-3 shadow-sm">
                                        <Card.Body>
                                            <Card.Title>{task.title}</Card.Title>
                                            <div className="mb-2">
                                                <span className="badge bg-secondary me-2">{task.class}</span>
                                                <span className={`badge ${task.priority === 'High' ? 'bg-danger' : 'bg-warning'}`}>
                                                    {task.priority}
                                                </span>
                                            </div>
                                            <p className="mb-2">🍅 {task.pomodoroCount} cycles</p>
                                        </Card.Body>
                                    </Card>
                                ))
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}