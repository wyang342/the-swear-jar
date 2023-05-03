import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import { User } from "firebase/auth";

class APIService {
  static async getProfilePicture(
    setImageUrl: React.Dispatch<React.SetStateAction<string>>,
    currentUser: User | null
  ) {
    const imageRef = ref(storage, `users/${currentUser?.uid}/profilePicture`);
    const downloadURL = await getDownloadURL(imageRef);
    setImageUrl(downloadURL);
  }
}

export default APIService;
