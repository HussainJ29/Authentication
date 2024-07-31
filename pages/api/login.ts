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
        const { email, password } = JSON.parse(req.body)

        if (!email || !password) {
            res.status(400).json({
                success: false,
                message: "Please fill all the fields"
            })
        }

        await connectDB()

        let user = await User.findOne({ email }).select("password")

        if (!user) { res.status(409).json({ success: false, message: "Email does not exist" }) }

        const isCorrectPassword = await user.matchPassword(password)

        if (!isCorrectPassword) { res.status(401).json({ success: false, message: "Incorrect Credentials" }) }

        const token = user.generateToken()

        res.status(200).setHeader("Set-Cookie",`token=${token}`).json({
            success: true,
            message: "Login Successful"
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message.toString()
        })
    }
}