import React, { useState } from "react";
import { Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Box } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CreateInvoiceForm from "./CreateInvoiceForm";

export default function CreateInvoice() {
    const [open, setOpen] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = (items, invoiceNumber, invoiceDate, totalPrice, totalTax, grandTotal) => {
        setOpen(false);
        setInvoiceDetails([...invoiceDetails, { items, invoiceNumber, invoiceDate, totalPrice, totalTax, grandTotal }]);
    };

    const handleSearch = () => {
        // Filter invoice details based on the search term
        const filteredInvoices = invoiceDetails.filter(invoice =>
            invoice.invoiceNumber.toString().includes(searchTerm) || // Search by invoice number
            invoice.invoiceDate.includes(searchTerm) || // Search by invoice date
            invoice.customerName.includes(searchTerm) || // Search by customer name
            searchTerm === '' // Show all invoices if search term is empty
        );
        return filteredInvoices;
    };

    const generateRandomName = () => {
        const names = ['Alice', 'Bob', 'Charlie', 'David', 'Emma', 'Frank', 'Grace', 'Henry', 'Isabella', 'Jack'];
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
    };

    return (
        <div>
            <h3>Invoice</h3>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', flexDIrection: 'row', marginLeft: '12px', marginRight: '12px', margin: '3px' }}>
                <Button sx={{ maxWidth: '90px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} variant="contained" onClick={handleOpen}>Create</Button>
                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', flexDIrection: 'row' }}>
                    <TextField
                        size="small"
                        id="outlined-basic"
                        variant="outlined"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button sx={{ maxWidth: '90px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} variant="contained" onClick={handleSearch}>Search</Button>
                </Box>
            </Box>
            <div>
                <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Invoice No</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Customer Name</TableCell>
                                <TableCell>Total </TableCell>
                                <TableCell>Tax</TableCell>
                                <TableCell>Grand Total</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {handleSearch().map((row, index) => (
                                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                    <TableCell>{row.invoiceNumber}</TableCell>
                                    <TableCell>{row.invoiceDate}</TableCell>
                                    <TableCell>{row.customerName}</TableCell>
                                    <TableCell>{row.totalPrice}</TableCell>
                                    <TableCell>{row.totalTax}</TableCell>
                                    <TableCell>{row.grandTotal}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <Dialog open={open} onClose={() => handleClose([], '', '', 0, 0, 0)}>
                <DialogTitle>Create Invoice</DialogTitle>
                <DialogContent>
                    <CreateInvoiceForm onClose={handleClose} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
