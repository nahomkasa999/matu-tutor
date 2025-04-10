"use client"
import React, { useState } from 'react'


export default function courseBuilder() {
  const [courseTitle, setCourseTitle] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [coursePrice, setCoursePrice] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const courseData = {
      title: courseTitle,
      description: courseDescription,
      price: coursePrice,
    }

    console.log(courseData)

    try {
      const response = await fetch('/api/Create/Course', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(courseData),
      })

      if (response.ok) {
        console.log('Course created successfully')
      } else {
        console.error('Error creating course')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
  return (
     <div className='flex flex-col items-center justify-center h-screen bg-white text-black'>
        <h1 className='text-2xl font-bold mb-4'>Course Builder</h1>
        <form className='flex flex-col w-full max-w-md' onSubmit={handleSubmit}>
          <label className='mb-2'>Course Title:</label>
          <input
            type='text'
            value={courseTitle}
            onChange={(e) => setCourseTitle(e.target.value)}
            className='border border-gray-800 p-2 mb-4'
          />

          <label className='mb-2'>Course Description:</label>
          <textarea
            value={courseDescription}
            onChange={(e) => setCourseDescription(e.target.value)}
            className='border border-gray-800 p-2 mb-4'
          />

          <label className='mb-2'>Course Price:</label>
          <input
            type = "Number"
            value={coursePrice}
            onChange={(e) => setCoursePrice(Number(e.target.value))}
            className='border border-gray-800 p-2 mb-4'
          />

          <button type='submit' className='bg-blue-500 text-black p-2 rounded'>
            Create Course
          </button>
        </form>
     </div>
  )
  

}







// "use client"
// import React, {useState} from 'react'
// import axios from 'axios'

// function videoupload() {
//   const [file, setFile] = useState<File | null>(null)
  

//   const handlesubmit = () =>{
//     const formData = new FormData() 

//     if(file){
//       formData.append("file", file)
//     }
//     axios.post("/api/video_uploader", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data"
//       }
//     }).then((res) => {
//       console.log(res)
//     }).catch((err) => {
//       console.log(err)
//     })

//   }

//   return (
//     <div>
//       <h1>Video Upload</h1>
//       <form action={handlesubmit}>
//         <label htmlFor="file">Select a video file:</label>
//         <input type="file" accept="video/*" onChange={(e) => {setFile(e.target.files?.[0] || null)}} />
//         <button type="submit">Upload</button>
//       </form>
//     </div>

//   )
// }

// export default videoupload