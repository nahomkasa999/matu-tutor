'use client'

import { useState } from 'react'
import { useTheme } from '@/context/ThemeContext';


const faqs = {
    course: [
      {
        q: 'How do I know which course is for me?',
        a: 'If you’re taking Mathematics I, II, III, or IV at AAU, just pick the matching course. If you’re unsure, message our team and we’ll guide you.'
      },
      {
        q: 'Will this help me pass mid and final exams?',
        a: 'Yes. Every video, worksheet, and solution is designed using actual past exams from AAU. You only study what will be tested.'
      },
      {
        q: 'How are the lessons structured?',
        a: 'Each chapter is explained with short videos, followed by worksheets and solution videos. We cover theory and practice step-by-step.'
      },
      {
        q: 'Is it in English or Amharic?',
        a: 'The course is in English, but explained in a way AAU students understand—sometimes with Amharic clarification where helpful.'
      },
      {
        q: 'Is this only for AAU students?',
        a: 'Right now, yes. Our content is 100% based on AAU’s course outline, exam formats, and past papers.'
      },
      {
        q: 'How often is the course updated?',
        a: 'Every month. New worksheets, exam formats, and videos are added based on recent mid/final exam questions from your professors.'
      },
    ],
    payment: [
      {
        q: 'How much does the course cost?',
        a: 'Each course costs between 200–300 Birr per month. This includes video lessons, worksheets, solutions, and updates.'
      },
      {
        q: 'Is it a one-time payment or subscription?',
        a: 'It’s a monthly subscription. You get access for 30 days after each payment. You can renew anytime.'
      },
      {
        q: 'How do I pay?',
        a: 'We currently accept only **Telebirr**. After payment, you’ll get instant access.'
      },
      {
        q: 'Can I share my account with friends?',
        a: 'No. Each account is made for one student. Sharing may lead to access being blocked.'
      },
      {
        q: 'Can I cancel anytime?',
        a: 'Yes, you can stop paying anytime. But without renewing, you’ll lose access after 30 days.'
      },
      {
        q: 'Can I still access old lessons after the month ends?',
        a: 'No. Access is based on active subscription. Once the 30 days end, you’ll need to renew to continue watching.'
      },
    ]
  }
const FAQ = () => {
  const [activeTab, setActiveTab] = useState<'course' | 'payment'>('course')
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const {theme, toggleTheme} = useTheme()

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-[68px] font-bold">Some questions, Some answers</h2>
      <div className="flex flex-col items-center justify-center">
        <div className="flex justify-center gap-4 my-10 bg-black rounded-4xl ">
          {['course', 'payment'].map((tab) => (
            <button
              key={tab}
              className={`px-6 py-3 rounded-full text-2xl font-bold transition-all duration-300 ${
                theme === 'light'
                  ? activeTab === tab
                    ? 'bg-white text-black'
                    : 'bg-black text-white border-none'
                  : activeTab === tab
                  ? 'bg-white text-black'
                  : 'bg-black text-white border-none'
              }`}
              onClick={() => setActiveTab(tab as 'course' | 'payment')}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto rounded-[20px] border border-black p-10">
        {faqs[activeTab].map((item, index) => (
          <div key={index} className="border-b border-black">
            <button
              onClick={() => toggle(index)}
              className="flex justify-between w-full text-left py-6 text-3xl font-light"
            >
              <span>{item.q}</span>
              <span>{openIndex === index ? '−' : '+'}</span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out text-left text-2xl max-w-3xl ${
                openIndex === index ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'
              }`}
            >
              <p className="ml-6">{item.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default FAQ
