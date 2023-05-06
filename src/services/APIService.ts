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
import { JarModel } from "../models/JarModel";

class APIService {
  static async initializeUser(uid: string, email: string) {
    const db = getDatabase();
    const userRef = databaseRef(db, `users/${uid}`);

    await set(userRef, {
      email: email,
    });
  }

  static async uploadProfilePicture(currentUser: User, selectedImage: File) {
    const imageRef = storageRef(
      storage,
      `users/${currentUser!.uid}/profilePicture`
    );
    await uploadBytes(imageRef, selectedImage);
    const downloadURL = await getDownloadURL(imageRef);

    // Update in database
    const db = getDatabase();
    await set(
      databaseRef(db, `users/${currentUser!.uid}/profilePicture`),
      downloadURL
    );

    return downloadURL;
  }

  static async createJar(currentUser: User, jarData: JarModel) {
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
}

export default APIService;
