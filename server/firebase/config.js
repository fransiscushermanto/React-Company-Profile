require("dotenv").config();
const admin = require("firebase-admin");
const { resolve } = require("path");

var config = {
  credential: admin.credential.cert({
    type: process.env.firebase_admin_type,
    project_id: process.env.firebase_admin_project_id,
    private_key_id: process.env.firebase_admin_private_key_id,
    private_key: process.env.firebase_admin_private_key.replace(/\\n/g, "\n"),
    client_email: process.env.firebase_admin_client_email,
    client_id: process.env.firebase_admin_client_id,
    auth_uri: process.env.firebase_admin_auth_uri,
    token_uri: process.env.firebase_admin_token_uri,
    auth_provider_x509_cert_url:
      process.env.firebase_admin_auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.firebase_admin_client_x509_cert_url,
  }),
  databaseURL: process.env.firebase_admin_database_url,
};

class FirebaseAdmin {
  constructor() {
    admin.initializeApp(config);
    this.auth = admin.auth();
    this.firestore = admin.firestore();
  }

  async verifyIdToken(idToken) {
    const decodedToken = await this.auth.verifyIdToken(idToken);
    return decodedToken;
  }

  async createCustomToken(userId, additionalClaims) {
    const generatedToken = await this.auth.createCustomToken(
      userId,
      additionalClaims
    );
    return generatedToken;
  }

  async getListUsers(max = 0, page = "") {
    const users = await this.auth.listUsers();
    return users;
  }

  async getListUsersData() {
    const usersData = await this.firestore.collection("users").get();
    return usersData;
  }

  async getAllLevels() {
    const levels = await this.firestore.collection("levels").get();
    return levels;
  }
}

module.exports.FirebaseAdmin = FirebaseAdmin;
