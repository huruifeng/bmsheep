import React, { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import ViewProfile from "./ViewProfile";
import ResetPassword from "./ResetPassword.jsx";
import JobResults from "./JobResults";
import "./Dashboard.css";

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState("profile");

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                <Card className="sidebar-card">
                    <Card.Body>
                        <Card.Title className="text-center">个人中心</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item
                                action
                                active={activeTab === "profile"}
                                onClick={() => setActiveTab("profile")}
                            >
                                用户信息
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                active={activeTab === "reset-password"}
                                onClick={() => setActiveTab("reset-password")}
                            >
                                重置密码
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                active={activeTab === "job-results"}
                                onClick={() => setActiveTab("job-results")}
                            >
                                查看任务
                            </ListGroup.Item>
                        </ListGroup>
                    </Card.Body>
                </Card>
            </div>

            {/* Main Content Area */}
            <div className="content-area">
                <Card className="content-card">
                    <Card.Body>
                        {activeTab === "profile" && <ViewProfile />}
                        {activeTab === "reset-password" && <ResetPassword />}
                        {activeTab === "job-results" && <JobResults />}
                    </Card.Body>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
