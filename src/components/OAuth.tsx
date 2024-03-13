import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { googleSignin } from "../store/user/userSlice";
import { useAppDispatch } from "../store/store";
// import { useAppDispatch, useAppSelector } from "../store/store";


const OAuth = () => {
  const dispatch = useAppDispatch()

  const handleSubmit = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)

      const result = await signInWithPopup(auth, provider)

      const email = result.user.email || ""
      const firstname = result.user.displayName?.split(' ').slice(0, -1).join(' ') || "";
      const lastname = result.user.displayName?.split(' ').slice(-1).join(' ') || "";

      dispatch(googleSignin({ email, firstname, lastname }))
      
      // const res = await fetch("/api/auth/google", {
      //   method: "POST",
      //   headers: {
      //     "Content_Type": "application/json"
      //   },
      //   body: JSON.stringify({
      //     firstname: firstname,
      //     lastname: lastname,
      //     email: result.user.email,
      //     photo: result.user.photoURL
      //   })
      // })
      // const data = await res.json()
      
    } catch (error) {
      console.log(error);
      
    }
  }

  return (
    <button
      onClick={handleSubmit}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90"
    >
      Continue with Google
    </button>
  )
}

export default OAuth