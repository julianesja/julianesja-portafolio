import React from "react";
import PasswordField from "../PasswordField/PasswordField";
import UploadFile from "../UploadFile/UploadFile";
import "./AccountingTool.css";

const AccountingTool = () => {
  return (
    <div className="accounting-tool-body">
      <form
        className="form_container"
        method="POST"
        action={import.meta.env.VITE_API_CONCIL_BANCOLOMBIA}
        encType="multipart/form-data"
        content-type="multipart/form-data"
      >
        <div className="title_container">
          <p className="title">Accounting Tools</p>
          <span className="subtitle">
            {
              "Esta aplicación no guarda información de ningún tipo. El único propósito de su creación fue con fines educativos"
            }
          </span>
        </div>
        <br />
        <UploadFile name={"file"} text={"Seleccione un archivo"} />
        <PasswordField name={"password"} />
        <input type="hidden" name="bank" value="Bancolombia" />
        <button title="Enviar" type="submit" className="sign-in_btn">
          <span>Enviar</span>
        </button>

        <p className="note">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.google.com/document/d/1TSUmd5TI4IrEsRRwrZ6l99fbTSooMXm7Mh2GS71-DEY/edit?usp=sharing"
          >
            Terms of use &amp; Conditions
          </a>
        </p>
      </form>
    </div>
  );
};

export default AccountingTool;
