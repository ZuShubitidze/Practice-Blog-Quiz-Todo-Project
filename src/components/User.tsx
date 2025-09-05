import { auth } from "@/firebaseConfig";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { updateProfile } from "firebase/auth";

const User = () => {
  const [nickname, setNickname] = useState<string>("");
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [displayName, setDisplayName] = useState<string>(
    auth.currentUser?.displayName || ""
  );

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
  );
};

export default User;
