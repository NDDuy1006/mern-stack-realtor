/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SignInFormType } from "../types"


const SignIn = () => {
  const [formData, setFormData] = useState<SignInFormType>({
    email: "",
    password: ""
  })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      setLoading(true)
      const res = await fetch("api/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData)
        }
      )
      const data = await res.json()
      if (data.success === false) {
        setError(data.message)
        setLoading(false)
        return
      }
      setLoading(false)
      setError(null)
      navigate("/")
    } catch (error: any) {
      setLoading(false)
      setError(error)
    }
  }

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="email"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="password"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-main-theme text-secondary-theme p-3 rounded uppercase hover:opacity-95 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
      </form>
      <div className="flex gap-2 mt-5">
        <p>Dont have an account yet?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign up</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}

export default SignIn