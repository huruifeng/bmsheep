import React, { useState } from "react";
import { Container, Row, Col, Card, ListGroup } from "react-bootstrap";
import ViewProfile from "./ViewProfile";
import ResetPassword from "./ResetPassword.jsx";
import JobResults from "./JobResults";
import "./Dashboard.css";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <Container fluid className="dashboard-container">
            <Row>
                {/* Sidebar */}
                <Col md={3} className="sidebar">
                    <Card className="sidebar-card">
                        <Card.Body>
                            <Card.Title className="text-center">Dashboard</Card.Title>
                            <ListGroup variant="flush">
                                <ListGroup.Item
                                    action
                                    active={activeTab === "profile"}
                                    onClick={() => setActiveTab("profile")}
                                >
                                    View Profile
                                </ListGroup.Item>
                                <ListGroup.Item
                                    action
                                    active={activeTab === "reset-password"}
                                    onClick={() => setActiveTab("reset-password")}
                                >
                                    Reset Password
                                </ListGroup.Item>
                                <ListGroup.Item
                                    action
                                    active={activeTab === "job-results"}
                                    onClick={() => setActiveTab("job-results")}
                                >
                                    Check Job Results
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

                {/* Main Content Area */}
                <Col md={9} className="content-area">
                    <Card className="content-card">
                        <Card.Body>
                            {activeTab === "profile" && <ViewProfile />}
                            {activeTab === "reset-password" && <ResetPassword />}
                            {activeTab === "job-results" && <JobResults />}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;
