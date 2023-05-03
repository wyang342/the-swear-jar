import { storage } from "../config/firebase";
import { User } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

class APIService {
  static async setProfilePictureUrl(
    setImageUrl: React.Dispatch<React.SetStateAction<string>>,
    currentUser: User | null
  ) {
    try {
      const imageRef = ref(storage, `users/${currentUser?.uid}/profilePicture`);
      const downloadURL = await getDownloadURL(imageRef);

      setImageUrl(downloadURL);
    } catch (error) {
      console.log(error);
    }
  }

  static async uploadProfilePicture(currentUser: User, selectedImage: File) {
    const imageRef = ref(storage, `users/${currentUser!.uid}/profilePicture`);
    await uploadBytes(imageRef, selectedImage);
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
  }
}

export default APIService;
