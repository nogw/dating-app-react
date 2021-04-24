import React, { useContext, useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group'
import { Container } from './styles';
import jwtDecode from 'jwt-decode';
import  { Redirect, useHistory } from 'react-router-dom'
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../../services/api';
import { Context } from '../../UserProvider';


const Login: React.FC = () => {   
  interface IInputs {
    email: string;
    password: string;
    username: string;
    emailRegister: string;
    passwordRegister: string;
    passwordRegisterConfirm: string;
    description: string;
  }

  const initializeValue: IInputs = {
      email: "",
      password: "",
      username: "",
      emailRegister: "",
      passwordRegister: "",
      passwordRegisterConfirm: "",
      description: "",
  }

  const [MenuNow, setMenuNow] = useState('login')
  const [inputs, setInputs] = useState(initializeValue)
  const [isLoading, setIsLoading] = useState(false)
  const [errorsLogin, setErrorsLogin] = useState("")
  const [errorsReg, setErrorsReg] = useState("")
  const [user, setUser] = useContext(Context)

  let history = useHistory()

  const handleChange = (e: any) => {
    const {name, value} = e.target
    setInputs(prev => ({...prev, [name]: value}))
  }

  useEffect(() => {
    setErrorsLogin("")
    setErrorsReg("")
  }, [MenuNow])

  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  const handleCreateAccount = () => {
    setIsLoading(true)
    if (inputs.username.length <= 2) {
      setIsLoading(false)      
      setErrorsReg('name is lower')
    }
    if (!re.test(String(inputs.emailRegister).toLowerCase())) {
      setIsLoading(false)      
      setErrorsReg('email is not valid')
    }
    if (inputs.passwordRegister.length <= 7) {
      setIsLoading(false)      
      setErrorsReg('minimum of seven characters in password')
    }
    if (inputs.passwordRegisterConfirm.length <= 7) {
      setIsLoading(false)      
      setErrorsReg('minimum of seven characters in password')
    }
  
    if (inputs.username.length > 2 && inputs.passwordRegister.length > 7 && re.test(String(inputs.emailRegister).toLowerCase())) {
      const newUser = async () => {
        await api.post('/user/register', {
          name: inputs.username,
          email: inputs.emailRegister,
          password: inputs.passwordRegister,
          passwordConfirm: inputs.passwordRegisterConfirm,
          description: inputs.description,
        })
        .then((user) => {
          const decoded: any = jwtDecode(user.data.token)

          localStorage.setItem('jwt', JSON.stringify(user.data.token));
          
          setUser(decoded)

          history.push("/")
        })
        .catch((err) => {
          err.response.data.messageError.passwordConfirm ? (
            setErrorsReg(err.response.data.messageError.passwordConfirm)
          ) : (
            setErrorsReg(err.response.data.messageError)
          )
          setIsLoading(false)
        })
      }

      newUser()
    }
  }

  const handleLogin = () => {
    if (!re.test(String(inputs.email).toLowerCase())) {
      setErrorsLogin('email is not valid')
      setIsLoading(false)
    }
    if (inputs.password.length <= 7) {
      setErrorsLogin('minimum of seven characters in password')
      setIsLoading(false)
    }
  
    if (inputs.password.length > 7 && re.test(String(inputs.email).toLowerCase())) {
      setIsLoading(true)

      const Login = async () => {
        await api.post('/user/login', {
          email: inputs.email,
          password: inputs.password,
        })
        .then((user) => {
          const decoded: any = jwtDecode(user.data.token)

          localStorage.setItem('jwt', JSON.stringify(user.data.token));
          
          setUser(decoded)

          console.log(decoded)

          history.push(`/u/${decoded.id}`)
        })
        .catch(err => {
          console.log(err.response.data)
          setErrorsLogin(err.response.data.messageError)
          setIsLoading(false)
        })
      }  

      Login()
    } else {
      console.log("ha")
    }
  }

  return (
    <Container>
      {
        isLoading ? (
          <CircularProgress/>
        ) : (
          <>
            <CSSTransition 
              in={MenuNow === 'login'}
              unmountOnExit 
              timeout={500} 
              classNames="menu-primary"
            >
              <main>
                <div className="input">
                  <label htmlFor="email">EMAIL</label>
                  <input type="text" name="email" onChange={handleChange} value={inputs.email}/>
                </div>
                <div className="input">
                  <label htmlFor="password">PASSWORD</label>
                  <input type="password" name="password" onChange={handleChange} value={inputs.password}/>
                </div>
                <button onClick={handleLogin}>Login</button>
                <p>Need an account? <span onClick={() => setMenuNow('register')}>Register</span></p>
                {
                  errorsLogin && (
                    <div className="error">
                      {errorsLogin}
                    </div>
                  )
                }
              </main>
            </CSSTransition>
            <CSSTransition 
              in={MenuNow === 'register'}
              unmountOnExit 
              timeout={500} 
              classNames="menu-primary"
            >
              <main>
                <div className="input">
                  <label htmlFor="username">USERNAME</label>
                  <input type="text" name="username"  onChange={handleChange} value={inputs.username}/>
                </div>
                <div className="input">
                  <label htmlFor="email">EMAIL</label>
                  <input type="text" name="emailRegister"  onChange={handleChange} value={inputs.emailRegister}/>
                </div>
                <div className="input">
                  <label htmlFor="password">PASSWORD</label>
                  <input type="password" name="passwordRegister" onChange={handleChange} value={inputs.passwordRegister}/>
                </div>
                <div className="input">
                  <label htmlFor="passwordRegisterConfirm">PASSWORD CONFIRM</label>
                  <input type="password" name="passwordRegisterConfirm" onChange={handleChange} value={inputs.passwordRegisterConfirm}/>
                </div>
                <div className="input">
                  <label htmlFor="passwordRegisterConfirm">YOUR DESCRIPTION</label>
                  <textarea name="description" onChange={handleChange} value={inputs.description}/>
                </div>

                <button onClick={handleCreateAccount}>Continue</button>
                <p><span onClick={() => setMenuNow('login')}>Already have an account?</span></p>
              
                {
                  errorsReg && (
                    <div className="error">
                      {errorsReg}
                    </div>
                  )
                }
              </main>
            </CSSTransition>
          </>
        )  
    }
    </Container>
  )
}

export default Login;