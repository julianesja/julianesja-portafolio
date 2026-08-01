import React, { useState } from "react";
import "./PasswordField.css";

const PasswordField = (name) => {
  const [value, setValue] = useState("");
  return (
    <>
      <label>Ingrese una contraseña si el documento la tiene</label>
      <input
        type="password"
        placeholder="Password"
        name={typeof name === "string" ? name : "password"}
        value={value}
        className="input"
        onChange={(e) => setValue(e.target.value)}
      />
    </>
  );
};

export default PasswordField;
