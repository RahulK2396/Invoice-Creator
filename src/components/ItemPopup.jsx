import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Typography } from '@mui/material';

const ItemPopup = ({ open, onClose, onAddItem }) => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [tax, setTax] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'itemName':
        setItemName(value);
        break;
      case 'price':
        setPrice(value);
        break;
      case 'tax':
        setTax(value);
        break;
      case 'quantity':
        setQuantity(value);
        break;
      default:
        break;
    }
  };

  const validateInputs = () => {
    if (itemName.trim() === '') {
      setErrorMessage('Please enter an item name.');
      return false;
    } else if (isNaN(parseFloat(price)) || parseFloat(price) < 0) {
      setErrorMessage('Please enter a valid price.');
      return false;
    } else if (isNaN(parseFloat(tax)) || parseFloat(tax) < 0) {
      setErrorMessage('Please enter a valid tax.');
      return false;
    } else if (isNaN(parseInt(quantity)) || parseInt(quantity) < 0) {
      setErrorMessage('Please enter a valid quantity.');
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleAddItem = () => {
    if (validateInputs()) {
      onAddItem({ itemName, price, tax, quantity });
      setItemName('');
      setPrice('');
      setTax('');
      setQuantity('');
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Item</DialogTitle>
      <DialogContent>
        <TextField
          label="Item Name"
          name="itemName"
          value={itemName}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Price"
          name="price"
          type="number"
          value={price}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Tax (%)"
          name="tax"
          type="number"
          value={tax}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantity"
          name="quantity"
          type="number"
          value={quantity}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
        />
        {errorMessage && (
          <Typography color="error" variant="caption" gutterBottom>
            {errorMessage}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAddItem} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ItemPopup;
