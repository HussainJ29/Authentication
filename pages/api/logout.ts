import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from "@/config/database"
import User from "@/models/user"
import jwt from "jsonwebtoken"

type ResponseData = {
    success: Boolean
    message: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    try {


        res.status(200).setHeader("Set-Cookie", "token=deleted; path=/api; expires=Thu, 01 Jan 1970 00:00:00 GMT").json({
            success: true,
            message: "Logout",
        })

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message.toString()
        })
    }
}