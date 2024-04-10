import React, { createContext, useContext, ReactNode } from 'react';

// Define the shape of your context data
interface UserContextData {
  // Your context data here
  name: string;
  password: string;
  captchaDone: boolean;
  loggedIn: boolean;
  updateUser: (newName: string, newPassword: string) => void;
  updateCaptchaDone: (captchaStatus: boolean) => void;
  updateLoggedIn: (logStatus: boolean) => void;
}

// Create the context with an initial value (this will be used if a component is rendered outside the provider)
const UserContext = createContext<UserContextData | undefined>(undefined);

// Create a provider component that will wrap your app
interface UserContextProviderProps {
  children: ReactNode;
}

export const UserContextProvider: React.FC<UserContextProviderProps> = ({ children }) => {
  // Your state or any other logic here
  const [name, setName] = React.useState('DefaultName');
  const [password, setPassword] = React.useState('default password');
  const [captchaDone, setCaptchaDone] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);

  // Function to update the username and password
  const updateUser = (newName: string, newPassword: string) => {
    setName(newName);
    setPassword(newPassword);
  };

  // Function to update the captchaDone
  const updateCaptchaDone = (captchaStatus: boolean) => {
    setCaptchaDone(captchaStatus);
  };

  // Function to update the loggedIn status
  const updateLoggedIn = (logStatus: boolean) => {
    setLoggedIn(logStatus);
  };

  // Provide the context value to the components in the tree
  const contextValue: UserContextData = {
    name,
    password,
    captchaDone,
    loggedIn,
    updateUser,
    updateCaptchaDone,
    updateLoggedIn
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

// Create a custom hook to consume the context
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a userContextProvider');
  }
  return context;
};