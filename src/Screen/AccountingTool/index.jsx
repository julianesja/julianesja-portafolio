import UploadFile from "../../components/AccountingTool/UploadFile";
import "./style.css";

const AccountingTool = () => {
  return (
    <>
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
          <UploadFile name={"extracto"} text={"Seleccione un archivo"} />
          <button title="Enviar" type="submit" className="sign-in_btn">
            <span>Enviar</span>
          </button>

          <p className="note">Terms of use &amp; Conditions</p>
        </form>
      </div>
    </>
  );
};
export default AccountingTool;
