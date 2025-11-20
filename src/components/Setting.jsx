import { useState } from 'react';
import { Row, Col, Card, Button, Offcanvas, Nav, Container, Form } from 'react-bootstrap';
import { Link } from 'react-router';
import './Home.css';

export default function Settings() {
    const [showMenu, setShowMenu] = useState(false);
    const [selectedBackground, setSelectedBackground] = useState('default');
    const [timerSound, setTimerSound] = useState('bell');
    const [soundVolume, setSoundVolume] = useState(50);
    const [soundEnabled, setSoundEnabled] = useState(true);

    const handleShowMenu = () => setShowMenu(true);
    const handleCloseMenu = () => setShowMenu(false);

    const backgrounds = [
        { id: 'default', name: 'Ocean Blue', gradient: 'linear-gradient(135deg, #0b4f7a 0%, #1a5f8f 100%)' },
        { id: 'sunset', name: 'Sunset Orange', gradient: 'linear-gradient(135deg, #ff6b6b 0%, #ffa500 100%)' },
        { id: 'forest', name: 'Forest Green', gradient: 'linear-gradient(135deg, #134e4a 0%, #14532d 100%)' },
        { id: 'purple', name: 'Purple Dream', gradient: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' },
        { id: 'midnight', name: 'Midnight Dark', gradient: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)' },
        { id: 'cherry', name: 'Cherry Blossom', gradient: 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)' }
    ];

    const sounds = [
        { id: 'bell', name: 'Bell Chime' },
        { id: 'digital', name: 'Digital Beep' },
        { id: 'soft', name: 'Soft Notification' },
        { id: 'chime', name: 'Wind Chime' },
        { id: 'none', name: 'No Sound' }
    ];

    const handleBackgroundChange = (bgId) => {
        setSelectedBackground(bgId);
        const background = backgrounds.find(bg => bg.id === bgId);
        if (background) {
            document.querySelector('.app-container').style.background = background.gradient;
        }
    };

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
                    <h1 className="text-center mb-5 app-title">Settings</h1>

                    <Row className="justify-content-center">
                        <Col lg={10}>
                            {/* Background Theme Settings */}
                            <Card className="settings-card mb-4">
                                <Card.Body>
                                    <h2 className="settings-section-title">🎨 Background Theme</h2>
                                    <p className="settings-description">Choose a background theme that matches your mood</p>
                                    
                                    <Row className="mt-4">
                                        {backgrounds.map(bg => (
                                            <Col md={4} sm={6} key={bg.id} className="mb-3">
                                                <div 
                                                    className={`background-option ${selectedBackground === bg.id ? 'selected' : ''}`}
                                                    onClick={() => handleBackgroundChange(bg.id)}
                                                >
                                                    <div 
                                                        className="background-preview"
                                                        style={{ background: bg.gradient }}
                                                    ></div>
                                                    <p className="background-name">{bg.name}</p>
                                                    {selectedBackground === bg.id && (
                                                        <span className="selected-badge">✓ Selected</span>
                                                    )}
                                                </div>
                                            </Col>
                                        ))}
                                    </Row>
                                </Card.Body>
                            </Card>

                            {/* Audio Settings */}
                            <Card className="settings-card mb-4">
                                <Card.Body>
                                    <h2 className="settings-section-title">🔊 Audio Settings</h2>
                                    <p className="settings-description">Customize timer sounds and notifications</p>

                                    {/* Sound On/Off Toggle */}
                                    <div className="setting-item mb-4">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h5>Enable Sounds</h5>
                                                <p className="text-muted mb-0">Play sound when timer completes</p>
                                            </div>
                                            <Form.Check 
                                                type="switch"
                                                id="sound-toggle"
                                                checked={soundEnabled}
                                                onChange={(e) => setSoundEnabled(e.target.checked)}
                                                className="custom-switch"
                                            />
                                        </div>
                                    </div>

                                    {/* Timer Sound Selection */}
                                    {soundEnabled && (
                                        <>
                                            <div className="setting-item mb-4">
                                                <h5>Timer Sound</h5>
                                                <p className="text-muted">Choose the sound for timer completion</p>
                                                <Form.Select 
                                                    value={timerSound}
                                                    onChange={(e) => setTimerSound(e.target.value)}
                                                    className="sound-select"
                                                >
                                                    {sounds.map(sound => (
                                                        <option key={sound.id} value={sound.id}>
                                                            {sound.name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                <Button 
                                                    variant="outline-primary" 
                                                    size="sm" 
                                                    className="mt-2"
                                                >
                                                    🔊 Test Sound
                                                </Button>
                                            </div>

                                            {/* Volume Control */}
                                            <div className="setting-item">
                                                <h5>Volume</h5>
                                                <p className="text-muted">Adjust notification volume</p>
                                                <div className="d-flex align-items-center gap-3">
                                                    <span>🔈</span>
                                                    <input 
                                                        type="range" 
                                                        min="0" 
                                                        max="100" 
                                                        value={soundVolume}
                                                        onChange={(e) => setSoundVolume(e.target.value)}
                                                        className="volume-slider"
                                                    />
                                                    <span>🔊</span>
                                                    <span className="volume-value">{soundVolume}%</span>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </Card.Body>
                            </Card>

                            {/* Timer Settings */}
                            <Card className="settings-card mb-4">
                                <Card.Body>
                                    <h2 className="settings-section-title">⏱️ Timer Preferences</h2>
                                    <p className="settings-description">Customize your pomodoro session durations</p>

                                    <div className="setting-item mb-3">
                                        <label className="form-label">Work Session Duration (minutes)</label>
                                        <input 
                                            type="number" 
                                            className="form-control timer-input"
                                            defaultValue={25}
                                            min="1"
                                            max="60"
                                        />
                                    </div>

                                    <div className="setting-item mb-3">
                                        <label className="form-label">Short Break Duration (minutes)</label>
                                        <input 
                                            type="number" 
                                            className="form-control timer-input"
                                            defaultValue={5}
                                            min="1"
                                            max="30"
                                        />
                                    </div>

                                    <div className="setting-item">
                                        <label className="form-label">Long Break Duration (minutes)</label>
                                        <input 
                                            type="number" 
                                            className="form-control timer-input"
                                            defaultValue={15}
                                            min="1"
                                            max="60"
                                        />
                                    </div>
                                </Card.Body>
                            </Card>

                            {/* Save Button */}
                            <div className="text-center mb-4">
                                <Button className="save-settings-btn">
                                    💾 Save All Settings
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}