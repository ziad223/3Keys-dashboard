'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Redirect to link-sent page
    router.push(`/link-sent?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F3EF]  " dir="rtl">
      <div className="w-full max-w-[480px] bg-[#E8E7E3] rounded-[32px] p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100 text-center">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#00614E] rounded-2xl flex items-center justify-center mb-6">
            <Image src="/images/logo.svg" alt="Diyar" width={32} height={32} className="brightness-0 invert" />
          </div>
          <h1 className="text-[24px]  text-[#00614E]">نسيت كلمة المرور؟</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3 text-right">
            <label className="text-[14px] text-[#4E525D] block mr-1">البريد الإلكتروني</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
                className="w-full py-1 h-12 px-4 rounded-xl bg-[#f8f8f8] border border-transparent focus:border-[#00614E]/10 focus:bg-white transition-all outline-none text-right placeholder:text-gray-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full h-14 cursor-pointer bg-[#00614E] text-white rounded-xl font-medium text-[16px] flex items-center justify-center gap-2 hover:bg-[#005242] transition-colors"
          >
            إرسال رابط إعادة التعيين  
            <span className="text-lg">←</span>
          </button>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => router.push('/login')}
              className="text-[14px] cursor-pointer text-[#00614E] hover:underline font-medium"
            >
              العودة إلى تسجيل الدخول
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
