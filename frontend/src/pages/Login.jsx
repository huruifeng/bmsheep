import { useState } from "react";
import {Form, Button, Card, Alert, Spinner} from "react-bootstrap";
import "./styles.css";
import {useNavigate} from "react-router-dom";
import {login_post, send_code} from "../api.js";
import useAuthStore from "../stores/authStore.js";

const Login = () => {
    const navigate = useNavigate();

    const {user,setToken, login} = useAuthStore();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

     const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const responseData = await login(formData.email, formData.password);
        if (responseData.success) {
          // Login successful, redirect to the dashboard
            const updatedUser = useAuthStore.getState().user;
            if(updatedUser.is_verified === false){
                await send_code({email: updatedUser.email});
                navigate("/verify");
            }else{
                navigate("/dashboard");
            }
        } else {
          setError(responseData.message || "Invalid credentials");
        }
        setLoading(false);
      };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     setLoading(true);
    //     setError(null);
    //     try {
    //         // Perform login logic
    //         const responseData = await login_post(formData);
    //         if (responseData.success) {
    //             const { access_token } = responseData;
    //             // Login successful, redirect to the dashboard
    //             setToken(access_token);
    //
    //             // Wait for Zustand state to update before accessing `user`
    //             setTimeout(async () => {
    //                 const updatedUser = useAuthStore.getState().user;
    //                 console.log("Updated User:", updatedUser);
    //
    //                 if (updatedUser?.is_verified === false) {
    //                     await send_code({email: updatedUser.email});
    //                     navigate("/verify");
    //                 } else {
    //                     navigate("/dashboard");
    //                 }
    //             }, 1000); // Small delay to allow state update
    //
    //         } else {
    //                 setError(responseData.message || "Login failed. Please check your credentials.");
    //         }
    //
    //     } catch (err) {
    //         setError("An error occurred.", err);
    //     }
    //     setLoading(false);
    // };

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

                        <Button type="submit" variant="primary" disabled={loading} className="w-100">
                            {loading ? <Spinner size="sm" animation="border" /> : "Login"}
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
