import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Cabinet.css';
import Pagination from './Pagination';
import axios from 'axios';
import Cardarticle from './Cardarticle';

const Cabinet = () => {
    const [clickedFilterIndex, setClickedFilterIndex] = useState(0); // Default to index 0
    const [cabinetsfetched, setCabinetsfetched] = useState([]); 
    const location = useLocation(); 
    const navigate = useNavigate(); 
    const [totalCabinets, setTotalCabinets] = useState(0);
    const urlParams = new URLSearchParams(location.search);
    const adresse =  [
        "Tous",
        "Ariana",
        "Beja",
        "Ben Arous",
        "Bizerte",
        "Gabes",
        "Gafsa",
        "Jendouba",
        "Kairouan",
        "Kasserine",
        "Kebili",
        "Kef",
        "Mahdia",
        "Manouba",
        "Medenine",
        "Monastir",
        "Nabeul",
        "Sfax",
        "Sidi Bouzid",
        "Siliana",
        "Sousse",
        "Tataouine",
        "Tozeur",
        "Tunis",
        "Zaghouan"
    ];

    const cardsPerPage = 9;
    const [currentIndex, setCurrentIndex] = useState(0);


    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const adresseFromUrl = urlParams.get('adresse');
        
        const fetchCabinets = async () => {
            const searchQuery = adresseFromUrl ? `address=${adresseFromUrl}` : '';
            try {
                const res = await axios.get(`/api/cabinet/getCabinets?${searchQuery}`);
                if (res.status === 200) {
                    const data = res.data;
                    setCabinetsfetched(data.cabinets);
                    setTotalCabinets(data.totalCabinets);
                } else {
                    throw new Error('Failed to fetch data');
                }
            } catch (error) {
                console.error('Error fetching cabinets:', error);
            }
        };

        fetchCabinets();

    }, [location.search]);

    const handleClick = (index) => {
        setClickedFilterIndex(index);
        if (index === 0) {
            navigate(`/cabinet`);
        } else {
            const urlParams = new URLSearchParams();
            urlParams.set("adresse", adresse[index]); 
            navigate(`/cabinet?${urlParams.toString()}`);
        }
    };
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const adresseFromUrl1 = urlParams.get('adresse');

    if (adresseFromUrl1 !== null) {
      const index = adresse.indexOf(adresseFromUrl1);
      if (index !== -1) {
        setClickedFilterIndex(index);
      }
    }
  }, [location.search]);
    const totalCards = cabinetsfetched.length;
    const totalSlides = Math.ceil(totalCards / cardsPerPage);

    const nextSlide = () => {
        setCurrentIndex(prevIndex => Math.min(prevIndex + 1, totalSlides - 1));
    };

    const prevSlide = () => {
        setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    return (
        <div>
            <div className='intropageinfocontainer'>
                <div className='intropagearticle'>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <h1 style={{ fontSize: '1.5rem'}}><b style={{ color: 'black' }}>Mind</b>span</h1>
                        <br />
                        <p>Nous mettons à votre disposition une vaste gamme de psychiatres et de psychologues répartis dans toutes les régions de la Tunisie, afin de répondre à vos besoins en matière de santé mentale.</p>

                    </div>
                    <div className='cardintro'>
                        <div className='cardintrocontenu'>
                            <img src='https://firebasestorage.googleapis.com/v0/b/psychwave-19b6f.appspot.com/o/1708530802270consultation.png?alt=media&token=89e16a69-4cdb-4267-bfff-809cc9fba593' alt='Consultation' />
                            <h3><b>Nous proposons {totalCabinets} spécialistes partout en Tunisie.</b></h3>
                        </div>
                    </div>
                </div>
            </div>
            <div className='headerpagearticle'>
                <div className='filtragearticle'>
                    {adresse.map((subCategory, index) => (
                        <div
                            key={index}
                            className={`onefilter ${clickedFilterIndex === index ? 'clicked' : ''}`}
                            onClick={() => handleClick(index)}
                            style={{ backgroundColor: clickedFilterIndex === index ? '#D294BB' : 'white', borderColor: clickedFilterIndex === index ? '#D294BB' : 'black', color: clickedFilterIndex === index ? 'white' : '#D294BB' }}
                        >
                            <span>{subCategory}</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className='articlecontain'>
            <Cardarticle Data={cabinetsfetched.slice(currentIndex * cardsPerPage, (currentIndex + 1) * cardsPerPage)} />

            </div>
            <div className='containerpagination'>
                <Pagination totalSlides={totalSlides} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
                <button className='next' onClick={nextSlide}>Ensuite</button>
            </div>
        </div>
    );
}

export default Cabinet;
