const {
  PORT,
  PRODUCTION,
  TYPE,
  PROJECT_ID,
  PRIVATE_KEY_ID,
  PRIVATE_KEY,
  CLIENT_EMAIL,
  CLIENT_ID,
  AUTH_URI,
  TOKEN_URI,
  AUTH_PROVIDER_CERT_URL,
  CLIENT_CERT_URL,
  UNIVERSE_DOMAIN,
} = process.env;

const ENV_CONFIG = Object.freeze({
  port: Number(PORT),
  production: PRODUCTION === "true",
  firebaseConfig: {
    type: String(TYPE),
    project_id: String(PROJECT_ID),
    private_key_id: String(PRIVATE_KEY_ID),
    private_key: String(PRIVATE_KEY),
    client_email: String(CLIENT_EMAIL),
    client_id: String(CLIENT_ID),
    auth_uri: String(AUTH_URI),
    token_uri: String(TOKEN_URI),
    auth_provider_x509_cert_url: String(AUTH_PROVIDER_CERT_URL),
    client_x509_cert_url: String(CLIENT_CERT_URL),
    universe_domain: String(UNIVERSE_DOMAIN),
  },
});

export default ENV_CONFIG;
