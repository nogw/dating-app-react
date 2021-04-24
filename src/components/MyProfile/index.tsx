import jwtDecode from 'jwt-decode';
import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../../services/api';
import { Context } from '../../UserProvider';
import { Container, Button1 } from './styles';

const MyProfile: React.FC = () => {
  const [user, setUser] = useContext(Context)
  const [response, setResponse] = useState([])
  const [copy, setCopy] = useState(false)
  const history = useHistory()
  
  useEffect(() => {
    const getUser = async () => {
      await api.post('/message/getResponses', {
        id: user.id
      })
      .then((res: any) => {
        setResponse(res.data.messages)
      })
      .catch((err: any) => {
        console.log(err)
      })
    }

    if (user.id) {
      getUser()
    }
  }, [user])

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
    <Container>
      <h1>{user.name}</h1>
      <p>{user.description}</p>
      <Button1 onClick={fallbackCopyTextToClipboard}>
        {copy ? "copied" : "share profile"}
      </Button1>

      <div className="responses">
        {
          response.map((res: any) => {
            return (
              <div className="messageContainer">
                <div className="title">
                  <h1>{res.by}</h1>
                  <h1>{res.date}</h1>
                </div>
                <div className="num">
                  <p>- {res.number ? res.number : "number not informed"}</p>
                </div>
                <div className="message">
                  {res.message}
                </div>
              </div>
            )
          })
        }
      </div>
    </Container>
  );
}

export default MyProfile;