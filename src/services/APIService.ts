import { ref, getDownloadURL } from "firebase/storage";
import { storage } from "../config/firebase";
import { User } from "firebase/auth";

class APIService {
  static async setProfilePictureUrl(
    setImageUrl: React.Dispatch<React.SetStateAction<string>>,
    currentUser: User | null
  ) {
    const imageRef = ref(storage, `users/${currentUser?.uid}/profilePicture`);
    const downloadURL = await getDownloadURL(imageRef);

    setImageUrl(downloadURL);
  }
}

export default APIService;
