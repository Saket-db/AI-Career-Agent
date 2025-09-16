import React from 'react'
import AiToolCard from './AiToolCard'

export const AiToolsList = [
  {
    name: 'AI Career Q&A Chat',
    desc: 'Ask career-related questions',
    icon: '/chatbot.png',
    button: 'Ask Now',
    path: '/ai-tools/ai-chat'
  },
  {
    name: 'AI Resume Analyzer',
    desc: 'Improve your resume with AI',
    icon: '/resume.png',
    button: 'Analyze Now',
    path: '/ai-tools/ai-resume-analyzer'
  },
  {
    name: 'Career Roadmap Generator',
    desc: 'Build your roadmap',
    icon: '/roadmap.png',
    button: 'Generate Now',
    path: '/ai-tools/ai-roadmap-agent'
  },
  {
    name: 'Cover Letter Generator',
    desc: 'Write a cover letter',
    icon: '/cover.png',
    button: 'Coming Soon',
    path: '/cover-letter-generator',
    disabled: true
  },
  {
    name: 'AI Mock Interview',
    desc: 'Practice interviews with AI',
    icon: '/interview.png',
    button: 'Coming Soon',
    path: '/ai-tools/ai-mock-interview',
    disabled: true
  }
]

function AiToolList(){
  return (
    <div className='mt-7 p-5 bg-white rounded-xl shadow-md dark:bg-[#181c2a]'>
      <h2 className='font-bold text-lg'>Available AI Tools</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-2">
        Start building and shaping your career with these powerful AI tools.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
        {AiToolsList.map((tool:any, index) => (
          <AiToolCard tool={tool} key={index} />
        ))}
      </div>
    </div>
  )
}

export default AiToolList