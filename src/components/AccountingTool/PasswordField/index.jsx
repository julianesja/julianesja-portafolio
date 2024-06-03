import { useState } from "react";
import "./style.css";
const PasswordField = (name) => {
  const [value, setValue] = useState("");
  return (
    <>
      <label>Ingrese una contraseña si el documento la tiene</label>
      <input
        type="password"
        placeholder="Password"
        name={name}
        value={value}
        className="input"
        onChange={(e) => setValue(e.target.value)}
      ></input>
    </>
  );
};
export default PasswordField;
