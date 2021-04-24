import dayjs from 'dayjs';
import React, { useState } from 'react';
import { useHistory } from 'react-router';
import api from '../../services/api';

import { Container, Form } from './styles';

const Message: React.FC = () => {
  const history = useHistory()

  interface IInputs {
    to: string;
    by: string;
    number: string;
    message: string;
  }

  const initializeValue: IInputs = {
    to: history.location.pathname.substr(3, history.location.pathname.length),
    by: "",
    message: "",
    number: "",
  }

  const [form, setForm] = useState(initializeValue)
  const [send, setSend] = useState(false)

  const handleChange = (e: any) => {
    const {value, name} = e.target
    setForm(prev => ({...prev, [name]: value}))
  }

  const sendMessage = () => {
    if (!send) {
      if (form.by.length > 0 && form.message.length > 0) {
        api.post("/message/newMessage", {
          id: form.to,
          name: form.by,
          number: form.number,
          message: form.message,
          date: dayjs().format(`MMMM D, YYYY`)
        })
        .then((res: any) => {
          console.log(res)
          setSend(true)
          setForm(prev => ({...prev, by: ""}))
          setForm(prev => ({...prev, message: ""}))
          setForm(prev => ({...prev, number: ""}))
        })
        .catch((err: any) => {
          console.log(err)
        })
      } else {
        console.log("no no no")
      }
    } else {
      console.log("dnv")
    }
  }

  return (
    <Container>
      <Form send={send}>
          <div className="input">
            <label htmlFor="by">your name</label>
            <input type="text" name="by" value={form.by} onChange={e => handleChange(e)}/>
          </div>
          <div className="input">
            <label htmlFor="name">your cell phone number (optional)</label>
            <input type="text" name="number" value={form.number} onChange={e => handleChange(e)}/>
          </div>
          <div className="input">
            <label htmlFor="message">a message</label>
            <textarea name="message" value={form.message} onChange={e => handleChange(e)}/>
          </div>
          <button onClick={sendMessage}>
            {
              send ? (
                "message sent successfully"
              ) : (
                "send message"
              )
            }
          </button>
        </Form>
    </Container>
  );
}

export default Message;