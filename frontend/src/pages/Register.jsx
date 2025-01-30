import { useState } from "react";
import {useNavigate} from "react-router-dom";

import {Form, Button, Card, Alert, Spinner} from "react-bootstrap";
import "./styles.css";

import {useUserStore} from "../stores/UserStore";
import {register_post} from "../api.js";


const Register = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.register);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        password: "",
        institution: "",
        confirmpassword: "",
    });
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoading] = useState(false);

    const [emailError, setEmailError] = useState(null);
    const [passwdError, setPasswdError] = useState(null);
    const [confirmPasswdError, setConfirmPasswdError] = useState(null);

    const [allValid, setAllValid] = useState(false);

    const checkPassword = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        return passwordPattern.test(password);
    };
    const checkEmail = (email) => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Update form data state
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));

        let emailValid = true;
        let passwordValid = true;
        let confirmPasswordValid = true;

        // Check password validity
        if (name === "password") {
            passwordValid = checkPassword(value);
            setPasswdError(
                passwordValid
                    ? null
                    : "Password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be between 8 and 20 characters long."
            );
        }

        // Check email validity
        if (name === "email") {
            emailValid = checkEmail(value);
            setEmailError(emailValid ? null : "Invalid email address");
        }

        if (name === "confirmpassword") {
            confirmPasswordValid = value === formData.password;
            setConfirmPasswdError(
                confirmPasswordValid ? null : "Password does not match"
            );
        }

        // Validate entire form
        const updatedFormData = { ...formData, [name]: value };
        const isFormValid =
            updatedFormData.email &&
            updatedFormData.password &&
            updatedFormData.confirmpassword &&
            updatedFormData.full_name &&
            emailValid &&
            passwordValid &&
            confirmPasswordValid;

        setAllValid(isFormValid);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setErrorMsg(null);

        try {
            const responseData = await register_post({
                full_name: formData.full_name,
                email: formData.email,
                password: formData.password,
                institution: formData.institution
            });
            if (responseData.success) {
                setFormData({ email: "", institution: "", password: "", full_name: "", confirmpassword: "" });
                // setErrorMsg(responseData.message);
                // save user state to zustand store
                setUser(responseData.user);

                // go to the verification page
                navigate("/verify");

            }else{
                setErrorMsg(responseData.message);
            }

        } catch (error) {
            setErrorMsg(error.response?.data?.detail || "Registration failed");
        } finally {
            setLoading(false);
        }

    };

    return (
        <div className="register-container">
            <Card className="register-card">
                <Card.Body>
                    <Card.Title className="text-center mb-4">Register</Card.Title>
                    {errorMsg && <Alert variant={errorMsg.includes("successful") ? "success" : "danger"} className="text-center">{errorMsg}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="full_name" className="mb-3">
                            <Form.Label>Full name</Form.Label>
                            <Form.Control
                                type="text"
                                name="full_name"
                                placeholder="Enter your full name"
                                value={formData.full_name}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="institution" className="mb-3">
                            <Form.Label>Institution</Form.Label>
                            <Form.Control
                                type="text"
                                name="institution"
                                placeholder="Enter your institution"
                                value={formData.institution}
                                onChange={handleChange}
                            />
                        </Form.Group>
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
                            {emailError && (
                                <Form.Text className="text-danger">
                                    {emailError}
                                </Form.Text>
                            )}
                        </Form.Group>
                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                placeholder="Enter a password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {/* Display the error message if it exists */}
                            {passwdError && (
                                <Form.Text className="text-danger">
                                    {passwdError}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="confirmpassword" className="mb-3">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="confirmpassword"
                                placeholder="Re-enter the password"
                                value={formData.confirmpassword}
                                onChange={handleChange}
                                required
                            />
                            {confirmPasswdError && (
                                <Form.Text className="text-danger">
                                    {confirmPasswdError}
                                </Form.Text>
                            )}
                        </Form.Group>

                        <Button type="submit" variant="primary" disabled={loading || !allValid} className="w-100">
                            {loading ? <Spinner size="sm" animation="border" /> : "Register"}
                        </Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Register;
