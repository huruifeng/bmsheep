import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { get_profile, update_profile } from "../../api.js";
import useAuthStore from "../../stores/authStore.js";

const ViewProfile = () => {
    const [profileData, setProfileData] = useState({
        email: "",
        full_name: "",
        institution: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState(null);

    const token = useAuthStore((state) => state.token);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!user?.email || !token) return;

            try {
                const responseData = await get_profile(user.email, token);
                if (responseData.success) {
                    const { full_name = "", institution = "" } = responseData.user; // Default to empty strings
                    setProfileData({ email: user.email, full_name, institution });
                } else {
                    setError(responseData.message || "Failed to fetch profile.");
                }
            } catch (err) {
                setError("Error fetching profile:"+ err);
            }
        };

        fetchProfile();
    }, [user?.email, token]);// Only run when user email or token changes

    const handleChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseData = await update_profile(profileData, token);
            const userData = responseData.user;
            setProfileData({email: userData.email, full_name: userData.full_name, institution: userData.institution});
            setIsEditing(false);
        } catch (error) {
            setError("Error updating profile: " + error.response.data.message);
        }
    };

    return (
        <>
            <Card.Title>个人信息</Card.Title>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={profileData.email} disabled />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                        type="text"
                        name="full_name"
                        value={profileData.full_name}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Institution</Form.Label>
                    <Form.Control
                        type="text"
                        name="institution"
                        value={profileData.institution}
                        onChange={handleChange}
                        disabled={!isEditing}
                    />
                </Form.Group>
                {isEditing ? (
                    <Button variant="primary" type="submit">Save</Button>
                ) : (
                    <Button variant="secondary" onClick={(e) => { e.preventDefault(); setIsEditing(true); }}>Edit</Button>
                )}
            </Form>
        </>
    );
};

export default ViewProfile;
