import { initializeApp, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import ENV_CONFIG from "./env.config.js";

const { firebaseConfig } = ENV_CONFIG;

class FirebaseConfig {
  constructor() {
    this.app = initializeApp({
      credential: cert(firebaseConfig),
    });

    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
  }
}
const firebase = new FirebaseConfig();

const { auth, db } = firebase;

export { auth, db };
