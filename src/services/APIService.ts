import { storage } from "../lib/firebase";
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
  remove,
  get,
} from "firebase/database";
import { JarModel } from "../models/JarModel";
import { InvitationModel } from "../models/InvitationModel";

class APIService {
  static async initializeUser(uid: string, email: string) {
    const db = getDatabase();

    await set(databaseRef(db, `users/${uid}`), {
      email: email,
    });
  }

  static async addNickname(currentUser: User, nickname: string) {
    const db = getDatabase();
    const uid = currentUser.uid;

    await set(databaseRef(db, `users/${uid}/nickname`), nickname);
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

  static async createJar(currentUser: User, model: JarModel): Promise<string> {
    const db = getDatabase();
    const uid = currentUser.uid;

    // Get new jar id
    const jarId = push(child(databaseRef(db), "jars")).key;
    if (!jarId) {
      throw new Error("Jar key is null");
    }

    // Create Jar
    await set(databaseRef(db, `jars/${jarId}`), model);
    await set(databaseRef(db, `users/${uid}/jars/${jarId}`), "joined");

    return jarId;
  }

  static async inviteUser(model: InvitationModel) {
    const db = getDatabase();

    // See if user exists
    const snapshot = await get(databaseRef(db, `users/${model.user_id}`));
    if (!snapshot.exists()) {
      throw new Error("User was not found.");
    }

    // Get new invitation key
    const invitationKey = push(child(databaseRef(db), "invitations")).key;
    if (!invitationKey) {
      throw new Error("Invitation key is null.");
    }

    // Create Invitation
    await set(databaseRef(db, `invitations/${invitationKey}`), model);

    // Add invitation to user
    await set(
      databaseRef(db, `users/${model.user_id}/invitations/${invitationKey}`),
      true
    );

    // Add invitation to jar
    await set(
      databaseRef(db, `jars/${model.jar_id}/invitations/${invitationKey}`),
      true
    );
  }

  static async acceptInvitation(
    currentUser: User,
    invitationId: string,
    jarId: string
  ) {
    const db = getDatabase();
    const uid = currentUser.uid;

    // Add user to jar
    await set(databaseRef(db, `jars/${jarId}/contributions/${uid}`), 0);

    // Add jar to user
    await set(databaseRef(db, `users/${uid}/jars/${jarId}`), true);

    await APIService.deleteInvitationAsInvitee(
      currentUser,
      invitationId,
      jarId
    );
  }

  static async deleteInvitationAsInvitee(
    currentUser: User,
    invitationId: string,
    jarId: string
  ) {
    const db = getDatabase();
    const uid = currentUser.uid;

    // Delete invitation from user
    await remove(databaseRef(db, `users/${uid}/invitations/${invitationId}`));

    // Delete invitation from jar
    await remove(databaseRef(db, `jars/${jarId}/invitations/${invitationId}`));

    // Delete invitation
    await remove(databaseRef(db, `invitations/${invitationId}`));
  }

  static async deleteInvitationAsMember(
    invitedUserId: string,
    invitationId: string,
    jarId: string
  ) {
    const db = getDatabase();

    // Delete invitation from user
    await remove(
      databaseRef(db, `users/${invitedUserId}/invitations/${invitationId}`)
    );

    // Delete invitation from jar
    await remove(databaseRef(db, `jars/${jarId}/invitations/${invitationId}`));

    // Delete invitation
    await remove(databaseRef(db, `invitations/${invitationId}`));
  }

  // Note that this function does not remove invitations from a user
  static async deleteJar(jarId: string, jarData: JarModel) {
    const db = getDatabase();

    // Delete invitations to jar from every user that was invited
    for (const invitationId in jarData.invitations) {
      const snapshot = await get(
        databaseRef(db, `invitations/${invitationId}`)
      );

      if (snapshot.exists()) {
        const invitationData: InvitationModel = snapshot.val();

        await remove(
          databaseRef(
            db,
            `users/${invitationData.user_id}/invitations/${invitationId}`
          )
        );
      } else {
        throw new Error("Invitation snapshot does not exist.");
      }
    }

    // Delete jar from every user
    for (const userId in jarData.contributions) {
      await remove(databaseRef(db, `users/${userId}/jars/${jarId}`));
    }

    // Delete invitations
    for (const invitationId in jarData.invitations) {
      await remove(databaseRef(db, `invitations/${invitationId}`));
    }

    // Delete jar
    await remove(databaseRef(db, `jars/${jarId}`));
  }

  static async removeInvitationFromUser(
    currentUser: User,
    invitationId: number
  ) {
    const db = getDatabase();
    const uid = currentUser.uid;

    await remove(databaseRef(db, `users/${uid}/invitations/${invitationId}`));
  }
}

export default APIService;
