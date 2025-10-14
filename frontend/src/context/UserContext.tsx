import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type Dispatch,
  type ReactNode,
} from "react";
//Types
//UserTypes
type UserProps = {
  children: ReactNode;
};
//User types
type User = {
  _id: string; // MongoDB _id
  name: string;
  email: string;
  photo?: string;
};
//state types
type UserState = {
  user: User | null;
  authorized: boolean;
  isLoading: boolean;
};

//Type UserAction
type UserAction =
  | { type: "USER/SET"; payload: User | null }
  | { type: "AUTHORIZED/SET" }
  | { type: "AUTHORIZED/REMOVE" }
  | { type: "LOADING" }
  | { type: "LOADED" }
  | { type: "LOGIN_SUCCESS"; payload: User }
  | { type: "LOGOUT" };
//InitialState
const initialState: UserState = {
  user: null,
  authorized: false,
  isLoading: true,
};

//Context type
type UserContextType = {
  state: UserState;
  dispatch: Dispatch<UserAction>;
  logout: () => Promise<void>;
};
const UserContext = createContext<UserContextType | undefined>(undefined);

function reducer(state: UserState, action: UserAction) {
  switch (action.type) {
    case "USER/SET":
      return { ...state, user: action.payload };
    case "AUTHORIZED/SET":
      return { ...state, authorized: true };
    case "AUTHORIZED/REMOVE":
      return { ...state, authorized: false };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        authorized: true,
        isLoading: false,
      };

    case "LOADING":
      return { ...state, isLoading: true };
    case "LOADED":
      return { ...state, isLoading: false };
    case "LOGOUT":
      return { ...state, user: null, authorized: false, isLoading: false };
    default:
      return state;
  }
}
export function UserProvider({ children }: UserProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  axios.defaults.withCredentials = true;
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:5001/auth/user");

        if (res.data.success) {
          const user = res.data.user;
          dispatch({ type: "LOGIN_SUCCESS", payload: user });
        }
      } catch (e) {
        console.log(e);
      } finally {
        dispatch({ type: "LOADED" });
      }
    };
    checkAuth();
  }, []);

  // --- Logout function ---
  const logout = async () => {
    try {
      await axios.post("http://localhost:5001/auth/logout");
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      dispatch({ type: "LOGOUT" });
    }
  };
  return (
    <UserContext.Provider value={{ state, dispatch, logout }}>
      {children}
    </UserContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("usePokemon must be used within a PokemonProvider");
  }
  return context;
}
