import React, { useState, useEffect } from 'react';
import { Navbarow } from '../owner/Navbarowcomponent/navbarow/index-ow';
import {
    Button,
    Table as MuiTable,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Typography,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

function Table() {
    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({ tables_number: '', tables_status: 'Available' });
    const [editTable, setEditTable] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(false); // State for delete confirmation
    const [tableToDelete, setTableToDelete] = useState(null); // Holds table to be deleted

    useEffect(() => {
        fetchTables();
    }, []);

    const fetchTables = async () => {
        try {
            const response = await fetch('http://localhost:3333/table');
            const data = await response.json();
            setTables(data);
        } catch (error) {
            console.error('Error fetching tables:', error);
        }
    };

    const handleNewTableInputChange = (e) => {
        const { name, value } = e.target;
        setNewTable({ ...newTable, [name]: value });
    };

    const handleEditTableInputChange = (e) => {
        const { name, value } = e.target;
        setEditTable({ ...editTable, [name]: value });
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3333/table', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newTable),
            });

            if (!response.ok) {
                throw new Error('Failed to create new table');
            }

            setNewTable({ tables_number: '', tables_status: 'Available' });
            fetchTables(); // Refresh table list
        } catch (error) {
            console.error('Error creating table:', error);
        }
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3333/table/${editTable.tables_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editTable),
            });

            if (!response.ok) {
                throw new Error('Failed to update table');
            }

            setEditTable(null);
            fetchTables(); // Refresh table list
        } catch (error) {
            console.error('Error updating table:', error);
        }
    };

    const handleEdit = (table) => {
        setEditTable({ tables_id: table.tables_id, tables_number: table.tables_number, tables_status: table.tables_status });
    };

    const handleDelete = async () => {
        try {
            await fetch(`http://localhost:3333/table/${tableToDelete.tables_id}`, { method: 'DELETE' });
            setConfirmDelete(false);
            setTableToDelete(null);
            fetchTables(); // Refresh table list after deleting
        } catch (error) {
            console.error('Error deleting table:', error);
        }
    };

    const openConfirmDeleteDialog = (table) => {
        setTableToDelete(table);
        setConfirmDelete(true);
    };

    const closeConfirmDeleteDialog = () => {
        setTableToDelete(null);
        setConfirmDelete(false);
    };

    return (
        <div>
            <Navbarow />
            <Container
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100vh',
                    textAlign: 'center',
                }}
            >

                <Typography variant="h4" style={{ padding: '20px' }}>บริหารจัดการโต๊ะ</Typography>

                {/* Create New Table Form */}
                <Typography variant="h6">สร้างโต๊ะใหม่</Typography>
                <form
                    onSubmit={handleCreateSubmit}
                    style={{display: 'flex', alignItems: 'center', padding: '20px' }}
                >
                    
                    <TextField
                        label="Table Number"
                        name="tables_number"
                        value={newTable.tables_number}
                        onChange={handleNewTableInputChange}
                        required
                        style={{ width: '250px', paddingRight: '20px'}}
                    />
                    <FormControl style={{ minWidth: 250 }}>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="tables_status"
                            value={newTable.tables_status}
                            onChange={handleNewTableInputChange}
                            required
                        >
                            <MenuItem value="Available">Available</MenuItem>
                            <MenuItem value="Reserved">Reserved</MenuItem>
                        </Select>
                    </FormControl>
                    <Button type="submit" variant="contained" color="primary" style={{ margin: '10px' }}>
                        Add Table
                    </Button>
                </form>

                {/* Edit Table Form (Shown only when editing) */}
                {editTable && (
                    <form
                        onSubmit={handleEditSubmit}
                        style={{ alignItems:'center',position:'relative' }}
                    >
                        <IconButton
                            onClick={() => setEditTable(null)}
                            style={{ position: 'absolute', top: '15px', right: '-10px' }}
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6" style={{ paddingTop:'20px',paddingBottom: '20px' }}>แก้ไขโต๊ะ</Typography>
                        <TextField
                            label="Table Number"
                            name="tables_number"
                            value={editTable.tables_number}
                            onChange={handleEditTableInputChange}
                            required
                            style={{width: '250px', paddingRight: '20px' }}
                        />
                        <FormControl style={{ minWidth: 250, marginBottom: '10px' }}>
                            <InputLabel>Status</InputLabel>
                            <Select
                                name="tables_status"
                                value={editTable.tables_status}
                                onChange={handleEditTableInputChange}
                                required
                            >
                                <MenuItem value="Available">Available</MenuItem>
                                <MenuItem value="Reserved">Reserved</MenuItem>
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary" style={{margin:"10px"}}>
                            Update Table
                        </Button>
                    </form>
                )}

                {/* Table List */}
                <MuiTable style={{ marginTop: '20px', maxWidth: '500px' }}>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Number</TableCell>
                            <TableCell align="center">Status</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tables.map((table) => (
                            <TableRow key={table.tables_id}>
                                <TableCell align="center">{table.tables_id}</TableCell>
                                <TableCell align="center">{table.tables_number}</TableCell>
                                <TableCell align="center">{table.tables_status}</TableCell>
                                <TableCell align="center">
                                    <IconButton onClick={() => handleEdit(table)}>
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton onClick={() => openConfirmDeleteDialog(table)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </MuiTable>

                {/* Confirm Delete Dialog */}
                <Dialog
                    open={confirmDelete}
                    onClose={closeConfirmDeleteDialog}
                >
                    <DialogTitle>Confirm Deletion</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ต้องการลบโต๊ะทิ้งหรือไม่ "{tableToDelete?.tables_number}"?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={closeConfirmDeleteDialog} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleDelete} color="secondary">
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </Container>
        </div>
    );
}

export default Table;
