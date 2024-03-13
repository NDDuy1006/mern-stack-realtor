/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react"
import { Link } from "react-router-dom"
import { SignUpPayload } from "../types"
import OAuth from "../components/OAuth"
import { useAppDispatch, useAppSelector } from "../store/store"
import { signup } from "../store/user/userSlice"

const SignUp = () => {
  const dispatch = useAppDispatch()
  const { loading } = useAppSelector((state) => state.user)
  const { error } = useAppSelector((state) => state.user)
  const [formData, setFormData] = useState<SignUpPayload>({
    username: "",
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: ""
  })

  // const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({...formData, [name]: value})
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      dispatch(signup(formData))
        // .then(() => {
        //   dispatch(signin({
        //     email: formData.email, password: formData.password
        //   }))
        // })
        // .then(() => navigate("/"))
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <div className=" p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">Sign Up</h1>
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
          type="text"
          name="username"
          value={formData.username}
          placeholder="username"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstname"
          value={formData.firstname}
          placeholder="first name"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastname"
          value={formData.lastname}
          placeholder="last name"
          className="border p-3 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="phone"
          name="phone"
          value={formData.phone}
          placeholder="phone"
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
          className="bg-main-theme text-secondary-theme p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-2 mt-5">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-700">Sign in</span>
        </Link>
      </div>
      {error && <p className="text-red-500 mt-5">{error}</p>}
    </div>
  )
}

export default SignUp