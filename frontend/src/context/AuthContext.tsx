import { LoginValues, RegisterValues, User } from "../features/user/user";
import { createContext, ReactNode, useContext } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Account } from "../api/agent";

interface AuthContextType {
  user: User | null | undefined;
  isLoggedIn: boolean;
  loading: boolean;
  login: (values: LoginValues) => Promise<User>;
  register: (values: RegisterValues) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading: loading } = useQuery<User>({
    queryKey: ["user"],
    queryFn: Account.current,
    enabled: !!localStorage.getItem("authToken"),
    staleTime: Infinity,
    retry: false,
  });

  const loginMutation = useMutation({
    mutationFn: (values: LoginValues) => Account.login(values),
    onSuccess: (userDto) => {
      localStorage.setItem("authToken", userDto.token);
      queryClient.setQueryData(["user"], userDto);
    },
  });

  const registerMutation = useMutation({
    mutationFn: (values: RegisterValues) => Account.register(values),
    onSuccess: (userDto) => {
      localStorage.setItem("authToken", userDto.token);
      queryClient.setQueryData(["user"], userDto);
    },
  });

  const logout = () => {
    localStorage.removeItem("authToken");
    queryClient.setQueryData(["user"], null);
    queryClient.removeQueries();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        loading,
        login: loginMutation.mutateAsync,
        register: registerMutation.mutateAsync,
        logout,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
