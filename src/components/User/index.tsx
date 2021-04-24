import React, { useContext, useEffect, useState } from 'react';
import { Container, Description, Button, Button1 } from './styles';
import image from './kevin.jpeg'
import { Context } from '../../UserProvider';
import { Link, useHistory } from "react-router-dom";
import api from '../../services/api';
import jwtDecode from 'jwt-decode';

const User: React.FC = () => {
  const [user, setUser] = useContext(Context)
  const [profile, setProfile] = useState<any>([])
  const [copy, setCopy] = useState(false)
  const history = useHistory()

  const profileNow = (token: string) => {
    const decoded: any = jwtDecode(token)
    setProfile(decoded)
  }

  useEffect(() => {
    const getUser = async () => {
      await api.post('/user/getUser', {
        id: history.location.pathname.substr(3, history.location.pathname.length)
      }).then((userGet: any) => {
        profileNow(userGet.data.token)
      }).catch((err: any) => {
        history.push('/notfound')
      })
    }

    getUser()
  }, [])

  function fallbackCopyTextToClipboard() {
    var textArea = document.createElement("textarea");
    textArea.value = `localhost:3000/u/${user.id}`;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      var successful = document.execCommand('copy');
      successful ? setCopy(true) : setCopy(false)
    } catch (err) {
      console.error('Fallback: Oops, unable to copy', err);
    }
  
    document.body.removeChild(textArea);
  }

  return (
    <>
      <Container>
        <h1 className="name">
          {profile.name}
        </h1>
        <Description>
          {profile.description}
        </Description>
        {
          profile.id == user.id ? (
            ""
          ) : (
            <Link to={`/f/${profile.id}`}>
              <Button>
                send a message
              </Button>
            </Link>
          )
        }
        <Button1 onClick={fallbackCopyTextToClipboard}>
          {copy ? "copied" : "share profile"}
        </Button1>
    </Container>
    </>
  );
}

export default User;