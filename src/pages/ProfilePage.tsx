import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebaseConfig";
import { signOut, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string>("");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>(
    auth.currentUser?.displayName || ""
  );

  // Sign out user
  const handleSignOut = async () => {
    await signOut(auth);
    console.log("User signed out");
    navigate("/");
  };

  // Update user information
  const handleUpdateUserInfo = async () => {
    if (!auth.currentUser) return;
    try {
      await updateProfile(auth.currentUser, {
        displayName: nickname,
      });
      setDisplayName(nickname);
      setIsEditingName(false);
      console.log("profile updated");
    } catch (error: any) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <main className="flex flex-col gap-4 w-1/2">
      <h1 className="text-3xl font-bold">Profile Page</h1>
      {/* Display user information */}
      <div>
        <div className="flex flex-col gap-10">
          {/* UserName */}
          {auth.currentUser?.displayName ? (
            <div className="flex flex-row gap-10 items-center">
              <p>Name: {auth.currentUser?.displayName}</p>
              {/* Edit UserName */}
              {!isEditingName ? (
                <Button
                  onClick={() => {
                    setNickname(displayName);
                    setIsEditingName(true);
                  }}
                >
                  Edit Name
                </Button>
              ) : (
                <>
                  <Input
                    placeholder="Set Nickname"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      handleUpdateUserInfo();
                      setIsEditingName(false);
                    }}
                  >
                    Save
                  </Button>
                </>
              )}
            </div>
          ) : (
            <p>Name: Anonymous</p>
          )}
          {/* Email */}
          {auth.currentUser?.email && <p>Email: {auth.currentUser?.email}</p>}
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
