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
  onValue,
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

  static async getJars(
    currentUser: User,
    setJars: React.Dispatch<React.SetStateAction<JarData[]>>
  ) {
    const db = getDatabase();
    const userJarsRef = databaseRef(db, `users/${currentUser.uid}/jars`);
    const jarRef = databaseRef(db, "jars");

    return onValue(userJarsRef, (snapshot) => {
      const userJars = snapshot.val();

      if (userJars) {
        const jarKeys = Object.keys(userJars);
        const jars: JarData[] = [];

        jarKeys.forEach((key) => {
          return onValue(child(jarRef, key), (snapshot) => {
            const jar = snapshot.val();
            if (jar) {
              jars.push(jar);
            }
          });
        });

        setJars(jars);
      }
    });
  }
}

export default APIService;
