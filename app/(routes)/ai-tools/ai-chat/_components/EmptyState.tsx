import React from "react";

const questionList = [
  "What are the best career paths in tech?",
  "How can I improve my resume?",
  "What skills are in demand right now?",
  "How do I prepare for a technical interview?",
  "What are the top companies hiring in my field?",
  "How can I negotiate my salary effectively?",
  "What certifications should I consider for my career?",
  "How do I transition to a new industry?",
  "What are the latest trends in my profession?",
  "How can I build a strong professional network?",
];

function EmptyState({selectedQuestion} : any) {
  return (
    <div>
      <h2 className="font-bold text-xl">Ask anything to AI career agent</h2>
      <div>
        {questionList.map((question, index) => (
          <h2 className="p-4 text-center border rounded-lg my-3 hover:border-primary cursor-pointer" 
          key={index}
          onClick={()=>selectedQuestion(question)}>{question}</h2>
        ))}
      </div>
    </div>
  );
}

export default EmptyState;
