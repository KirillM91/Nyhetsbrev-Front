import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { IUser } from "../Models/IUser"

export function UserPage() {

   
    const [user, setUser] = useState<IUser>({
        _id: "",
        userName: "",
        email: "",    
        newsLetter: false
    })

    const patchUser = {
        _id: JSON.parse(localStorage.getItem("userID") || ""), 
        newsLetter: false
    }

    const nav = useNavigate();

    let userID = {
            _id: JSON.parse(localStorage.getItem("userID") || "")
        }   
    useEffect(() => {

        axios.post("http://localhost:3001/users/userinfo",
        userID,
        {headers: {"content-type": "application/json"}}    
        )
        .then(async (response) => {
            
            let fetchedUser = await response.data
            setUser(fetchedUser)                   
                      
        }) 
        
    }, [])  

    useEffect(() => {
        patchUser.newsLetter = user.newsLetter
    },[user])
    

   
    function subUnsubNewsletter () {
        setUser({...user, newsLetter: !user.newsLetter})
       
        patchUser.newsLetter = !patchUser.newsLetter
        console.log(patchUser);
        
        axios.patch("http://localhost:3001/users/changenewsletter",
        patchUser,
        {headers: {"content-type": "application/json"}}        
        )
        .then(response => {
            console.log(response);            
        })
    }

    function logOut() {
        localStorage.removeItem("userID")
        nav("/")
    }

    return(
        <>                
            <h2>Welcome {user.userName}</h2>
            <p>{user.email}</p>
            {user.newsLetter && <p>News - Subscribed</p>}
            {user.newsLetter && <div><p>Unsubscribe from the newsletter</p> <button onClick={subUnsubNewsletter}>Unsubscribe</button></div>}

            {!user.newsLetter && <p>News - Not Subscribed</p>}
            {!user.newsLetter && <div><p>Subscribe to the newsletter</p> <button onClick={subUnsubNewsletter}>Subscribe</button></div>}

            <button onClick={logOut}>Log out</button>
        </>
    )
}