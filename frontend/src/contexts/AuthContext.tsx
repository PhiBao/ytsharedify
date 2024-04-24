import React from "react";

import { User } from "../types/index";

export const AuthContext = React.createContext<{
  user: User | null;
  onLogin: () => void;
  onLogout: () => void;
}>({
  user: null,
  onLogin: () => {},
  onLogout: () => {},
});
