import { useState } from "react";
import { Card, Button, Alert, Spinner } from "react-bootstrap";
import "./styles.css";

import { verify_email } from "../api.js"; // Replace with your API call function

const Verify = () => {
    const [code, setCode] = useState(Array(6).fill(""));
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);

    const handleChange = (value, index) => {
        if (!/^\d$/.test(value) && value !== "") return; // Only allow numbers
        const updatedCode = [...code];
        updatedCode[index] = value;
        setCode(updatedCode);

        // Move focus to the next input automatically
        if (value !== "" && index < 5) {
            document.getElementById(`code-input-${index + 1}`).focus();
        }
    };

    const handleBackspace = (index) => {
        if (index > 0 && code[index] === "") {
            document.getElementById(`code-input-${index - 1}`).focus();
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg(null);
        setSuccessMsg(null);

        if (code.some((digit) => digit === "")) {
            setErrorMsg("Please enter all six digits of the verification code.");
            return;
        }

        setLoading(true);

        try {
            const verificationCode = code.join("");
            const responseData = await verify_email({ code: verificationCode }); // Call your API
            if (responseData.success) {
                setSuccessMsg("Your email has been successfully verified.");
                setCode(Array(6).fill(""));
            } else {
                setErrorMsg(responseData.message || "Verification failed.");
            }
        } catch (error) {
            setErrorMsg(error.response?.data?.detail || "Verification failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="verify-container">
            <Card className="verify-card">
                <Card.Body>
                    <Card.Title className="text-center mb-4">Email Verification</Card.Title>
                    <Card.Text className="text-center mb-4">
                        Please enter the verification code sent to your email. <br />The code is valid for 24 hours.
                    </Card.Text>

                    {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
                    {successMsg && <Alert variant="success">{successMsg}</Alert>}

                    <form onSubmit={handleSubmit} className="d-flex flex-column align-items-center">
                        <div className="code-inputs d-flex justify-content-between mb-4">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`code-input-${index}`}
                                    type="text"
                                    className="code-input text-center"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleChange(e.target.value, index)}
                                    onKeyDown={(e) => e.key === "Backspace" && handleBackspace(index)}
                                />
                            ))}
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-50"
                            disabled={loading || code.some((digit) => digit === "")}
                        >
                            {loading ? <Spinner size="sm" animation="border" /> : "Verify"}
                        </Button>
                    </form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Verify;
