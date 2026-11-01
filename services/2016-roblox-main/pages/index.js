import { useEffect } from "react"
import AuthenticationStore from "../stores/authentication"

const IndexPage = props => {
  const auth = AuthenticationStore.useContainer();
  useEffect(() => {
    if (auth.isPending) return;
    window.location.replace(auth.isAuthenticated ? '/home' : '/auth/home');
  }, [auth.isPending, auth.isAuthenticated]);

  return null;
}

export default IndexPage;