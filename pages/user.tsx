import React, { useState, useEffect } from 'react'
import Navbar from "@/components/navbar"

const UserPage = () => {
    const [userDetails, setUserDetails] = useState()
    const [errorMessage, setErrorMessage] = useState()

    const getUserDetails: Function = async () => {
        try {

            const response = await (await fetch("/api/user")).json()
            if (!response.success) return setErrorMessage(response.message)

            setUserDetails(response.data)
        } catch (error: any) {
            setErrorMessage(error.message)
        }
    }

    useEffect(() => { getUserDetails() }, [])

    if (!userDetails && !errorMessage) return <>
        <Navbar pathname="/user" />Loading...</>

    if (errorMessage) return <>
        <Navbar pathname="/user" />{errorMessage}</>

    return (<>
        <Navbar pathname="/user" />
        <main>{JSON.stringify(userDetails)}</main></>
    )
}

export default UserPage