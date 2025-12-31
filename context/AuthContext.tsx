import { account } from "@/providers/AppWriteClient";
import { createContext, useContext, useEffect, useState } from "react";
import { ID, Models } from "react-native-appwrite";

interface AuthContextType {
  user: any;
  authState?: { authticated: boolean | null };
  loading: boolean;
  onLogin: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: any }>;
  onRegister: (
    email: string,
    password: string,
    name: string
  ) => Promise<{ success: boolean; error?: any }>;
  onLogout: () => Promise<any>;
}

const JWT_SECRET = process.env.JWT_SECRET;
const AuthContext = createContext<AuthContextType>({
  user: null,
  authState: { authticated: null },
  loading: true,
  onLogin: () => Promise.resolve({ success: false }),
  onRegister: () => Promise.resolve({ success: false }),
  onLogout: () => Promise.resolve(),
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [authState, setAuthState] = useState<{
    authticated: boolean | null;
  }>({ authticated: null });
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [session, setSession] = useState<Models.Session | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUserStatus = async () => {
    setLoading(true);
    try {
      let accountDetails = await account.get();
      setUser(accountDetails);
      setAuthState({ authticated: true });
    } catch (error) {
      console.log("Session error:", error);
      setUser(null);
      setAuthState({ authticated: false });
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    checkUserStatus();
  }, []);

  const register = async (email: string, password: string, name: string) => {
    setLoading(true);
    try {
      await account.create(ID.unique(), email, password, name);
      // Auto login after registration
      return { success: true };
    } catch (error) {
      setLoading(false);
      return { success: false, error };
    }
  };

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const response = await account.createEmailPasswordSession(
        email,
        password
      );
      const accountDetails = await account.get();
      setSession(response);
      setUser(accountDetails);
      setAuthState({ authticated: true });
      setLoading(false);
      return { success: true, user: accountDetails, session: response };
    } catch (error) {
      return { success: false, error };
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession("current");
      setAuthState({ authticated: false });
      setUser(null);
      setSession(null);
      setLoading(false);
      return { success: true };
    } catch (error) {
      return { success: false, error };
    }
  };

  const AuthValue = {
    user,
    authState,
    session,
    loading,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
  };
  return (
    <AuthContext.Provider value={AuthValue}>{children}</AuthContext.Provider>
  );
};
