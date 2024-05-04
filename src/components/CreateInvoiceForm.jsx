// CreateInvoiceForm.jsx
import React, { useState } from 'react';
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import ItemPopup from './ItemPopup';

const CreateInvoiceForm = ({ onClose }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [openItemPopup, setOpenItemPopup] = useState(false);
  const [items, setItems] = useState([]);
  const [itemIdCounter, setItemIdCounter] = useState(1);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState(''); 

  const calculateSubtotal = (price, tax, quantity) => {
    const total = price * quantity;
    const totalTax = (total * tax) / 100;
    return total + totalTax;
  };

  const calculateTotalTax = () => {
    return items.reduce((totalTax, item) => totalTax + ((item.price * item.quantity * item.tax) / 100), 0);
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleAddItem = (item) => {
    const subTotal = calculateSubtotal(item.price, item.tax, item.quantity);
    setItems([...items, { ...item, subTotal, itemId: itemIdCounter }]);
    setItemIdCounter(itemIdCounter + 1);
  };

  const handleSave = () => {
    const totalPrice = calculateTotalPrice();
    const totalTax = calculateTotalTax();
    const grandTotal = totalPrice + totalTax;
    onClose(items, invoiceNumber, invoiceDate, totalPrice, totalTax, grandTotal); // Passing customerName to onClose

  };

  return (
    <div>
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'space-between', flexDIrection:'row', marginLeft:'12px',marginRight:'12px', margin:'3px' }}>
      <div>
        Invoice No:
        <TextField
          hiddenLabel
          id="invoice-number"
          value={invoiceNumber}
          onChange={(e) => setInvoiceNumber(e.target.value)}
          variant="filled"
          size="small"
        />
      </div>
      <div>
        Date :
        <input type="date" value={invoiceDate} onChange={(e) => setInvoiceDate(e.target.value)} />
      </div>
      </Box>
      
      <Button disabled={!invoiceNumber || !invoiceDate} sx={{float:'right', marginBottom:'30px'}} variant="contained" onClick={() => setOpenItemPopup(true)}>Add</Button>
      <ItemPopup open={openItemPopup} onClose={() => setOpenItemPopup(false)} onAddItem={handleAddItem} />
      <TableContainer component={Paper}>
        <Table  aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Item ID</TableCell>
              <TableCell>Item Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Tax</TableCell>
              <TableCell>Sub Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length ? items.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.itemId}</TableCell>
                <TableCell>{item.itemName}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.tax}</TableCell>
                <TableCell>{item.subTotal}</TableCell>
              </TableRow>
            )) :<p style={{textAlign:'center'}}>No Data Available </p>}
          </TableBody>
        </Table>
      </TableContainer>
      <Box  sx={{float:'right',display:'flex', flexDirection:'column',marginTop:'8px',gap:'5px'}}>
      <div>
        Total Price : {calculateTotalPrice()}
      </div>
      <div>
        Total Tax : {calculateTotalTax()}
      </div>
      <div>
        Grand Total : {calculateTotalPrice() + calculateTotalTax()}
      </div>
      <Button disabled={!items.length} variant="contained" onClick={handleSave}>Save</Button>
      </Box>
    </div>
  );
};

export default CreateInvoiceForm;
