import "./style.css";

interface ContactProps {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  createdAt: string;
  updatedAt: string;
}

const ContactCard = ({
  id,
  name,
  email,
  phoneNumber,
  createdAt,
  updatedAt,
}: ContactProps) => {
  return (
    <div className="contact-card" id={id}>
      <p>{name}</p>
      <a className="hide-mobile" href={`mailto:${email}`}>
        {email}
      </a>
      <a className="hide-mobile" href={`tel:${phoneNumber}`}>
        {phoneNumber}
      </a>
    </div>
  );
};

export default ContactCard;
