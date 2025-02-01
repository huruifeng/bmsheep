import React, { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import {get_profile} from "../../api.js";
import useAuthStore from "../../stores/authStore.js";

const ViewProfile = () => {
    const [profile, setProfile] = useState({
        email: "",
        full_name: "",
        institution: ""
    });
    const [isEditing, setIsEditing] = useState(false);
    const [user] = useAuthStore((state) => [state.user]);

    const fetchProfile = async () => {
        const responseData = await get_profile(user.email);
         if (responseData.success) {
             const { full_name, institution } = responseData.user;
             setProfile({ email: user.email, full_name, institution });
         }
    };

    useEffect(async () => {
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("/api/profile", { full_name: profile.full_name, institution: profile.institution })
            .then(response => {
                setProfile(response.data);
                setIsEditing(false);
            })
            .catch(error => {
                console.error("Error updating profile", error);
            });
    };

    return (
        <>
                <Card.Title>个人信息</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={profile.email} disabled />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="full_name"
                            value={profile.full_name}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Institution</Form.Label>
                        <Form.Control
                            type="text"
                            name="institution"
                            value={profile.institution}
                            onChange={handleChange}
                            disabled={!isEditing}
                        />
                    </Form.Group>
                    {isEditing ? (
                        <Button variant="primary" type="submit">Save</Button>
                    ) : (
                        <Button variant="secondary" onClick={() => setIsEditing(true)}>Edit</Button>
                    )}
                </Form>
        </>
    );
};

export default ViewProfile;
