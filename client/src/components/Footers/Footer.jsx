import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Footer.css';
import { IonIcon } from '@ionic/react';
import { chevronForwardOutline } from 'ionicons/icons';
import { logoFacebook, logoInstagram, logoLinkedin } from 'ionicons/icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
          try {
            const res = await axios.get('/api/categories/getcategories');
            if (res.status === 200) {
              setCategories(res.data);
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
        fetchCategories();
      }, []);
    
  return (
    <div className='allfoot'>
        
        <div className='footercontainer' >
      
            <div className='containerfooter'>
                <div className='description'>
                    <div className='elementdes'><h3 style={{fontSize:'1.4rem'}}><b style={{color:'black'}}>Mind</b>span</h3></div>
                    <div className='des'><p>Mindspan est un projet créé par des enthousiastes de la santé mentale qui vise à guider les parents dans l'éducation de leurs enfants en fournissant des outils pratiques pour créer un environnement sain et épanouissant.  </p></div>
                    
                    <div className='containersocial'> 
                        <div> <IonIcon icon={logoFacebook}style={{ fontSize: '25px', margin: '0 10px' }} /></div>
                        <div>      <IonIcon icon={logoInstagram} style={{ fontSize: '25px', margin: '0 10px' }}/></div>
                        <div>      <IonIcon icon={logoLinkedin} style={{ fontSize: '25px', margin: '0 10px' }}/></div>
                    </div>
                </div>
                <div className='conatinercategories'>
            <div className='titlecateg'>
             <Link to='/Evenement'>
              <h3>Événements</h3>
              </Link>
            </div>
            {categories
  .filter(category => category.catego.toLowerCase() === 'santé et mentale')
  .slice(0, 5) 
  .map((category, index) => (
              <div className='boxcateg' key={index}>
                <Link to={`/Evenement?searchTerm=&sort=desc&category=événements&subcategory=${category.name.replace(/ /g, '+')}`}>
                <IonIcon icon={chevronForwardOutline} id='iconcart' />
                <span>{category.name}</span>
                </Link>
              </div>
            ))}
          </div>

          <div className='conatinercategories'>
            <div className='titlecateg'>
              <Link to="/ParentEtEnfant">
              <h3>Parent et enfant</h3>
              </Link>
            </div>
            {categories
                  .filter(category => category.catego.toLowerCase() === 'parent et enfants')
                  .slice(0, 5) 
                  .map((category, index) => (
              <div className='boxcateg' key={index}>
                <Link to={`/ParentEtEnfant?searchTerm=&sort=desc&category=événements&subcategory=${category.name.replace(/ /g, '+')}`}>
                <IonIcon icon={chevronForwardOutline} id='iconcart' />
                <span>{category.name}</span>
                </Link>
              </div>
            ))}
          </div>

          <div className='conatinercategories'>
            <div className='titlecateg'>
              <Link to='/MentalHelath'>
              <h3>Santé Mentale</h3>
              </Link>
            </div>
            {categories
            .filter(category => category.catego.toLowerCase() === 'événements')
            .slice(0, 5) 
            .map((category, index) => (
              <div className='boxcateg' key={index}>
                <Link to={`/MentalHelath?searchTerm=&sort=desc&category=événements&subcategory=${category.name.replace(/ /g, '+')}`}>
                <IonIcon icon={chevronForwardOutline} id='iconcart' />
                <span>{category.name}</span>
                </Link>
              </div>
            ))}
          </div>        
          <div className='conatinercategories'>
            <div className='titlecateg'>
              <Link to='/cabinet'>
              <h3>Cabinets</h3>
              </Link>
            </div>
            <div className='boxcateg'>
              <Link to="/cabinet?adresse=Tunis">
              <IonIcon icon={chevronForwardOutline} id='iconcart' /><span>Tunis</span>
              </Link>
              </div>
            <div className='boxcateg'>
              <Link to="/cabinet?adresse=Bizerte">
              <IonIcon icon={chevronForwardOutline} id='iconcart' /><span>Bizerte</span>
              </Link>
              </div>
            <div className='boxcateg'>
              <Link to="/cabinet?adresse=Sousse">
              <IonIcon icon={chevronForwardOutline} id='iconcart' /><span>Sousse</span>
              </Link>
              </div>
            <div className='boxcateg'>
              <Link to="/cabinet?adresse=Mahdia">
              <IonIcon icon={chevronForwardOutline} id='iconcart' /><span>Mahdia</span>
              </Link>
              </div>
          


          </div> 
<div className='containercategres'>
  <div>
    <div className='boxcateg'>
      <IonIcon icon={chevronForwardOutline} id='iconcart' />
      <Link to="/MentalHelath"><span>Santé mentale</span></Link>
    </div>
    <div className='boxcateg'>
      <IonIcon icon={chevronForwardOutline} id='iconcart' />
      <Link to="/ParentEtEnfan"><span>Parent et enfant</span></Link>
    </div>
    <div className='boxcateg'>
      <IonIcon icon={chevronForwardOutline} id='iconcart' />
      <Link to="/ParentEtEnfan"><span>Événements</span></Link>
    </div>
    <div className='boxcateg'>
      <IonIcon icon={chevronForwardOutline} id='iconcart' />
      <Link to="/cabinet"><span>Cabinets</span></Link>
    </div>
    <div className='boxcateg'>
      <IonIcon icon={chevronForwardOutline} id='iconcart' />
      <Link to="/"><span>Accueil</span></Link>
    </div>
    <div className='boxcateg'>
      <IonIcon icon={chevronForwardOutline} id='iconcart' />
      <Link to="/FAQ"><span>FAQ</span></Link>
    </div>
    <div className='boxcateg'>
      <IonIcon icon={chevronForwardOutline} id='iconcart' />
      <Link to="/aboutUs"><span>À propos de nous</span></Link>
    </div>
    <div className='boxcateg'>
      <IonIcon icon={chevronForwardOutline} id='iconcart' />
      <Link to="/contact"><span>Nous contacter</span></Link>
    </div>
  </div>
</div>

               
                
            </div>
            <div className='cpoyrights'> 
                <div className='ecje'><span>&copy; <a href="https://www.facebook.com/enetcomje"> ENETCom Junior Entreprise </a></span></div>
                <div className='moreinfo'>
                    <div>
                    <Link to="contact">
                      <span>Nous contacter</span>
                    </Link>
                    <Link to="/aboutUs">
                      <span>À propos de nous</span>
                    </Link>
                    <Link to="/policy">
                      <span>Politique de confidentialité</span>
                    </Link>
                    </div>
                </div>
            </div>
            
        </div>

    </div>
  )
}

export default Footer