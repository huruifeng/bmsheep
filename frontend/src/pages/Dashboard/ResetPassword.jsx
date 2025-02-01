import { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { update_password } from "../../api.js"; // Assuming you have this API method
import useAuthStore from "../../stores/authStore.js";

const ChangePassword = () => {
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [passwdError, setPasswdError] = useState(null);
    const [confirmPasswdError, setConfirmPasswdError] = useState(null);
    const [isFormValid, setIsFormValid] = useState(false);

    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);

    // Regular expression for password complexity (upper, lower, number, special, length 8-20)
    const checkPassword = (password) => {
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        return passwordPattern.test(password);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });

        setError(null)

        let passwordValid = true;
        let confirmPasswordValid = true;

        if (name === "newPassword") {
            passwordValid = checkPassword(value);
            setPasswdError(passwordValid ? null : "Password must contain an uppercase letter, a lowercase letter, a number, a special character, and be between 8 and 20 characters.");
        }

        if (name === "confirmPassword") {
            confirmPasswordValid = value === passwordData.newPassword;
            setConfirmPasswdError(confirmPasswordValid ? null : "Password does not match");
        }

        // Enable or disable the submit button based on form validity
        const updatedFromData = { ...passwordData, [name]: value };
        const isFormValid =
            updatedFromData.currentPassword &&
            updatedFromData.newPassword &&
            updatedFromData.confirmPassword &&
            passwordValid && confirmPasswordValid;
        setIsFormValid(isFormValid);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        setError(null);

        try {
            const responseData = await update_password({...passwordData, email: user.email}, token);
            if (responseData.success) {
                setSuccessMessage("Password updated successfully!");
                setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
                setError(null);  // Clear any previous errors
            } else {
                setError(responseData.message || "Error updating password");
                setSuccessMessage(null); // Clear success message in case of error
            }
        } catch (error) {
            setError("Error updating password: " + error.response?.data?.message || "Unknown error");
            setSuccessMessage(null); // Clear success message in case of error
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Card.Title>修改密码</Card.Title>
            {error && <p className="text-danger">{error}</p>}
            {successMessage && <p className="text-success">{successMessage}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="currentPassword"
                        value={passwordData.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="newPassword"
                        value={passwordData.newPassword}
                        onChange={handleChange}
                        required
                    />
                    {passwdError && <p className="text-danger">{passwdError}</p>}
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                        type="password"
                        name="confirmPassword"
                        value={passwordData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                    {confirmPasswdError && <p className="text-danger">{confirmPasswdError}</p>}
                </Form.Group>
                <Button
                    variant="primary"
                    type="submit"
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading ? "Updating..." : "Update Password"}
                </Button>
            </Form>
        </>
    );
};

export default ChangePassword;
