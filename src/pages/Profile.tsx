/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage"
import { app } from "../firebase"
import { useAppDispatch, useAppSelector } from "../store/store"
import { logout } from "../store/user/userSlice"

const Profile = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.user)
  const fileRef = useRef<HTMLInputElement>(null) 
  const [file, setFile] = useState<File | undefined>(undefined)
  const [filePercentage, setFilePercentage] = useState(0)
  const [fileError, setFileError] = useState(false)
  const [formData, setFormData] = useState({avatar: ""})

  useEffect(() => {
    fileRef.current!.focus();
  });
  
  const handleFileUpload = (file: File) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePercentage(Math.round(progress))
      },
      (error: any) => {
        setFileError(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then((downloadURL: any) => {
            setFormData({ ...formData, avatar: downloadURL })
          })
      }
    );
  }

  const handleLogout = () => {
    dispatch(logout())
  }
  
  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files?.[0])}
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => fileRef.current?.click()}
          src={formData.avatar || currentUser?.avatarUrl} alt="profile"
          className="rounded-full h-24 w-24 object-cover bg-main-theme self-center cursor-pointer"
        />
        <p className="text-sm self-center">
          {fileError
            ? (
              <span className="text-red-700">Error Image Upload Error</span>
            ) : filePercentage > 0 && filePercentage < 100
            ? (
                <span className="text-slate-700">{`Uploading ${filePercentage}`}</span>
              ) : filePercentage === 100
              ?  (
                <span className="text-green-700">Uploaded Successfully!</span>
              ) : ""
          }
        </p>
        <input
          type="text"
          name="firstname"
          placeholder="first name"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          name="lastname"
          placeholder="last name"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          name="email"
          placeholder="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          name="phone number"
          placeholder="phone number"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-main-theme text-secondary-theme p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70">Update profile</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className=" text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleLogout} className=" text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}

export default Profile