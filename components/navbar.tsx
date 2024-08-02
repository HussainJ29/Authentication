"use client"
import React from 'react'
import Link from "next/link"
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"

const Navbar = ({ pathname = "/" }) => {

    const router = useRouter()

    const handleLogout = async () => {
        const response = await (await fetch("/api/logout")).json()
        if (!response.success) return alert(response.message)

        router.replace("/")
    }

    return (
        <nav className="w-full flex justify-between items-center container px-24 py-2">
            <div className="px-4 py-3 text-lg bg-rose-500 text-white rounded-lg">ImpactHub</div>
            <div className="space-x-4">
                {pathname !== "/user" ?
                    <>
                        <Link className={pathname === "/" ? "text-rose-500 font-semibold" : undefined} href="/">Sign in</Link>
                        <Link className={pathname === "/signup" ? "text-rose-500 font-semibold" : undefined} href="/signup">Sign up</Link>
                    </>
                    :
                    <button className="text-rose-500 font-semibold" onClick={handleLogout}>Logout</button>}

            </div>
        </nav>
    )
}

export default Navbar