import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FiImage } from "react-icons/fi";
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Button } from "@mui/material";
import AddExpenseDialog from '../components/AddExpenseDialog';
import { AiOutlineEdit } from 'react-icons/ai'; // Edit Icon
import { AiOutlineDelete } from 'react-icons/ai'; // Delete Icon

const Expenses = () => {

  const [expenses, setExpenses] = useState([])
  const [expandedImage, setExpandedImage] = useState(null);
  const [addDialog, setAddDialog] = useState(false);
  const [isEditExpense, setIsEditExpense] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null)

  useEffect(() => {
    getUserExpenses()
  },[])

  const handleImageClick = (src) => {
    setExpandedImage(src);
  };

  const closeImage = () => {
    setExpandedImage(null);
  };

  const openEditExpense = (expense) => {
    setAddDialog(true)
    setIsEditExpense(true)
    setExpenseToEdit(expense)
  }
  

  async function getUserExpenses(){
    try {
        const response = await axios.get("http://localhost:4000/getExpenses",
          {
            headers: {
              'Content-Type': 'application/json'
            },
            withCredentials: true,
          }
        )
        if(response.data.success){
          setExpenses(response.data.data.expenses)
        }
    } catch (error) {
      console.error(error)
      console.log("error fetching user expenses")
    }
  }
  
  const deleteExpense = async(id) => {
    try {
      const response = await axios.post("http://localhost:4000/deleteExpense", 
        {
          expenseId : id
        },
        {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true
        }
      )

      if(response.data.success){
        getUserExpenses()
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleDialogClose = () => {
    setAddDialog(false)
    setIsEditExpense(false)
    setExpenseToEdit(null)
  }

  const handleDialogOpen = () => {
    setExpenseToEdit(null)
    setAddDialog(true)
  }
  return (
    <div className="max-w-4xl mx-auto mt-8">
      <div className='mb-2'>
        <Button  variant='contained' color='primary' onClick={handleDialogOpen}>
          Add Expense 
        </Button>
      </div>
      <div className="grid grid-cols-5 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-t-md">
        <div>Name</div>
        <div>Price</div>
        <div>Date</div>
        <div>Receipt</div>
        <div>Actions</div>
      </div>

      <div className="divide-y divide-gray-300 bg-white shadow-lg">
        {expenses.map((expense, index) => (
          <div
            key={index}
            className="grid grid-cols-5 items-center py-3 px-4 hover:bg-gray-50"
          >
            <div>{expense.expenseName}</div>
            <div>₹{expense.price}</div>
            <div>{new Date(expense.date).toLocaleDateString("en-IN")}</div>
            <div className="flex items-center">
              <FiImage
                className="text-blue-500 cursor-pointer"
                size={20}
                onClick={() => handleImageClick(expense.receipt)}
                title="Expand Receipt"
              />
            </div>
            <div className='flex gap-x-1 justify-center items-center'>
                <AiOutlineEdit onClick={() => openEditExpense(expense)}/>
                <AiOutlineDelete onClick={() => deleteExpense(expense._id)}/>
            </div>
          </div>
        ))}
      </div>

      {expandedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeImage}
        >
          <div className="bg-white p-4 rounded-lg max-w-sm w-full">
            <img
              src={expandedImage}
              alt="Receipt"
              className="w-full h-auto rounded-md"
            />
            <button
              className="mt-4 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              onClick={closeImage}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <AddExpenseDialog
        open={addDialog}
        onClose={handleDialogClose}
        refreshExpenses = {getUserExpenses}
        isEditExpense={isEditExpense}
        expenseToEdit={expenseToEdit}
        setIsEditExpense={setIsEditExpense}
      ></AddExpenseDialog>
    </div>
    
  );
}

export default Expenses