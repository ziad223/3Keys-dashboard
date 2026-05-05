'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === 'admin@admin.com' && password === '123456') {
      document.cookie = "isLoggedIn=true; path=/"
      router.push('/')
    } else {
      alert('البريد الإلكتروني أو كلمة المرور غير صحيحة')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F3EF]  font-[family-name:var(--font-readex-regular)]" dir="rtl">
      <div className="w-full max-w-[480px] bg-[#E8E7E3] rounded-[24px] p-10  lg:h-[564px]">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#00614E] rounded-2xl flex items-center justify-center mb-6">
            <Image src="/images/logo.svg" alt="Diyar" width={32} height={32} className="brightness-0 invert" />
          </div>
          <h1 className="text-[24px] lg:text-[28px] font-medium text-[#00614E]">مرحبا، مسؤول ديار</h1>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-3">
            <label className="text-[14px] text-[#4E525D] block mr-1">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full py-1 px-4 h-12 rounded-xl bg-[#f8f8f8] border border-transparent focus:border-[#00614E]/10 focus:bg-white transition-all outline-none text-right placeholder:text-gray-300"
              required
            />
          </div>

          <div className="space-y-3">
            <label className="text-[14px] text-[#4E525D] block mr-1">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="كلمة المرور"
                className="w-full py-1 h-12 px-4 rounded-xl bg-[#f8f8f8] border border-transparent focus:border-[#00614E]/10 focus:bg-white transition-all outline-none text-right placeholder:text-gray-300"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} className='cursor-pointer text-[#00614E]' /> : <Eye size={20} className='cursor-pointer text-[#00614E]' />}
              </button>
            </div>
          </div>

          <div className="flex justify-start">
            <button 
              type="button" 
              onClick={() => router.push('/forgot-password')}
              className="text-[14px] cursor-pointer text-[#00614E] hover:underline font-medium"
            >
              نسيت كلمة المرور؟
            </button>
          </div>

          <button
            type="submit"
            className="w-full h-14 cursor-pointer bg-[#00614E] text-white rounded-xl font-medium text-[16px] flex items-center justify-center gap-2 hover:bg-[#005242] transition-colors mt-4"
          >
            تسجيل دخول
            <span className="text-lg">←</span>
          </button>
        </form>
      </div>
    </div>
  )
}
