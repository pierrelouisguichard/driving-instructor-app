import React, { createContext, useReducer, Dispatch, useEffect } from "react";
import { User } from "../interface/Interfaces";

interface AuthState {
  user: User | null;
}

interface AuthAction {
  type: "LOGIN" | "LOGOUT";
  payload?: User; // Change payload type to User
}

export interface AuthContextType {
  user: User | null;
  dispatch: Dispatch<AuthAction>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  dispatch: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultAuthContext);

// Reducer
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload ?? null };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

// Provider
export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      try {
        const user: User = JSON.parse(userString);
        dispatch({ type: "LOGIN", payload: user });
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
