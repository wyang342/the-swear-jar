import { storage } from "../config/firebase";
import { User } from "firebase/auth";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

class APIService {
  static async uploadProfilePicture(currentUser: User, selectedImage: File) {
    const imageRef = ref(storage, `users/${currentUser!.uid}/profilePicture`);
    await uploadBytes(imageRef, selectedImage);
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
  }
}

export default APIService;
