import { useState, useEffect } from 'react';
import { Row, Col, Card, Button, Offcanvas, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router';
import './Home.css';

export default function Home() {
    //load tasks from localStorage or use defaults
    const [backlogTasks, setBacklogTasks] = useState(() => {
        const saved = localStorage.getItem('backlogTasks');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [todayTasks, setTodayTasks] = useState(() => {
        const saved = localStorage.getItem('todayTasks');
        return saved ? JSON.parse(saved) : [];
    });
    
    const [futureTasks, setFutureTasks] = useState(() => {
        const saved = localStorage.getItem('futureTasks');
        return saved ? JSON.parse(saved) : [];
    });
    
    //load timer settings from localStorage
    const [breakDuration] = useState(() => {
        return parseInt(localStorage.getItem('breakDuration')) || 5;
    });
    
    const [workDuration] = useState(() => {
        return parseInt(localStorage.getItem('workDuration')) || 25;
    });
    
    //timer state
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [timeLeft, setTimeLeft] = useState(workDuration * 60); // in seconds
    const [isBreak, setIsBreak] = useState(false);
    const [cyclesCompleted, setCyclesCompleted] = useState(() => {
        return parseInt(localStorage.getItem('cyclesCompleted')) || 0;
    });
    const [showMenu, setShowMenu] = useState(false);
    
    //form state
    const [taskTitle, setTaskTitle] = useState('');
    const [taskClass, setTaskClass] = useState('');
    const [taskPriority, setTaskPriority] = useState('');
    const [taskPomodoros, setTaskPomodoros] = useState('');

    const backgrounds = [
        { id: 'default', gradient: 'linear-gradient(135deg, #0b4f7a 0%, #1a5f8f 100%)' },
        { id: 'sunset', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)' },
        { id: 'forest', gradient: 'linear-gradient(135deg, #134e4a 0%, #14532d 100%)' },
        { id: 'purple', gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' },
        { id: 'midnight', gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' },
        { id: 'cherry', gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' }
    ];

    const sounds = {
        bell: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3',
        digital: 'https://assets.mixkit.co/active_storage/sfx/2354/2354-preview.mp3',
        soft: 'https://assets.mixkit.co/active_storage/sfx/2870/2870-preview.mp3',
        chime: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'
    };

    //save cycles to localStorage
    useEffect(() => {
        localStorage.setItem('cyclesCompleted', cyclesCompleted.toString());
    }, [cyclesCompleted]);

    //apply saved background on mount
    useEffect(() => {
        const selectedBackground = localStorage.getItem('selectedBackground') || 'default';
        const background = backgrounds.find(bg => bg.id === selectedBackground);
        if (background) {
            document.querySelector('.app-container').style.background = background.gradient;
        }
    }, []);

    //timer countdown effect
    useEffect(() => {
        let interval = null;
        
        if (isTimerActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(prevTime => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0 && isTimerActive) {
            if (isBreak) {
                playNotificationSound();
                setTimeout(() => {
                    alert('Break time is over! Ready to start working again?');
                    setIsBreak(false);
                    setTimeLeft(workDuration * 60);
                    setIsTimerActive(false);
                }, 100);
            } else {
                playNotificationSound();
                setCyclesCompleted(prev => prev + 1);
                setTimeout(() => {
                    const continueBreak = window.confirm('Work session complete! Take a break?');
                    if (continueBreak) {
                        setIsBreak(true);
                        setTimeLeft(breakDuration * 60);
                        setIsTimerActive(true);
                    } else {
                        setIsTimerActive(false);
                        setTimeLeft(workDuration * 60);
                    }
                }, 100);
            }
        }
        
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isTimerActive, timeLeft, isBreak, workDuration, breakDuration]);

    const playNotificationSound = () => {
        const soundEnabled = localStorage.getItem('soundEnabled') === 'true';
        if (!soundEnabled) return;
        
        const timerSound = localStorage.getItem('timerSound') || 'bell';
        const soundVolume = parseInt(localStorage.getItem('soundVolume')) || 50;
        
        if (timerSound !== 'none' && sounds[timerSound]) {
            const audio = new Audio(sounds[timerSound]);
            audio.volume = soundVolume / 100;
            audio.play().catch(err => console.log('Audio play failed:', err));
        }
    };

    const handleStartStopTimer = () => {
        if (isTimerActive) {
            //pause timer
            setIsTimerActive(false);
        } else {
            //start / resume
            setIsTimerActive(true);
            if (timeLeft === 0) {
                setTimeLeft(workDuration * 60);
                setIsBreak(false);
            }
        }
    };

    const handleResetTimer = () => {
        setIsTimerActive(false);
        setTimeLeft(workDuration * 60);
        setIsBreak(false);
        setCyclesCompleted(0);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    //save tasks to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('backlogTasks', JSON.stringify(backlogTasks));
    }, [backlogTasks]);

    useEffect(() => {
        localStorage.setItem('todayTasks', JSON.stringify(todayTasks));
    }, [todayTasks]);

    useEffect(() => {
        localStorage.setItem('futureTasks', JSON.stringify(futureTasks));
    }, [futureTasks]);

    const handleCloseMenu = () => setShowMenu(false);
    const handleShowMenu = () => setShowMenu(true);

    //add new task to backlog
    const handleAddTask = (e) => {
        e.preventDefault();
        
        if (!taskTitle || !taskClass || !taskPriority || !taskPomodoros) {
            alert('Please fill in all fields');
            return;
        }

        const newTask = {
            id: Date.now(),
            title: taskTitle,
            class: taskClass,
            priority: taskPriority,
            pomodoroCount: parseInt(taskPomodoros)
        };

        setBacklogTasks([...backlogTasks, newTask]);
        setTaskTitle('');
        setTaskClass('');
        setTaskPriority('');
        setTaskPomodoros('');
    };

    //move task to Backlog
    const moveToBacklog = (task) => {
        setTodayTasks(todayTasks.filter(t => t.id !== task.id));
        setFutureTasks(futureTasks.filter(t => t.id !== task.id));
        setBacklogTasks([...backlogTasks, task]);
    };

    //move task to Today
    const moveToToday = (task) => {
        setBacklogTasks(backlogTasks.filter(t => t.id !== task.id));
        setFutureTasks(futureTasks.filter(t => t.id !== task.id));
        setTodayTasks([...todayTasks, task]);
    };

    //move task to Future
    const moveToFuture = (task) => {
        setBacklogTasks(backlogTasks.filter(t => t.id !== task.id));
        setTodayTasks(todayTasks.filter(t => t.id !== task.id));
        setFutureTasks([...futureTasks, task]);
    };

    //remove task
    const removeTask = (taskId, column) => {
        if (column === 'backlog') {
            setBacklogTasks(backlogTasks.filter(t => t.id !== taskId));
        } else if (column === 'today') {
            setTodayTasks(todayTasks.filter(t => t.id !== taskId));
        } else if (column === 'future') {
            setFutureTasks(futureTasks.filter(t => t.id !== taskId));
        }
    };

    //sort tasks by priority
    const sortByPriority = (tasks) => {
        const priorityOrder = { 'High': 1, 'Medium': 2, 'Low': 3 };
        return [...tasks].sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    };

    const TaskCard = ({ task, column }) => (
        <Card className="task-card">
            <Card.Body>
                <button 
                    className="remove-task-btn"
                    onClick={() => removeTask(task.id, column)}
                    aria-label="Remove task"
                >
                    ×
                </button>
                <Card.Title className="task-title">{task.title}</Card.Title>
                <div className="mb-2 task-badges">
                    <span className="task-badge class-badge">{task.class}</span>
                    <span className={`task-badge priority-badge priority-${task.priority.toLowerCase()}`}>
                        {task.priority}
                    </span>
                </div>
                <p className="pomodoro-count">🍅 {task.pomodoroCount} cycles × {workDuration} mins</p>
                <div className="task-actions">
                    {column === 'backlog' && (
                        <>
                            <Button size="sm" className="move-btn move-today-btn" onClick={() => moveToToday(task)}>
                                Move to Today
                            </Button>
                            <Button size="sm" className="move-btn move-future-btn" onClick={() => moveToFuture(task)}>
                                Move to Future
                            </Button>
                        </>
                    )}
                    {column === 'today' && (
                        <>
                            <Button size="sm" className="move-btn move-backlog-btn" onClick={() => moveToBacklog(task)}>
                                Move to Backlog
                            </Button>
                            <Button size="sm" className="move-btn move-future-btn" onClick={() => moveToFuture(task)}>
                                Move to Future
                            </Button>
                        </>
                    )}
                    {column === 'future' && (
                        <>
                            <Button size="sm" className="move-btn move-backlog-btn" onClick={() => moveToBacklog(task)}>
                                Move to Backlog
                            </Button>
                            <Button size="sm" className="move-btn move-today-btn" onClick={() => moveToToday(task)}>
                                Move to Today
                            </Button>
                        </>
                    )}
                </div>
            </Card.Body>
        </Card>
    );

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
                        <Nav.Link as={Link} to="/about" onClick={handleCloseMenu}>👤 About</Nav.Link>
                        <Nav.Link as={Link} to="/settings" onClick={handleCloseMenu}>⚙️ Settings</Nav.Link>
                    </Nav>
                </Offcanvas.Body>
            </Offcanvas>

            <div className="main-content">
                <Container>
                    <h1 className="text-center mb-5 app-title">Pomodoro Task Manager</h1>
                    
                    <Row className="justify-content-center">
                        <Col xxl={11} xl={12}>
                            {/* Timer and Add Task Side by Side */}
                            <Row className="mb-4">
                                {/* Timer Section */}
                                <Col md={6} className="mb-4 mb-md-0">
                                    <Card className="section-card h-100">
                                        <Card.Body className="text-center">
                                            <h2 className="section-title">
                                                <span className="section-icon">🍅</span>
                                                Pomodoro Timer
                                            </h2>
                                            <p className="section-description">
                                                {isBreak ? 'Break Time!' : 'Track your focus sessions'}
                                            </p>
                                            
                                            {/* Timer Display */}
                                            <div className="timer-display">
                                                <div className="timer-info-item">
                                                    <label className="timer-label">{isBreak ? 'Break Time' : 'Work Session'}</label>
                                                    <div className={`timer-value ${isTimerActive ? 'timer-active' : ''}`}>
                                                        {isTimerActive || timeLeft !== workDuration * 60 ? formatTime(timeLeft) : `${workDuration} min`}
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            {/* Start/Stop Button */}
                                            <Button 
                                                className={`main-action-btn ${isTimerActive ? 'stop-btn' : ''}`}
                                                onClick={handleStartStopTimer}
                                            >
                                                {isTimerActive ? "⏸ Stop Timer" : "▶ Start Timer"}
                                            </Button>
                                            
                                            {/* Cycle Counter and Reset at Bottom */}
                                            <div className="timer-bottom-row">
                                                <div className="cycle-counter-bottom">
                                                    <span className="cycle-icon">🔄</span>
                                                    <span className="cycle-text">Cycles: </span>
                                                    <span className="cycle-number">{cyclesCompleted}</span>
                                                </div>
                                                
                                                <Button 
                                                    className="reset-btn-bottom"
                                                    onClick={handleResetTimer}
                                                    variant="outline-secondary"
                                                >
                                                    🔄 Reset
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>

                                {/* Add Task Section */}
                                <Col md={6}>
                                    <Card className="section-card h-100">
                                        <Card.Body className="text-center">
                                            <h2 className="section-title">
                                                <span className="section-icon">➕</span>
                                                Add New Task
                                            </h2>
                                            <p className="section-description">Create a task to add to your backlog</p>
                                            
                                            <form onSubmit={handleAddTask} className="task-form">
                                                <div className="form-group">
                                                    <label>Task Title</label>
                                                    <input 
                                                        type="text" 
                                                        className="form-control custom-input"
                                                        placeholder="Enter task title"
                                                        value={taskTitle}
                                                        onChange={(e) => setTaskTitle(e.target.value)}
                                                    />
                                                </div>
                                                
                                                <Row>
                                                    <Col xs={6}>
                                                        <div className="form-group">
                                                            <label>Class</label>
                                                            <input 
                                                                type="text" 
                                                                className="form-control custom-input"
                                                                placeholder="e.g., CS 571"
                                                                value={taskClass}
                                                                onChange={(e) => setTaskClass(e.target.value)}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col xs={6}>
                                                        <div className="form-group">
                                                            <label>Priority</label>
                                                            <select 
                                                                className="form-select custom-input"
                                                                value={taskPriority}
                                                                onChange={(e) => setTaskPriority(e.target.value)}
                                                            >
                                                                <option value="">Select</option>
                                                                <option value="High">High</option>
                                                                <option value="Medium">Medium</option>
                                                                <option value="Low">Low</option>
                                                            </select>
                                                        </div>
                                                    </Col>
                                                </Row>
                                                
                                                <div className="form-group">
                                                    <label>Pomodoro Cycles</label>
                                                    <input 
                                                        type="number" 
                                                        className="form-control custom-input"
                                                        placeholder="Enter cycles"
                                                        min="1"
                                                        value={taskPomodoros}
                                                        onChange={(e) => setTaskPomodoros(e.target.value)}
                                                    />
                                                </div>
                                                
                                                <Button type="submit" className="main-action-btn w-100">
                                                    Add to Backlog
                                                </Button>
                                            </form>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Row>

                            {/* Task Management Section */}
                            <Card className="section-card task-management-card mb-4">
                                <Card.Body className="text-center">
                                    <h2 className="section-title">
                                        <span className="section-icon">📋</span>
                                        Task Management
                                    </h2>
                                    <p className="section-description">Organize your tasks across different categories</p>
                                    
                                    {/* Task Columns */}
                                    <Row className="task-columns-row mt-4">
                                        {/* Backlog Column */}
                                        <Col lg={4} md={6}>
                                            <div className="task-column-wrapper">
                                                <h3 className="column-title backlog-title">📋 Backlog</h3>
                                                <p className="column-subtitle">All Tasks</p>
                                                <div className="tasks-list">
                                                    {sortByPriority(backlogTasks).map(task => (
                                                        <TaskCard key={task.id} task={task} column="backlog" />
                                                    ))}
                                                    {backlogTasks.length === 0 && (
                                                        <div className="empty-state">
                                                            <p className="empty-text">No tasks in backlog</p>
                                                            <div className="empty-icon">📋</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </Col>

                                        {/* Today's Tasks Column */}
                                        <Col lg={4} md={6}>
                                            <div className="task-column-wrapper">
                                                <h3 className="column-title today-title">⭐ Today's Tasks</h3>
                                                <p className="column-subtitle">Focus on these today</p>
                                                <div className="tasks-list">
                                                    {todayTasks.length === 0 ? (
                                                        <div className="empty-state">
                                                            <p className="empty-text">Move tasks here to work on them today</p>
                                                            <div className="empty-icon">📌</div>
                                                        </div>
                                                    ) : (
                                                        sortByPriority(todayTasks).map(task => (
                                                            <TaskCard key={task.id} task={task} column="today" />
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </Col>

                                        {/* Future Tasks Column */}
                                        <Col lg={4} md={6}>
                                            <div className="task-column-wrapper">
                                                <h3 className="column-title future-title">🚀 Future Tasks</h3>
                                                <p className="column-subtitle">Upcoming work</p>
                                                <div className="tasks-list">
                                                    {futureTasks.length === 0 ? (
                                                        <div className="empty-state">
                                                            <p className="empty-text">Plan ahead by adding future tasks here</p>
                                                            <div className="empty-icon">🗓️</div>
                                                        </div>
                                                    ) : (
                                                        sortByPriority(futureTasks).map(task => (
                                                            <TaskCard key={task.id} task={task} column="future" />
                                                        ))
                                                    )}
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}