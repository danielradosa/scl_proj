import { useQuery } from '@apollo/client'
import React from 'react'
import { GET_CURRENT_USER } from '../utils/Queries'

export default function Profile () {
    const{loading,error,data} =useQuery(GET_CURRENT_USER)
    if(loading) return <h2>Profile is loading</h2>
    if(error){
        console.log(error)
    }
  return (
    <div>
        <div>
            <img src={data.getCurrentUser.profilePicture||
                    "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                  width="40px"/>
            <h5>Username:{data.getCurrentUser.username} </h5>
            <h5>Email:{data.getCurrentUser.email} </h5>
            <h5>Handle:{data.getCurrentUser.handle}</h5>
        </div>
        <blockquote>
            <h6>Followers:{data.getCurrentUser.followers} </h6>
            <h6>Followers:{data.getCurrentUser.following} </h6>

        </blockquote>
    </div>
  )
}
