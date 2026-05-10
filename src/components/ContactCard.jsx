export const ContactCard = ({contact}) =>{

    return(
        <div className="contact-card">
            <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-field">✉️ {contact.email}</div>
                <div className="contact-field">📱 {contact.phone}</div>
                <div className="contact-field">📍 {contact.address}</div>
            </div>
            <div className="contact-actions">
                <button>✏️</button>
                <button>🗑️</button>
            </div>
        </div>
    )
}