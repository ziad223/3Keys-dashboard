'use client'

import React, { Suspense } from 'react'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { Mail } from 'lucide-react'

function LinkSentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get('email') || 'name@example.com'

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F4F3EF] font-[family-name:var(--font-readex-regular)]" dir="rtl">
      <div className="w-full max-w-[480px] bg-[#E8E7E3] rounded-[32px] p-10 text-center shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#00614E] rounded-2xl flex items-center justify-center mb-6">
            <Mail size={32} className="text-white" />
          </div>
          <h1 className="text-[24px] lg:text-[28px] font-medium text-[#00614E]">تم إرسال الرابط إلى</h1>
          <p className="text-[24px] lg:text-[28px] font-medium text-[#00614E]">{email}</p>
        </div>

        <div className="space-y-4 text-right mb-8">
          <h2 className="text-[16px] font-medium text-[#00614E] mr-1">لم تستلم الرابط؟</h2>
          <ul className="space-y-2 text-[14px] text-[#4E525D] mr-1">
            <li className="flex items-center gap-2">• تحقق من صندوق البريد العشوائي</li>
            <li className="flex items-center gap-2">• تأكد من صحة البريد الإلكتروني</li>
            <li className="flex items-center gap-2">• انتظر بضع دقائق ثم حاول مرة أخرى</li>
          </ul>
        </div>

        <button
          type="button"
          className="w-full h-14 cursor-pointer bg-[#00614E] text-white rounded-xl font-medium text-[16px] flex items-center justify-center gap-2 hover:bg-[#005242] transition-colors mb-6"
        >
          إرسال مرة أخرى
          <span className="text-lg">←</span>
        </button>

        <button
          type="button"
          onClick={() => router.push('/login')}
          className="text-[14px] cursor-pointer text-[#00614E] hover:underline font-medium"
        >
          العودة إلى تسجيل الدخول
        </button>
      </div>
    </div>
  )
}

export default function LinkSentPage() {
  return (
    <Suspense fallback={<div>جاري التحميل...</div>}>
      <LinkSentContent />
    </Suspense>
  )
}
