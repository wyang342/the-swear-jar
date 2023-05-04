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
  update,
} from "firebase/database";
import { JarData, UserJarData } from "../utils/types";

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
    console.log({ jarKey });
    if (!jarKey) {
      throw new Error("Jar key is null");
    }

    const userJarData = {
      uid: jarKey,
    };

    const updates = new Map<string, JarData | UserJarData>();
    updates.set(`/jars/${jarKey}`, jarData);
    updates.set(`/users/${uid}/jars/`, userJarData);

    update(databaseRef(db), updates);
  }

  // static const sendInvite()
}

export default APIService;
