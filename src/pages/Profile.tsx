

const Profile = () => {
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src="" alt="profile"
          className="rounded-full h-24 w-24 object-cover bg-main-theme self-center"
        />
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
          placeholder="password"
          name="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-main-theme text-secondary-theme p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-70">Update profile</button>
      </form>
      <div className="flex justify-between mt-5">
        <span className=" text-red-700 cursor-pointer">Delete Account</span>
        <span className=" text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
}

export default Profile