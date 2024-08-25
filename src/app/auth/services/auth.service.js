import { auth } from "../../../config/firebase.config.js";

class AuthService {
  signUp = async (userInfo) => {
    const { email, password, username } = userInfo;

    const UserCredential = await auth.createUser({
      email,
      password,
      emailVerified: false,
      displayName: username, // todo
      // phoneNumber: '',
      // photoURL: '',
      disabled: false,
    });

    const jwtToken = await auth.createCustomToken(UserCredential.uid);
    const verifyLink = await auth.generateEmailVerificationLink(email);
    return { jwt_token: jwtToken, verify_link: verifyLink };
  };

  updateUser = async ({ userId, userInfo }) => {
    const updatedUserCred = await auth.updateUser(userId, userInfo);
    return { userInfo: updatedUserCred };
  };

  deleteUser = async (userId) => {
    await auth.deleteUser(userId);
    return {};
  };

  logout = async (userId) => {
    await auth.revokeRefreshTokens(userId);
    return {};
  };
}

const authService = new AuthService();

export default authService;
