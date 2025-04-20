import { CheckCircle } from 'lucide-react'

const courses = [
  {
    title: 'Mathematics Applied I',
    price: '200 Birr',
    bg: 'bg-black',
    features: [
      '100+ Video lessons by the professor',
      'Fundamental concepts explained with real-world examples',
      'Weekly worksheets to strengthen understanding',
      'Focuses on chapters most often tested',
      'Perfect for early semester prep',
    ],
  },
  {
    title: 'Mathematics Applied II',
    price: '200 Birr',
    bg: 'bg-black',
    features: [
      '100+ Video lessons by the professor',
      'Problem-solving strategies for complex questions',
      'Mid + Final exam modeled worksheet packs',
      'Emphasis on practical questions and logic',
      'Ideal for passing with confidence',
    ],
  },
  {
    title: 'Mathematics Applied III',
    price: '300 Birr',
    bg: 'bg-black',
    features: [
      '100+ Video lessons by the professor',
      'Challenging practice sets with full video solutions',
      'Worksheet packs based on past exams',
      'Concept-focused explanations for deep understanding',
      'Built for advanced learners or repeat takers',
    ],
  },
  {
    title: 'Mathematics Applied IV',
    price: '300 Birr',
    bg: 'bg-black',
    features: [
      '100+ Video lessons by the professor',
      'Topic breakdowns for the toughest parts of the course',
      'Finals-only prep with intense revision tasks',
      'Mock exam simulations included',
      'Last-minute but high-yield coverage',
    ],
  },
]

const Pricing = () => {
  return (
    <section className="py-16 px-4 text-center">
      <h2 className="text-[68px] font-bold">Pricing</h2>
      <p className="text-[49px] mt-1 mb-10">One-time payment. No fluff. Just results.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {courses.map((course, index) => (
          <div key={index} className={`${course.bg} text-white rounded-[20px] py-10 px-6 relative h-[75vh] w-[25vw] gap-10`}>
            <div className="absolute -top-3 -right-3 bg-yellow-400 text-black text-sm font-bold px-2 py-1 rotate-45 rounded-md shadow">
              {course.price}
            </div>
            <h3 className="text-5xl font-bold mb-10 text-left">{course.title}</h3>
            <ul className="text-left space-y-3  ml-3 h-[46vh] ">
              {course.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2 text-2xl font-light">
                  <CheckCircle size={16} className="text-green-400 mt-1" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <button className="bg-white text-black px-6 py-2 rounded">GET A+ FOR {course.price.toUpperCase()}</button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Pricing
