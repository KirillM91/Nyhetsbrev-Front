import { ChangeEvent, useState } from "react"
import { INewUser } from "../Models/INewUser"
import { postUser } from "../Services/postUser";

export function Register() {

    const [newUser, setNewUser] = useState<INewUser>({
        userName: "",
        email: "",
        password: "",
        newsLetter: false
    }); 

    function handleChange(event: ChangeEvent<HTMLInputElement>) {        
        let name = event.target.name; 
        setNewUser({...newUser, [name]: event.target.value});
    };

    function handleNewsLetter(event: ChangeEvent<HTMLInputElement>) {
        if (event.target.checked) {
            setNewUser({...newUser, newsLetter: true})
        } else {
            setNewUser({...newUser, newsLetter: false})
        }
    }

    function registerAccount() {
        postUser(newUser);
    }

    return(
        <>
            <form>
                <label htmlFor="userName">User Name: </label>
                <input
                    type="text"
                    name="userName"
                    onChange={handleChange} 
                    value={newUser.userName}
                    id="userName"
                />
                <br/>

                <label htmlFor="email">E-Mail: </label>
                <input
                    type="text"
                    name="email"
                    onChange={handleChange} 
                    value={newUser.email}
                    id="email"
                />
                <br/>

                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange} 
                    value={newUser.password}
                    id="password"
                />
                <br/>

                <label htmlFor="newsLetter">I would like to recieve newsletter.</label>
                <input
                    type="checkbox"                    
                    onChange={handleNewsLetter} 
                    id="newsLetter"
                />
                <br/>

            </form>             
            <button onClick={registerAccount}>Register account</button>                      
        </>
    )
}