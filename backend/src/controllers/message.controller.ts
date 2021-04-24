import { Request, Response } from 'express'
import Message from '../models/message.models'

const newMessage = (req: Request, res: Response) => {
  if (req.body.name.length > 0 && req.body.message.length > 0 && req.body.date.length > 0) {
    let message = new Message({
      to: req.body.id,
      by: req.body.name,
      number: req.body.number,
      message: req.body.message,
      date: req.body.date
    })
  
    try {
      message
      .save()
      .then((message: any) => {
        return res.status(200).json({
          message: "message send"
        })
      })
      .catch((error: any) => {
        return res.status(400).json({
          messageError: "error"
        })
      })
    } catch (error: any) {
      return res.status(400).json({
        messageError: "an error occurred",
        error
      })
    }
  } else {
    return res.status(400).json({
      messageError: "an error occurred"
    })
  }
}

const getResponses = async (req: Request, res: Response) => {
  if (req.body.id) {
    try {
      const messages = await Message.find({to: req.body.id}).exec()

      if (messages.length > 0) {
        return res.status(200).json({
          messages
        })
      } else {
        return res.status(400).json({
          messageError: "no responses"
        })
      }
    } catch (error) {
      return res.status(400).json({
        messageError: error
      })
    }
  } else {
    return res.status(400).json({
      messageError: "id is required"
    })
  }
}

export default {
  newMessage,
  getResponses
}