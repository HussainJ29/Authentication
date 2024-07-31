import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from "@/config/database"
import User from "@/models/user"
import jwt from "jsonwebtoken"

type ResponseData = {
    success: Boolean
    message: string
    data: Object | any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    try {

        const token = req.cookies.token


        if (!token) return res.status(401).json({
            success: false,
            message: "Please login first",
        })

        const { _id } = jwt.verify(token, process.env.JWT_SECRET ?? "") as { _id: string }

        if (!_id) return res.status(401).json({
            success: false,
            message: "Please login first"
        })

        await connectDB()

        const user = await User.findById(_id)

        res.status(200).json({
            success: true,
            message: "User Data",
            data: { user }
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message.toString()
        })
    }
}