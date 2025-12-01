'use client'
import Welcome from '@/components/Welcome'
import RegisterForm from '@/components/RegisterForm'
import React, { useState } from 'react'

function Register() {
  const [step, setStep] = useState(1)
  return (
    <div>
      { step === 1 ? <Welcome nextStep={setStep}/> : <RegisterForm />}
    </div>
  )
}

export default Register