import * as Form from "@radix-ui/react-form";
import "./Contact.css";
import { useDocumentTitle } from "../../hooks/useDocumentTitle";

function Contact() {
  useDocumentTitle("Contactar · Andariegos");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log(data);
  };

  return (
    <div className="contact-page">
      {/* Left — intro + contact info */}
      <div className="contact-left">
        <p className="contact-eyebrow">ESTAMOS AQUÍ PARA AYUDARTE</p>
        <h1 className="contact-title">
          <strong>Hablemos</strong> sobre tu próxima aventura
        </h1>
        <p className="contact-lead">
          ¿Tienes preguntas o quieres colaborar? Escríbeme y te responderé lo antes posible.
        </p>

        <div className="contact-info">
          <div className="contact-info-item">
            <span className="contact-info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </span>
            <div>
              <p className="contact-info-label">Ubicación</p>
              <p className="contact-info-value">Houston, Texas</p>
            </div>
          </div>

          <div className="contact-info-item">
            <span className="contact-info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </span>
            <div>
              <p className="contact-info-label">Email</p>
              <a className="contact-info-value" href="mailto:clever_a@gmail.com">clever_a@gmail.com</a>
            </div>
          </div>

          <div className="contact-info-item">
            <span className="contact-info-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92z"/>
              </svg>
            </span>
            <div>
              <p className="contact-info-label">Teléfono</p>
              <a className="contact-info-value" href="tel:+12817931635">281-793-1635</a>
            </div>
          </div>
        </div>
      </div>

      {/* Right — form card */}
      <div className="contact-right">
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

          <Form.Submit className="form-submit">Enviar mensaje</Form.Submit>
        </Form.Root>
      </div>
    </div>
  );
}

export default Contact;
