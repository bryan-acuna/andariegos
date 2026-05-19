import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";
import { useToast } from "../../components";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";
import "./AdminAbout.css";

function AdminAbout() {
  useDocumentTitle("Editar Sobre mí · Andariegos");
  const { toast } = useToast();
  const navigate = useNavigate();

  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    supabase
      .from("site_content")
      .select("value")
      .eq("key", "about_bio")
      .single()
      .then(({ data, error }) => {
        if (!error && data) setBio(data.value);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from("site_content").upsert({
      key: "about_bio",
      value: bio,
      updated_at: new Date().toISOString(),
    });

    if (error) {
      toast("error", "Error al guardar", error.message);
    } else {
      toast(
        "success",
        "Cambios guardados",
        "El texto fue actualizado correctamente.",
      );
    }
    setSaving(false);
  };

  return (
    <div className="admin-about-page">
      <div className="admin-about-header">
        <button className="btn-back" onClick={() => navigate("/admin")}>
          ← Volver al panel
        </button>
        <h1>Editar Sobre mí</h1>
        <p className="admin-about-hint">
          Cada línea en blanco separa un párrafo. El texto se mostrará tal como
          lo escribas.
        </p>
      </div>

      {loading ? (
        <p className="admin-about-loading">Cargando contenido...</p>
      ) : (
        <div className="admin-about-form">
          <textarea
            className="admin-about-textarea"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={18}
            placeholder="Escribe tu biografía aquí..."
            spellCheck
          />
          <div className="admin-about-actions">
            <button
              className="btn-back-secondary"
              onClick={() => navigate("/admin")}
            >
              Cancelar
            </button>
            <button
              className="btn-save-about"
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? "Guardando..." : "Guardar cambios"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAbout;
