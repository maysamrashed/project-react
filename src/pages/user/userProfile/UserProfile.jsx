import React, { useEffect,useState } from 'react'
import axios from 'axios';

export default function UserProfile() {

  const [profile , setProfile] = useState();

  const ProfileData = async()=>{

    const token = localStorage.getItem('userToken');
    const {data} = await axios.get(`https://ecommerce-node4.onrender.com/user/profile`,{
      headers: {
        Authorization: `Tariq__${token}`,
      },
    });
    setProfile(data);
      console.log("Profile data:",  data);
  }
  useEffect(() => {
    ProfileData();
  }, []);
  return (
    <div className="container mt-5  g-10">
    <h2>User Profile</h2>
    {profile ? (
      <div>
        <p>Username:{profile.user.userName}</p>
        <p>Email: {profile.user.email}</p>
        <p>Role: {profile.user.role}</p>
      </div>

    ) : (
      <p>Loading profile data...</p>
    )}
  </div>
  )
}
