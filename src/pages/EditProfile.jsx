import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/slices/userSlice'
import { TextField, Button } from "@mui/material";
import { AiOutlineEdit } from "react-icons/ai";

const EditProfile = () => {
  const {user} = useSelector((state) => state.user)
  

  const dispatch = useDispatch()

  const [userName, setUserName] = useState(user.name)
  const [profilePic, setProfilePic] = useState(user.profileImage)
  const [newProfileImage, setNewProfileImage] = useState(null)
  const [isSaveEnabled, setIsSaveEnabled] = useState(false)

  const handleNameChange = (e) => {
    setUserName(e.target.value)
    setIsSaveEnabled(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if(file){
      setNewProfileImage(file)
      setProfilePic(URL.createObjectURL(file))
      setIsSaveEnabled(true)
    }
  }

  const handleSaveProfile = async() => {
    try {
      const formData = new FormData();
    formData.append("name", userName)
    if(newProfileImage){
      formData.append("profilePic", newProfileImage)
    }
    const response = await axios.post("http://localhost:4000/editProfile", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      withCredentials: true
    })

    if(response.data.success){
        dispatch(setUser(response.data.user))
    }
    } catch (error) {
      console.error(error)
      console.log("error while updating user details")
    }
    
  }


  return (
    <div className="flex flex-col w-2/5 items-left p-4 space-y-6">
      <div className="flex w-fit items-end">
        <img
          src={profilePic}
          alt="Profile"
          className="w-fit h-24 rounded-full object-contain border"
        />
        <label className="  relative bottom-1 cursor-pointer">
          <AiOutlineEdit className="text-xl text-gray-500" />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      </div>

      <TextField
        label="Name"
        value={userName}
        onChange={handleNameChange}
        fullWidth
        variant="outlined"
      />

      <Button
        variant="contained"
        color="primary"
        disabled={!isSaveEnabled}
        onClick={handleSaveProfile}
      >
        Save Profile
      </Button>
    </div>
  )
}

export default EditProfile