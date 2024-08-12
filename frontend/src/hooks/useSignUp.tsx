import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignUp = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { dispatch } = useAuthContext();

  const signUp = async (
    email: string,
    password: string,
    invitationCode: string
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log({ email, password, invitationCode }); // Log data being sent

      const response = await fetch("http://localhost:4000/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, invitationCode }),
      });

      const json = await response.json();

      if (!response.ok) {
        setError(json.error || "Registration failed");
      } else {
        localStorage.setItem("user", JSON.stringify(json));
        dispatch({ type: "LOGIN", payload: json });
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return { signUp, isLoading, error };
};
