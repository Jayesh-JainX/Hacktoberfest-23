const AUTH_TOKEN = 'AUTHORIZATION_TOKEN';

const AuthGuard = {
  isAuthenticated: () => {
    const token = localStorage.getItem(AUTH_TOKEN);
    return token === undefined || token === null ? false : token;
  },
  authenticate: token => {
    localStorage.setItem(AUTH_TOKEN, token);
  },
  clear: () => {
    localStorage.removeItem(AUTH_TOKEN);
  }
};

export default AuthGuard;
