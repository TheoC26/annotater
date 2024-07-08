"use client"
import React, { useEffect } from 'react'

const Sources = () => {
    // redirect to "/sources/home" using window
    
    useEffect(() => {
        window.location.href = "/sources/my sources"
    }, [])

  return (
    <div></div>
  )
}

export default Sources