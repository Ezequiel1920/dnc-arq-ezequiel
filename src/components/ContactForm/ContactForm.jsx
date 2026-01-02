import { useContext, useState, useEffect } from 'react';
import './ContactForm.css';

// COMPONENTS
import Button from '../Button/Button';

// CONTEXT
import { AppContext } from "../../contexts/AppContext"


function ContactForm() {
    const appContext = useContext(AppContext)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [isFormValid, setIsFormValid] = useState(false);
    const [formSubmitLoading, setFormSubmitLoading] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formError, setFormError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!isFormValid) return;

        setFormSubmitLoading(true);
        setFormError(null);

        try {
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    access_key: "7923f46d-43d7-4766-b461-22fab9e5a02b"
                })
            });

            if (response.ok) {
                setFormSubmitted(true)
            } else {
                alert('Erro ao enviar!')
            }
        } catch (e) {
            alert('Erro: ', e)
        } finally {
            setFormSubmitLoading(false)
        }
    }

    useEffect(() => {
        const isValidEmail = (email) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        };

        const isValid =
            formData.name.trim() !== '' &&
            formData.email.trim() !== '' &&
            isValidEmail(formData.email) &&
            formData.message.trim() !== '';

        setIsFormValid(isValid);
    }, [formData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
        // reset de estados opcionais ao digitar
        setFormSubmitted(false);
        setFormError(null);
    };

    return (
        <div className="contact-form d-flex fd-column al-center">
            <h2>{appContext.languages[appContext.language].contact.title}</h2>
            {formError && <div className="form-error">{formError}</div>}

            <form onSubmit={handleSubmit}>
                <div className="d-flex form-group">
                    <input
                        className="form-input"
                        type="text"
                        id="name"
                        name="name"
                        placeholder={appContext.languages[appContext.language].contact.pl1}
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <input
                        className="form-input"
                        type="text"
                        id="email"
                        name="email"
                        placeholder={appContext.languages[appContext.language].contact.pl2}
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>

                <div className="d-flex form-group">
                    <textarea
                        className="form-input"
                        id="message"
                        name="message"
                        placeholder={appContext.languages[appContext.language].contact.pl3}
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                    />
                </div>

                <div className="al-center d-flex jc-end form-group">
                    {formSubmitted && <p className="text-primary">{appContext.languages[appContext.language].contact.sucessMsg}</p>}
                    <Button type="submit" buttonStyle="secondary" disabled={!isFormValid || formSubmitLoading}>
                        {appContext.languages[appContext.language].general.send}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default ContactForm;
