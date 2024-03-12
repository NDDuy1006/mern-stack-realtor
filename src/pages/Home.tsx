/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { loadAccessToken } from "../utils/storage"

const Home = () => {
  const [homes, setHomes] = useState<any>([])
  const accessToken = loadAccessToken()
  console.log("🚀🚀🚀 Oi oi oi ~ accessToken 🚀🚀🚀:", accessToken)
  useEffect(() => {
    fetch("http://localhost:8000/homes")
      .then(response => response.json())
      .then(data => setHomes(data))
  }, [])
  console.log(homes);
  
  return (
    <div>Home</div>
  )
}

export default Home