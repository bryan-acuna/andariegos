import * as Form from "@radix-ui/react-form";
import "./Contact.css";

function Contact() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
  };

  return (
    <div className="contact-page">
      {/* Left — form */}
      <div className="contact-left">
        <h1>Contactar</h1>
        <Form.Root className="contact-form" onSubmit={handleSubmit}>
          <Form.Field className="form-field" name="nombre">
            <div className="form-label-row">
              <Form.Label className="form-label">Nombre</Form.Label>
              <Form.Message className="form-message" match="valueMissing">
                Por favor ingresa tu nombre
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="form-input" type="text" placeholder="Tu nombre" required />
            </Form.Control>
          </Form.Field>

          <Form.Field className="form-field" name="email">
            <div className="form-label-row">
              <Form.Label className="form-label">Email</Form.Label>
              <Form.Message className="form-message" match="valueMissing">
                Por favor ingresa tu email
              </Form.Message>
              <Form.Message className="form-message" match="typeMismatch">
                Ingresa un email válido
              </Form.Message>
            </div>
            <Form.Control asChild>
              <input className="form-input" type="email" placeholder="tu@email.com" required />
            </Form.Control>
          </Form.Field>

          <Form.Field className="form-field" name="mensaje">
            <div className="form-label-row">
              <Form.Label className="form-label">Mensaje</Form.Label>
              <Form.Message className="form-message" match="valueMissing">
                Por favor escribe tu mensaje
              </Form.Message>
            </div>
            <Form.Control asChild>
              <textarea className="form-textarea" placeholder="Tu mensaje..." rows={5} required />
            </Form.Control>
          </Form.Field>

          <Form.Submit className="form-submit">Enviar</Form.Submit>
        </Form.Root>
      </div>

      {/* Divider */}
      <div className="contact-divider" />

      {/* Right — socials */}
      <div className="contact-right">
        <h1>Sígueme</h1>
        <div className="social-list">
          <a
            href="https://instagram.com/andariegos_mundo"
            target="_blank"
            rel="noopener noreferrer"
            className="social-item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
            </svg>
            <div>
              <p className="social-name">Instagram</p>
              <p className="social-handle">@andariegos_mundo</p>
            </div>
          </a>

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
            <div>
              <p className="social-name">Facebook</p>
              <p className="social-handle">Andariegos</p>
            </div>
          </a>

          <a
            href="https://yourwebsite.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            <div>
              <p className="social-name">Sitio web</p>
              <p className="social-handle">yourwebsite.com</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Contact;
