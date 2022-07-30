import React,{useState, useEffect} from "react"
import {useDispatch, useSelector} from "react-redux"
import {login} from '../../store/session'
import {useHistory, Redirect} from "react-router-dom"
import './LoginForm.css';

const LoginFormPage = () =>{
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors]= useState([])

    if (sessionUser) return (
        <Redirect to="/" />
    );

    const handleSubmit = (e)=>{
        e.preventDefault();
        let userObj= {
            email,
            password
        }
        dispatch(login(userObj)).catch(async(res)=>{
            const data = await res.json()
            if (data && data.errors) {
                setErrors(data.errors)
            }
        })

    }

    return(
        <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>

    )
}

export default LoginFormPage
