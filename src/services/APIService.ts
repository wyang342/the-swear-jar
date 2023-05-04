import { storage } from "../config/firebase";
import { User } from "firebase/auth";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import {
  getDatabase,
  ref as databaseRef,
  push,
  child,
  set,
} from "firebase/database";
import { JarData } from "../utils/types";

class APIService {
  static async uploadProfilePicture(currentUser: User, selectedImage: File) {
    const imageRef = storageRef(
      storage,
      `users/${currentUser!.uid}/profilePicture`
    );
    await uploadBytes(imageRef, selectedImage);
    const downloadURL = await getDownloadURL(imageRef);

    return downloadURL;
  }

  static async createJar(currentUser: User, jarData: JarData) {
    const db = getDatabase();
    const uid = currentUser.uid;

    // Get new jar key
    const jarKey = push(child(databaseRef(db), "jars")).key;
    if (!jarKey) {
      throw new Error("Jar key is null");
    }

    // Create Jar
    await set(databaseRef(db, `jars/${jarKey}`), jarData);
    await set(databaseRef(db, `users/${uid}/jars/${jarKey}`), "joined");
  }

  // static const sendInvite()
}

export default APIService;
