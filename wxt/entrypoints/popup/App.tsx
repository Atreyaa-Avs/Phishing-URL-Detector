import React from 'react'

import URLInput from '@/components/URLInput'
import Header from '@/components/Header'

const App = () => {
  return (
    <div className='flex flex-col'>
      <Header />
      <URLInput />
    </div>
  )
}

export default App