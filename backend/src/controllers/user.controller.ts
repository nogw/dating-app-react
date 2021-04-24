import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.models'
import validateRegister from '../validation/validateRegister'
import validateLogin from '../validation/validateLogin'

const register = async (req: Request, res: Response) => {
  const { errors, isValid } = validateRegister(req.body)

  if (!isValid) {
    return res.status(400).json({
      messageError: errors
    })
  }

  try {
    const user = await User.find({ email: req.body.email }).exec()

    if (user.length > 0) {
      return res.status(400).json({
        messageError: "Email already exists"
      })
    }

    return bcrypt.hash(req.body.password, 10, (err: any, hashedPass: any) => {
      if (err) {
        return res.status(400).json({
          messageError: err
        })
      }

      let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
        passwordConfirm: hashedPass,
        description: req.body.description,
        avatarColor: Math.floor(Math.random() * 18) + 1,
      })

      user
        .save()
        .then((user: any) => {
          let token: any = jwt.sign(
            { 
              id: user._id,
              name: user.name,
              description: user.description,
              avatarColor: user.avatarColor
            }, 
            process.env.JWT_SECRET
          )
  
          return res.status(200).json({
            message: 'Login successful',
            token,
          })
        })
        .catch((error: any) => {
          return res.status(400).json({
            messageError: error
          })
        })
    })
  } catch (error: any) {
    return res.status(400).json({
      messageError: error
    })
  }
}

const login = async (req: Request, res: Response) => {
  const { errors, isValid } = validateLogin(req.body)

  if (!isValid) {
    return res.status(400).json(errors)
  }

  try {
    var emailField = req.body.email
    var password = req.body.password

    const user: any = await User.findOne({ email: req.body.email }).exec()

    if (!user) {
      return res.status(400).json({
        email: 'Could not find email.',
      })
    }

    return bcrypt.compare(password, user.password, function (err, result) {
      
      if (err) {
        return res.status(400).json({
          errorMessage: err,
        })
      }
      
      if (result) {
        let token: any = jwt.sign(
          { 
            id: user._id,
	          name: user.name,
            avatarColor: user.avatarColor,
            description: user.description
          }, 
          process.env.JWT_SECRET
        )

        return res.status(200).json({
          message: 'Login successful',
          token,
        })
      } 
      
      else {
        return res.status(400).json({
          message: 'Password does not matched!',
        })
      }

    })
  } catch (err) {
    return res.status(400).json({ message: err })
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const user: any = await User.findById(req.body.id).exec()

    if (user) {
      let token: any = jwt.sign(
        { 
          id: user._id,
          name: user.name,
          avatarColor: user.avatarColor,
          description: user.description
        }, 
        process.env.JWT_SECRET
      )

      return res.status(200).json({
        token,
      })
    } else {
      return res.status(200).json({
        messageError: "User not found ;(",
      })
    }
  } catch (error: any) {
    return res.status(400).json({
      messageError: error
    })
  }
}

export default {
  register,
  login,
  getUser
}