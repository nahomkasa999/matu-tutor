"use client"
import React, {useState} from 'react'
import axios from 'axios'

function videoupload() {
  const [file, setFile] = useState<File | null>(null)
  

  const handlesubmit = () =>{
    const formData = new FormData() 

    if(file){
      formData.append("file", file)
    }
    axios.post("/api/video_uploader", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    }).then((res) => {
      console.log(res)
    }).catch((err) => {
      console.log(err)
    })

  }

  return (
    <div>
      <h1>Video Upload</h1>
      <form action={handlesubmit}>
        <label htmlFor="file">Select a video file:</label>
        <input type="file" accept="video/*" onChange={(e) => {setFile(e.target.files?.[0] || null)}} />
        <button type="submit">Upload</button>
      </form>
    </div>

  )
}

export default videoupload