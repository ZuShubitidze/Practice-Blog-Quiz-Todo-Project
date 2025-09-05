import { Button } from "@/components/ui/button";
import User from "@/components/User";
import { auth } from "@/firebaseConfig";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();

  // Sign out user
  const handleSignOut = async () => {
    await signOut(auth);
    console.log("User signed out");
    navigate("/");
  };

  return (
    <main className="flex flex-col gap-20 w-1/2">
      <h1 className="text-3xl font-bold">Profile Page</h1>
      {/* Display user information */}
      <div>
        <div className="flex flex-col gap-5">
          {/* Email */}
          {auth.currentUser?.email && <p>Email: {auth.currentUser?.email}</p>}
          {/* UserName */}
          {auth.currentUser?.displayName ? <User /> : <p>Name: Anonymous</p>}
          {/* Phone */}
          {auth.currentUser?.phoneNumber && (
            <p>Phone: {auth.currentUser?.phoneNumber}</p>
          )}
        </div>
      </div>
      {/* Sign out */}
      <div>
        <Button onClick={handleSignOut}>Sign out of your account</Button>
      </div>
    </main>
  );
};

export default ProfilePage;
