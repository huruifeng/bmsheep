import { useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import "./styles.css";
import {useNavigate} from "react-router-dom";
import {login_post} from "../api.js";
import useAuthStore from "../stores/authStore.js";

const Login = () => {
    const navigate = useNavigate();

    const { loginUser, user } = useAuthStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Perform login logic
            const responseData = await login_post(formData);
            const { access_token } = responseData;
            const {message} = responseData;
            if (responseData.success) {
                // Login successful, redirect to the dashboard
                loginUser(access_token);
                if(user.is_verified === false){
                     navigate("/verify");
                } else {
                    navigate("/dashboard");
                }

            } else {
                setError(message || "Login failed. Please check your credentials.");
            }

        } catch (err) {
            setError("An error occurred.", err);
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <Card.Body>
                    <Card.Title className="text-center mb-4">Login</Card.Title>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter your password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" className="w-100">
                            Login
                        </Button>
                        <div className="text-center mt-3">
                            <p>
                                Don&#39;t have an account?{" "}
                                <a href="/register" className="text-decoration-none">
                                    Register
                                </a>
                            </p>
                            <p>
                                <a href="/forgot-password" className="text-decoration-none">
                                    Forgot Password?
                                </a>
                            </p>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Login;
