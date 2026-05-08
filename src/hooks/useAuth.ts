import { useState } from "react";

export function useAuth() {
  const [isLoading, setIsLoading] = useState(false);

  const login = async (provider?: "google" | "github") => {
    setIsLoading(true);
    // Simulate auth API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  const signup = async (email: string, password: string, name?: string) => {
    setIsLoading(true);
    // Simulate create account API call
    return new Promise((resolve) => {
      setTimeout(() => {
        setIsLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  return { login, signup, isLoading };
}
