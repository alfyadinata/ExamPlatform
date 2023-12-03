import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/main/Button";
import Input from "components/main/Input/input";
import { userLogin } from "store/actions/auth";
import { useHistory } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.currentUser);
  const [credentials, setCredentials] = useState({ username: "", password: "" });

  useEffect(() => {
    if (user) history.push("/dashboard");
  }, [user]);

  const handleInputChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    dispatch(userLogin(credentials));
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-96 p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div className="mb-4">
          <Input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-4">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleInputChange}
          />
        </div>
        <Button onClick={handleLogin} className="w-full">
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
