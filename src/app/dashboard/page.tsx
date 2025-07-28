
"use client"
import React from 'react'
import { useSession } from 'next-auth/react'

export default function Dashboardpage() {
    const { data: session, status } = useSession()
    console.log("session:", session)
  return (
    <div>
      dashboard Page
    </div>
  )
}
