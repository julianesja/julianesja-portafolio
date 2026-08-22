import React, { useState, useEffect } from "react";
import PasswordField from "../PasswordField/PasswordField";
import UploadFile from "../UploadFile/UploadFile";
import { appCheck } from "../../config/firebase";
import { getToken } from "firebase/app-check";
import "./AccountingTool.css";

const AccountingTool = () => {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const favicon = document.querySelector("link[rel~='icon']");
    const originalFavicon = favicon ? favicon.href : "";
    const originalType = favicon ? favicon.getAttribute("type") || "" : "";
    if (favicon) {
      favicon.href = "/logo-conciliador.jpeg";
      favicon.setAttribute("type", "image/jpeg");
    }

    return () => {
      if (favicon && originalFavicon) {
        favicon.href = originalFavicon;
        if (originalType) {
          favicon.setAttribute("type", originalType);
        } else {
          favicon.removeAttribute("type");
        }
      }
    };
  }, []);


  const handleSubmit = async (e) => {

    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const formData = new FormData(e.target);
    const file = formData.get("file");

    if (!file || file.size === 0) {
      setErrorMsg("Por favor seleccione un archivo PDF de extracto válido.");
      setLoading(false);
      return;
    }

    try {
      const headers = {};

      // Obtener el token firmado de Firebase App Check si está configurado
      if (appCheck) {
        try {
          const appCheckTokenResult = await getToken(appCheck, false);
          headers["X-Firebase-AppCheck"] = appCheckTokenResult.token;
        } catch (appCheckErr) {
          console.warn("No se pudo obtener el token de App Check:", appCheckErr);
        }
      }

      const endpoint =
        import.meta.env.VITE_API_CONCIL_BANCOLOMBIA ||
        "https://us-central1-julianesja-da579.cloudfunctions.net/reconciliationTool";

      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        body: formData,
      });

      if (!response.ok) {
        let errJson = {};
        try {
          errJson = await response.json();
        } catch (_jsonErr) {
          // Si el cuerpo no es JSON válido, continua con el fallback por defecto
        }
        throw new Error(errJson.error || `Error al procesar la conciliación (Código: ${response.status})`);
      }

      // Descargar el archivo Excel (.xlsx) resultante
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const bankSelected = formData.get("bank") || "banco";
      a.download = `reporte_${bankSelected.toString().toLowerCase()}_${Date.now()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Error en conciliación:", err);
      setErrorMsg(err.message || "Error al procesar el archivo. Verifique la conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="accounting-tool-body">
      <form
        className="form_container"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
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

        <div className="input_container">
          <label htmlFor="bank_select" className="input_label">
            Seleccione el Banco
          </label>
          <select
            id="bank_select"
            name="bank"
            className="bank_select"
            defaultValue="Bancolombia"
          >
            <option value="Bancolombia">Bancolombia</option>
            <option value="Davivienda">Davivienda</option>
            <option value="itau">Itaú</option>
          </select>
        </div>

        {errorMsg && (
          <p
            className="error-message"
            style={{
              color: "#ef4444",
              fontSize: "0.875rem",
              textAlign: "center",
              marginTop: "0.5rem"
            }}
          >
            {errorMsg}
          </p>
        )}

        <button title="Enviar" type="submit" className="sign-in_btn" disabled={loading}>
          <span>{loading ? "Procesando Excel..." : "Enviar"}</span>
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
