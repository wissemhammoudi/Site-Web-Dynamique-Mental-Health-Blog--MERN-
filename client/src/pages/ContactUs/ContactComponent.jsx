import React, { useState } from 'react';
import styles from './ContactComponent.module.css';

function ContactComponent() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        topic: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/send-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                alert('Form submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    topic: '',
                    message: ''
                });
            } else {
                alert('Failed to submit form. Please try again later.');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleReset = () => {
        setFormData({
            name: '',
            email: '',
            topic: '',
            message: ''
        });
    };

    return (
        <div className={styles.containerPro}>
        <div className={styles.background}>
            <div className={styles.container}>
                <div className={styles.screen}>
                    <form className={styles.screen_body} onSubmit={handleSubmit} onReset={handleReset}>
                        <div className={styles.screen_body_item_left}>
                            <div className={styles.app_title}>
                                <span>We're all</span>
                                <span>ears</span>
                            </div>
                            <div className={styles.app_contact}><b>Contact information : </b>mind.span.team@gmail.com</div>
                        </div>
                        <div className={styles.screen_body_item}>
                            <div className={styles.app_form}>
                                <div className={styles.app_form_group}>
                                    <input className={styles.app_form_control} placeholder="Name" name="name" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className={styles.app_form_group}>
                                    <input className={styles.app_form_control} placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
                                </div>
                                <div className={styles.app_form_group}>
                                    <input className={styles.app_form_control} placeholder="Topic" name="topic" value={formData.topic} onChange={handleChange} />
                                </div>
                                <div className={styles.app_form_group_message}>
                                    <input className={styles.app_form_control} placeholder="Message" name="message" value={formData.message} onChange={handleChange} />
                                </div>
                                <div className={styles.app_form_group_buttons}>
                                    <button className={styles.app_form_button} type="reset">Cancel</button>
                                    <button className={styles.app_form_button} type="submit">Send</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ContactComponent;
