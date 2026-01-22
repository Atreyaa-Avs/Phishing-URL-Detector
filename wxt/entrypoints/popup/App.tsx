import React from 'react'
import Logo from "@/assets/logo.svg"

const App = () => {
  return (
    <div className='flex items-center justify-center gap-4 p-4'>
      <img src={Logo} className='h-20 w-28' alt="Logo" />
      <h1>Phishing URL Detector</h1>
    </div>
  )
}

export default App