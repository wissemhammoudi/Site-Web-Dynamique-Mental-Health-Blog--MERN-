import { useRef, useState } from 'react'
import styles from './HomeComponent.module.css'
import { FaHeart } from 'react-icons/fa';
import { FaStreetView } from "react-icons/fa";
import { FaBook} from 'react-icons/fa';
import { FaExchangeAlt } from 'react-icons/fa';
import axios from 'axios';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AudioPlayer from '../../components/musicplayer/AudioPLayer';
import aud from './scp.mp3'
import { Button } from 'flowbite-react';
import RecentPost from '../RecentPost';
export default function Home() {
    const [clickedFilterIndex, setClickedFilterIndex] = useState(10000);
  const [newsletters, setNewsletters] = useState([]);
  const [newSubscriberEmail, setNewSubscriberEmail] = useState('');
const handleAddSubscriber = async () => {
    try {
      const res = await axios.post('/api/newsletters/emails/add', { email: newSubscriberEmail });
      if (res.status === 201) {
        setNewsletters([...newsletters, res.data]); 
         setNewSubscriberEmail('');
         alert(`Votre abonnement à l'adresse e-mail ${newSubscriberEmail} a été effectué avec succès !`);      }
    } catch (error) {
      console.error("Error adding subscriber:", error);
      alert('Échec de labonnement. Veuillez réessayer plus tard.');    }
  };
  
  

  //get categories
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get('/api/categories/getcategories');
        if (res.status === 200) {
          setCategories(res.data);
        }
      } catch (error) {
        alert("an error happened")
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);
  const handleClick = (index) => {
    setClickedFilterIndex(index);
};

const [titles, setTitles] = useState([
  {
    titre: "Découvrez le bien-être mental : ",
    description:"là où le savoir rencontre la compassion, et où le soutien s'épanouit"
  },
  {
    titre: "Cultivating Mental Toughness",

  },
  {
    titre: "Naviguer dans le bien-être mental : ",
    description:"là où la compréhension rencontre la guérison et où la communauté prospère."
  },
  {
    titre: "Un sanctuaire pour la santé mentale : ",
    description:"où le soutien grandit, la compréhension approfondit et la guérison commence."
  },
  {
    titre: "Nourrir les esprits, inspirer les cœurs : ",
    description:'votre compagnon compatissant sur le chemin du bien-être mental.'
  },
]);


const [currentTitleIndex, setCurrentTitleIndex] = useState(0);



useEffect(() => {
    const interval = setInterval(() => {
        setCurrentTitleIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 4000);
    return () => clearInterval(interval);
}, [titles]);
const [totalPosts, setTotalPosts] = useState(0);
const [totalCategories, setTotalCategories] = useState(0);
const [totalCabinets,setTotalCabinets] = useState(0);

useEffect(() => {
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`/api/post/getposts?`);
      if (res.status === 200) {
        const data = res.data;
        setTotalPosts(data.totalPosts);
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get('/api/categories/getcategories');
      if (res.status === 200) {
        setTotalCategories(res.data.length);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchCabinets = async () => {
    try {
        const res = await axios.get(`/api/cabinet/getCabinets`);
        if (res.status === 200) {
            const data = res.data; // Extract data from the response
            setTotalCabinets(data.totalCabinets); // Set total number of cabinets
        } else {
            throw new Error('Failed to fetch data');
        }
    } catch (error) {
        console.error('Error fetching cabinets:', error);
    }
};




  fetchCabinets();
  fetchCategories();
  fetchPosts();
}, []);


const [category, setCategory] = useState('événements');
  const categoriesswitch = ['événements', 'Parent et enfants', 'Santé et Mentale']; // Add your desired categories here

  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextCategoryIndex = (categoriesswitch.indexOf(category) + 1) % categoriesswitch.length;
      setCategory(categoriesswitch[nextCategoryIndex]);
    }, 4000); 

    return () => clearInterval(intervalId); 
  }, [category, categoriesswitch]);
  return (
    <div>
    <div className={styles.hero}>
        <div className={styles.background_image}>
            <img src='home_bg.jpg' alt="" style={{ width: '100%', height: '82vh', objectFit: 'cover' }} />
            {titles.map((item, index) => (
            <div key={index} className={styles.hero_content_area}>
                <h1>{titles[currentTitleIndex].titre}</h1>
                <h3 style={{fontSize:'1.5erm'}}>{titles[currentTitleIndex].description}</h3>

                <Link to='/search'>
                    <Button style={{ backgroundColor: '#D294BB' }} 
                            className="focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color">
                        Découvrir plus
                    </Button>
                </Link>
            </div>
            ))}
        </div>
    </div>
    <div className={styles.containerdestination} style={{paddingBottom:"40px"}}> 
        <div className={styles.conimgpurp}><img src='femme.jpg'></img> </div>
        <div className={styles.destinations}>
            <h3 className={styles.newtit}>Vous méritez d'être en bonne santé mentale</h3>
            <p className={styles.newpurpp}>Dédié à votre bien-être, notre mission est de vous fournir les connaissances et les outils essentiels pour renforcer votre santé mentale.
                Nous nous engageons à fournir les outils essentiels pour renforcer votre santé mentale.
                À votre bien-être, notre mission est de vous fournir les connaissances et les outils essentiels pour renforcer votre santé mentale.
                Nous nous engageons à vous donner des idées et des capacités précieuses, en veillant à ce que votre parcours vers un bien-être amélioré soit soutenu et guidé à chaque étape du chemin.</p>
            <p className={styles.respp}>Dédié à votre bien-être, notre mission est de vous fournir les connaissances et les outils essentiels pour renforcer votre santé mentale.
                Nous nous engageons à vous donner des idées et des capacités précieuses,</p>

            <div className={styles.congetget}>
                <Link to='/sign-up'>
                    <Button style={{ backgroundColor: '#D294BB' }} 
                            className="focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color">
                        Commencer
                    </Button>
                </Link>
            </div>
        </div>
    </div>
    <div className={styles.packages}>
        <h3 className={styles.title} style={{padding:'30px 0px'}}>Autorité transparente en matière de santé</h3>
        <p style={{ padding:'10px 10px'}}>Nous sommes fiers d'être reconnus comme un fournisseur fiable et sans but lucratif d'informations de qualité sur la santé..</p>
        <div className={styles.grid}>
    <li className='shadowcarta'>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <FaExchangeAlt style={{fontSize:'3rem',textAlign:'center'}}/>
        </div>   
        <h4>Guidance fiable</h4>
        <p>Des conseils fiables pour vous aider à naviguer dans votre vie quotidienne et à surmonter les défis.</p>
    </li>
    <li>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <FaStreetView  style={{fontSize:'3rem',textAlign:'center'}}/>
        </div>   
        <h4>Cultiver les compétences de vie</h4>
        <p>Apprenez à développer les compétences nécessaires pour réussir dans tous les aspects de votre vie.</p>
    </li>
    <li>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <FaBook style={{fontSize:'3rem',textAlign:'center'}}/>
        </div>   
        <h4>Stratégies pour se sentir mieux</h4>
        <p>Découvrez des stratégies efficaces pour améliorer votre bien-être émotionnel et mental.</p>
    </li>
    <li>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <FaHeart  style={{fontSize:'3rem',textAlign:'center'}}/>
        </div>   
        <h4>Soutien fiable</h4>
        <p>Un soutien fiable est essentiel pour vous aider à traverser les moments difficiles et à vous sentir soutenu.</p>
    </li>
</div>

        <hr />
    </div> 
    <div className={styles.containcomptourpromax}>
        <div className={styles.title}>
            <h1 style={{padding:'20px 0px'}}>Vous autonomiser avec nos <Link to='./cabinet'><span style={{color:"#873260"}}> thérapeutes </span></Link> à travers la sensibilisation à <Link to='MentalHelath'><span style={{color:"#873260"}}> la santé mentale </span> </Link></h1>
            <p style={{padding:'20px 30px'}}>Nous sommes en mission pour fournir un soutien complet en matière de santé mentale. Notre équipe passionnée de professionnels est dédiée à favoriser votre bien-être et votre santé mentale..</p>
        </div> 
        <div className={styles.containcomptour}>
            <div className={styles.containlescomptour}>
                <div style={{textAlign:'center'}}>
                    <div className={styles.comptourwahda}>
                        <img src='innovation.png'></img>
                        <span style={{color:'#873260'}} >{totalCategories}+</span>
                        <span>Catégories</span>
                    </div>
                </div>
                <div style={{textAlign:'center'}}>
                    <div className={styles.comptourwahda} >
                        <img src='article.png' alt='test' ></img>
                        <span style={{color:'#873260'}} >{totalPosts}+</span><span>Articles</span>
                    </div>
                </div>
                <div style={{textAlign:'center'}}>
                    <div className={styles.comptourwahda}>
                        <img src='building.png'></img>
                        <span style={{color:'#873260'}} >{totalCabinets}+</span>
                        <span>Cabinets</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <div>
            <RecentPost category={category} subcategory=''/>
        </div>
    </div>
    <div className={styles.containhelptoday} >
        <h3 className={styles.title} style={{padding:'20px 0px'}}>Trouvez l'aide dont vous avez besoin aujourd'hui</h3>
        <div className={styles.subscribe}>
            <h2 className={styles.subscribe__title}>Choisissez un sujet ci-dessous que vous souhaitez explorer :</h2>
            <div className="flex justify-center lg:justify-evenly flex-col lg:flex-row w-full">               
                <div>
                    <div>
                        <h3 style={{ color: '#873260', padding: '10px', textAlign: 'center', fontSize: '2rem' }}>
                            Événement</h3>
                    </div>
                    {categories
                        .filter(category => category.catego.toLowerCase() === 'événements')
                        .slice(0, 5) 
                        .map((category, index) => (
                        <Link
                            key={index}
                            to={`/Evenement?searchTerm=&sort=desc&category=événements&subcategory=${category.name.replace(/ /g, '+')}`}
                        >
                            <div
                                style={{
                                    backgroundColor: clickedFilterIndex === index ? '#D294BB' : 'white',
                                    borderColor: clickedFilterIndex === index ? '#D294BB' : 'black',
                                    color: clickedFilterIndex === index ? 'white' : '#D294BB',
                                }}
                                className={`onefilter ${clickedFilterIndex === index ? 'clicked' : ''}`}
                                onClick={() => handleClick(index)}
                            >
                                <span>{category.name}</span>
                            </div>
                        </Link>
                    ))}
                    <Link to='./Evenement'>
                        <button className='onefilter'> <span style={{color:'white'}}>Voir plus</span></button>
                    </Link>
                </div>
                <div>
                    <div>
                        <h3 style={{ color: '#873260', padding: '10px', textAlign: 'center', fontSize: '2rem' }}>
                            Parent et enfants</h3>
                    </div>
                    {categories
                        .filter(category => category.catego.toLowerCase() === 'parent et enfants')
                        .slice(0, 5) 
                        .map((category, index) => (
                        <Link
                            to={`/ParentEtEnfant?searchTerm=&sort=desc&category=ParentEtEnfant&subcategory=${category.name.replace(/ /g, '+')}`}
                            key={index}
                        >
                            <div
                                style={{
                                    backgroundColor: clickedFilterIndex === index ? '#D294BB' : 'white',
                                    borderColor: clickedFilterIndex === index ? '#D294BB' : 'black',
                                    color: clickedFilterIndex === index ? 'white' : '#D294BB',
                                }}
                                className={`onefilter ${clickedFilterIndex === index ? 'clicked' : ''}`}
                                onClick={() => handleClick(index)}
                            >
                                <span>{category.name}</span>
                            </div>
                        </Link>
                    ))}
                    <Link to='./ParentEtEnfant'>
                        <button className='onefilter'> <span style={{color:'white'}}>Voir plus</span></button>
                    </Link>
                </div>
                <div>
                    <div>
                        <h3 style={{ color: '#873260', padding: '10px', textAlign: 'center', fontSize: '2rem' }}>
                            Santé Mentale</h3>
                    </div>
                    {categories
                        .filter(category => category.catego.toLowerCase() === 'santé et mentale')
                        .slice(0, 5) 
                        .map((category, index) => (
                        <Link to={`/MentalHelath?searchTerm=&sort=desc&category=événements&subcategory=${category.name.replace(/ /g, '+')}`}>  
                            <div  key={index}
                                style={{ backgroundColor: clickedFilterIndex === index ? '#D294BB' : 'white', borderColor: clickedFilterIndex === index ? '#D294BB' : 'black', color: clickedFilterIndex === index ? 'white' : '#D294BB' }}
                                className={`onefilter ${clickedFilterIndex === index ? 'clicked' : ''}`}
                                onClick={() => handleClick(index)}
                            >
                                <span>{category.name}</span>
                            </div>
                        </Link>
                    ))}
                    <Link to='./MentalHelath'>
                        <button className='onefilter'> <span style={{color:'white'}}>Voir plus</span></button>
                    </Link>
                </div>
            </div>
        </div>
    </div>
    <div>
        <h3 className={styles.title} style={{padding:'20px 0px'}}>En cas de besoin de se détendre</h3>
        <div className={styles.containersoundmediaplayer}>
            <AudioPlayer audioSrc={aud} label="détente"/>
            <AudioPlayer audioSrc={aud} label="détente"/>
            <AudioPlayer audioSrc={aud} label="détente"/>
        </div>
    </div>
    <div>
        <h3 className={styles.title} style={{padding:'40px 0px'}}>OBTENEZ NOTRE NEWSLETTER</h3>
        <div className={styles.subscribe}>
            <h2 className={styles.subscribe__title}>Restons en contact</h2>
            <p className={styles.subscribe__copy}>Abonnez-vous pour suivre les dernières nouvelles et les mises à jour passionnantes. Nous promettons de ne pas vous spammer !</p>
            <div className={styles.form}>
                <input type="email" style={{borderRadius:"10px 0px 0px 10px",width:'500px',padding:'10px'}} className={styles.form__email} placeholder="exemple@gmail.com"                 class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 

                    onChange={(e) => setNewSubscriberEmail(e.target.value)}
                />
                <button className={styles.form__button} onClick={handleAddSubscriber}>Envoyer</button>
            </div>
        </div>
    </div>
</div>

  );
}
