import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IUserLogin } from "../Models/IUserLogin";
import { loginUser } from "../Services/loginUser";

export function Home() {
     
    const [userCredentials, setUserCredentials] = useState<IUserLogin>({
        userName: "",        
        password: ""
    })

    const nav = useNavigate();

    function handleChange(event: ChangeEvent<HTMLInputElement>) {
        let name = event.target.name; 
        setUserCredentials({...userCredentials, [name]: event.target.value});
    }

    function logIn() {

        axios.post("http://localhost:3001/users/login",
        userCredentials,
        {headers: {"content-type": "application/json"}}    
        )
        .then((response) => {
            console.log(response.data);
            if (response.data._id){
                localStorage.setItem("userID", JSON.stringify(response.data._id));
                nav("/user");
            }        
        })
        .catch(error => {
            console.log(error);        
        })        
    }

    return(
        <>
            <form>
                <label htmlFor="userName">User Name: </label>
                <input
                    type="text"
                    name="userName"
                    onChange={handleChange} 
                    value={userCredentials.userName}
                    id="userName"
                />
                <br/>

                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange} 
                    value={userCredentials.password}
                    id="password"
                />
                <br/>
            </form> 
            <button onClick={logIn}>Log In</button>
            <Link to="/user">
                
            </Link>

            <Link to="/register">
                Register account
            </Link>   

                    
        </>
    )
}