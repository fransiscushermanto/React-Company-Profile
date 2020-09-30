const FirebaseAdmin = require("../firebase/config").FirebaseAdmin;

const admin = new FirebaseAdmin();

module.exports = {
  verifyToken: async (req, res, next) => {
    const { idToken, disabled } = req.body;
    try {
      const verifiedToken = await admin.verifyIdToken(idToken);
      const levels = await admin.getAllLevels();
      if (disabled) {
        verifiedToken["verified"] = false;
      } else {
        verifiedToken["verified"] = true;
      }
      verifiedToken["user"].level = levels.docs
        .find((level) => level.id === verifiedToken.user.level)
        .data().level;
      return res.status(200).send({ verifiedToken });
    } catch (error) {
      const verifiedToken = { verified: false };
      return res.status(401).send({ verifiedToken, message: "Unauthorized" });
    }
  },

  generateToken: async (req, res, next) => {
    const { uId, additionalClaims } = req.body;

    try {
      const generatedToken = await admin.createCustomToken(
        uId,
        additionalClaims
      );

      return res.status(200).send({ token: generatedToken });
    } catch (error) {
      return res.status(400).send({ message: error });
    }
  },

  getListUsers: async (req, res, next) => {
    const { verified, access } = req.body;
    try {
      if (verified && access.status) {
        const arr = [];
        const listUsers = await admin.getListUsers();
        const usersData = await admin.getListUsersData();
        const levels = await admin.getAllLevels();
        usersData.docs.map((userData) => {
          const formatUserData = { ...userData.data() };
          formatUserData["level"] = {
            level: levels.docs
              .find((level) => level.id === userData.data().level)
              .data().level,
            level_id: levels.docs.find(
              (level) => level.id === userData.data().level
            ).id,
          };

          if (listUsers.users.find((user) => user.uid === userData.id)) {
            arr.push({
              uid: userData.id,
              data: formatUserData,
            });
          }
        });
        return res.status(200).send({ success: true, users: arr });
      } else {
        return res.status(403).send({ success: false, message: "Forbidden" });
      }
    } catch (error) {
      return res.status(500).send({
        success: false,
        error: error.message,
        message: "Runtime Error",
      });
    }
  },

  getAllLevels: async (req, res, next) => {
    const { verified, access } = req.body;
    try {
      if (verified && access.status) {
        const arr = [];
        const levels = await admin.getAllLevels();
        levels.docs.map((level) => {
          arr.push({ level: level.data().level, level_id: level.id });
        });
        return res.status(200).send({ success: true, levels: arr });
      } else {
        return res.status(403).send({ success: false, message: "Forbidden" });
      }
    } catch (error) {
      return res.status(500).send({
        error: error.message,
        message: "Runtime Error",
      });
    }
  },
};
