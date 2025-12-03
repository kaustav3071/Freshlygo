import React from 'react'

function Unauthorized() {
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
        <h1 className='text-4xl font-bold mb-4 text-red-500'>Access Denied 🚫</h1>
        <p className='text-gray-600 mb-4'>You do not have permission to access this page.</p>
    </div>
  )
}

export default Unauthorized