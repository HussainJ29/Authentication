import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from "@/config/database"
import User from "@/models/user"

type ResponseData = {
  success: Boolean
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  try {
    const { fullname, phone, dob, email, password } = JSON.parse(req.body)

    if (!fullname || !phone || !dob || !email || !password) {
      res.status(400).json({
        success: false,
        message: "Please fill all the fields"
      })
    }

    await connectDB()

    let user = await User.findOne({ email })

    if (user) { res.status(409).json({ success: false, message: "Email already exists" }) }

    user = await User.create({
      fullname,
      email,
      password,
      phone,
      dob
    })

    res.status(200).json({
      success: true,
      message: "Signup Successful"
    })

  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message.toString()
    })
  }
}