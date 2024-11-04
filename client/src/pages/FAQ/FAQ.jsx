import React, { useState, useEffect } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronDownOutline, chevronUpOutline } from 'ionicons/icons';
import './FAQ.css'; // Import your CSS file

const FAQ = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = ['faq1.png', 'faq2.png', 'faq4.png']; // Replace with your image filenames

    useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, 4000);
        return () => clearInterval(intervalId);
    }, []);

    const [Faq, setFaq] = useState([
        {
          question: "Quel est le but de ce site web?",
          answer:
            "Ce site est dédié à sensibiliser le public à la santé mentale et à fournir des ressources pour soutenir le bien-être mental et à fournir un espace d’informations pour les parents. Nous visons à éduquer les individus, à réduire la stigmatisation entourant les problèmes de santé mentale et à mettre en relation les gens avec des informations et un soutien précieux.",
        },
        {
          question: "Quel type de contenu puis-je trouver sur le site web?",
          answer:
            "Notre site propose une gamme variée de contenus, y compris des articles, des blogs et des ressources liées à la santé mentale. Vous pouvez explorer des sujets tels que les stratégies de gestion du stress, les techniques d'auto-soin, la compréhension des maladies mentales et des conseils pour maintenir le bien-être émotionnel.",
        },
        {
          question: "Les articles et blogs sont-ils rédigés par des professionnels?",
          answer:
            "Oui, nos articles et blogs sont rédigés par des professionnels qualifiés dans le domaine de la santé mentale, y compris des psychologues, des thérapeutes, des conseillers et des défenseurs de la santé mentale. Nous nous efforçons de fournir un contenu précis, informatif et basé sur des preuves à notre public.",
        },
        {
          question: "Comment puis-je trouver un thérapeute via ce site web?",
          answer:
            "Nous proposons un répertoire de thérapeutes où vous pouvez rechercher des thérapeutes agréés et des professionnels de la santé mentale dans votre région. Il vous suffit d'indiquer votre emplacement et vos préférences pour trouver des thérapeutes spécialisés dans des domaines pertinents à vos besoins.",
        },
        {
          question: "Comment puis-je soutenir la sensibilisation à la santé mentale via ce site web?",
          answer:
            "Il existe plusieurs façons de soutenir la sensibilisation à la santé mentale via notre site web. Vous pouvez interagir avec notre contenu, partager des articles et des ressources avec d'autres personnes, participer à des discussions et plaider en faveur de la sensibilisation à la santé mentale dans votre communauté.",
        },
        {
          question: "Y a-t-il des ressources disponibles pour des conditions de santé mentale spécifiques?",
          answer:
            "Oui, nous proposons des ressources et des informations sur une variété de conditions de santé mentale, y compris l'anxiété, la dépression, le trouble bipolaire, le PTSD, le TOC, et plus encore. Vous pouvez trouver des articles, des guides et des ressources de soutien adaptés à des préoccupations spécifiques en matière de santé mentale.",
        },
        {
          question: "Le contenu du site web est-il destiné à remplacer les conseils ou le traitement professionnels?",
          answer:
            "Non, le contenu de notre site web ne remplace pas les conseils médicaux ou psychologiques professionnels, le diagnostic ou le traitement. Il est destiné à des fins informatives uniquement. Si vous rencontrez des problèmes de santé mentale, nous vous encourageons à demander du soutien à un professionnel de la santé qualifié.",
        },
        {
          question: "Comment puis-je rester informé des nouveaux contenus et des mises à jour du site web?",
          answer:
            "Pour rester informé des derniers articles, blogs et annonces, vous pouvez vous abonner à notre newsletter ou nous suivre sur les plateformes de médias sociaux. Nous partageons régulièrement de nouveaux contenus et des mises à jour pour maintenir notre public informé et engagé.",
        },
      ]);
      
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleActive = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="containerfaqpro">
            
            <div className="containerfaqimg">
                <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
            </div>
            <div className="containerfaq">
                <div className="titlefaq">
                    <h2 id="faqtitre">Questions fréquemment posées</h2>
                    <p id="desfaq">Nous sommes là pour répondre à toutes vos questions et vous fournir les informations dont vous avez besoin.</p>
                </div>
                <div className="minicontainerfaq">
                    {Faq.map((item, index) => (
                        <div key={index} className="containerqa">
                            <div className="questioncontainer">
                                <div className="question">
                                    <div className="ques">
                                        <h2 className="titleq" onClick={() => toggleActive(index)}>
                                            {item.question}
                                            {activeIndex === index ? (
                                              <IonIcon icon={chevronUpOutline}  />
                                            ) : (
                                                <IonIcon icon={chevronDownOutline} className="arrowdown" />
                                            )}
                                        </h2>
                                    </div>
                                    {activeIndex === index && (
                                    <div className="rep">
                                            <p>{item.answer}</p>
                                    </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default FAQ;
