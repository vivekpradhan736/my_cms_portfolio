import { createContext, Dispatch, SetStateAction } from "react";

interface UserDetailContextType {
  userDetail: any;
  setUserDetail: Dispatch<SetStateAction<any>>;
  userDetailLoading: boolean;
  setUserDetailLoading: Dispatch<SetStateAction<boolean>>;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
}

// ✅ Provide a valid default value
const UserDetailContext = createContext<UserDetailContextType>({
  userDetail: null,
  setUserDetail: () => {},
  userDetailLoading: false,
  setUserDetailLoading: () => {},
  error: "",
  setError: () => {},
});

export default UserDetailContext;
