import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);

  useEffect(() => {
    getLeadingUsers()
  }, [])

  async function getLeadingUsers(){
    try {
      const response = await axios.get("http://localhost:4000/getLeaderboardUsers")
      if(response.data.success){
        setTopUsers(response.data.data)
      }
    } catch (error) {
      console.error(error)
      console.error("error occured while fetching leading users ")
    }
  }

  return (
    <div className='max-w-2xl mx-auto mt-8'>
      <div className="grid grid-cols-4 bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded-t-md">
        <div>Name</div>
        <div>No. of expenses</div>
        <div>Total Expense</div>
      </div>
      <div className='divide-y divide-gray-300 bg-white shadow-lg'>
        {
          topUsers.map((user) => (
            <div
                        key={user.user._id}
                        className="grid grid-cols-4 items-center py-3 px-4 hover:bg-gray-50"
                      >
                        <div>{user.user.name}</div>
                        <div>{user.user.expenses.length}</div>
                        <div>{user.totalExpense}</div>
                      </div>
          ))
        }
      </div>
    </div>
  )
}

export default Leaderboard