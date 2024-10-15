import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    TextField,
    MenuItem,
    Button,
    Container,
    Grid,
    IconButton,
    Stack
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function EmployeeDetail() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',  // Changed from R_email to email for consistency
        password: '',  // Changed from Password to password (lowercase)
        tel: '',
        role: ''
    });

    const roles = ['employee', "manager", "owner"];

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("Updating:", name, value);
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append('R_username', formData.username);
        formDataToSend.append('R_email', formData.email);
        formDataToSend.append('R_Password', formData.password); // Now it's formData.password
        formDataToSend.append('R_Tel', formData.tel);
        formDataToSend.append('R_Name', formData.role);
    
        console.log('Sending data:', Object.fromEntries(formDataToSend));
    
        try {
            const response = await fetch('http://localhost:3333/addem', { 
                method: 'POST',
                body: formDataToSend
            });
      
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'เกิดข้อผิดพลาดในการเพิ่มพนักงาน');
            }
    
            const data = await response.json();
            if (data.status === 'ok') {
                alert('เพิ่มพนักงานสำเร็จ');
                // Action after adding employee, like redirect or clear form
            } else {
                throw new Error(data.message || 'เกิดข้อผิดพลาดในการเพิ่มพนักงาน');
            }
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <Container maxWidth="md">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <IconButton onClick={() => navigate(-1)}>
                            <ArrowBackIcon />
                        </IconButton>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="ชื่อพนักงาน"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="อีเมล"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="รหัสผ่าน"
                            name="password"  // Lowercase "password" to match state key
                            type="password"
                            value={formData.password}  // Corrected to formData.password
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="เบอร์โทร"
                            name="tel"
                            value={formData.tel}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            select
                            label="ตำแหน่ง"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            fullWidth
                            required
                        >
                            {roles.map((role) => (
                                <MenuItem key={role} value={role}>
                                    {role}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <Stack direction="row" justifyContent="flex-end">
                            <Button type="submit" variant="contained" color="primary">
                                เพิ่มพนักงาน
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default EmployeeDetail;
