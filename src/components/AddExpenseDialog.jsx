import React, { useEffect, useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'
import axios from "axios";


const AddExpenseDialog = ({ open, onClose , refreshExpenses, isEditExpense, expenseToEdit}) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      price: "",
      selectedDate :  null
    }
  });
  const [receipt, setReceipt] = useState(null);

  function onSubmit(data){
    if(isEditExpense){
    editExpense(data)
    } else {
    addNewExpense(data)
    }
  }

  const editExpense = async(data) => {
    try {
      const formData = new FormData();
      formData.append("expenseId", expenseToEdit._id)
      formData.append("expenseName", data.name)
      formData.append("price", data.price)
      formData.append("date", data.selectedDate)
      if(receipt){
        formData.append("receiptUpdate", receipt)
      }
      const response = await axios.post("http://localhost:4000/editExpense", formData, {
        headers: {
          "Content-Type" : "multipart/form-data"
        },
        withCredentials: true
      })

      if(response.data.success){
        refreshExpenses()
        setReceipt(null)

        reset()
        onClose()
        
      }
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if(isEditExpense && expenseToEdit){
      reset({
        name: expenseToEdit.expenseName || "",
        price: expenseToEdit.price || "",
        selectedDate: new Date(expenseToEdit.date) || null
      })
    } else {
      reset({
        name: "",
        price: "",
        selectedDate: new Date()
      })
    }
  }, [isEditExpense, expenseToEdit])

  const addNewExpense = async(data) => {
    try {
      const formData = new FormData();
      formData.append("expenseName", data.name)
      formData.append("price", data.price)
      formData.append("date", data.selectedDate)
      if(receipt){
        formData.append("receiptImage", receipt)
      }
      const response = await axios.post("http://localhost:4000/createExpense",formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      if(response.data.success){
        refreshExpenses()
        reset()
        setReceipt(null)
        
        onClose()
      }
    } catch (error) {
      console.error(error)
      console.log("error while adding new expense")
    }
  }

  const handleReceiptChange = (event) => {
    setReceipt(event.target.files[0]);
  };

  return (
    <Dialog open={open} onClose={onClose} className="add-expense-dialog">
      <DialogTitle>{
      isEditExpense ? "Edit Expense" :
      "Add a New Expense"}</DialogTitle>
      <DialogContent>
        <form className="flex w-96 flex-col h-full gap-y-2" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Expense Name*"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            )}
          />

          {/* Price Input */}
          <Controller
            name="price"
            control={control}
            rules={{ required: "Price is required", pattern: { value: /^[0-9]+(\.[0-9]{1,2})?$/, message: "Invalid price format" } }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Price*"
                type="number"
                fullWidth
                margin="normal"
                error={!!errors.price}
                helperText={errors.price ? errors.price.message : ""}
              />
            )}
          />

      <Controller
        name="selectedDate"
        control={control}
        rules={{ required: "Date is required" }}  
        render={({ field }) => (
          <DatePicker
            selected={field.value}
            onChange={(date) => field.onChange(date)} 
            customInput={
              <TextField
                {...field}
                fullWidth
                label="Select Date*"
                variant="outlined"
                size="small" 
                error={!!errors.selectedDate}  
                helperText={errors.selectedDate ? errors.selectedDate.message : ''}
              />
            }
             dateFormat="dd/MM/yyyy"
          />
        )}
      />
       <div className="flex flex-col mt-2">
        <label className="text-xs text-gray-500 mb-2">Upload Receipt</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleReceiptChange}
          className="px-4 py-2 border border-gray-300 rounded-md cursor-pointer"
        />
      </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)} color="primary"> {isEditExpense ? "Update Expense" : "Add Expense"}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddExpenseDialog;
