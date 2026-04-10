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
  );
}

export default Contact;
