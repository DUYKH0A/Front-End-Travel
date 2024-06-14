import { createContext, useEffect, useReducer } from "react";

const initial_state = {
  user:
    localStorage.getItem("user") !== undefined
      ? JSON.parse(localStorage.getItem("user"))
      : null,
  loading: false,
  error: null,
};

export const AuthContext = createContext(initial_state);

const AuthRecuder = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      console.log("login-ok-start");
      return {
        user: null,
        loadingL: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      console.log("login-ok");
      return {
        user: action.payload,
        loadingL: false,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        loadingL: false,
        error: action.payload,
      };
    case "REGISTER_SUCCESS":
      return {
        user: null,
        loadingL: false,
        error: null,
      };
    case "LOGOUT":
      return {
        user: null,
        loadingL: false,
        error: null,
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthRecuder, initial_state);

  useEffect(() => {
    if (state.user !== null) {
      // Chỉ lưu dữ liệu khi người dùng đã đăng nhập
      localStorage.setItem("user", JSON.stringify(state.user));
    }
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
