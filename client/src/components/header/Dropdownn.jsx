import React, { useState, useEffect } from 'react';
import './Dropdown.css';
import { Link } from 'react-router-dom';

const Dropdownn = ({ categories, lab, lab1, lab2, lab3 }) => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [governorates, setGovernorates] = useState([
    { name: 'Ariana' }, 
    { name: 'Beja' }, 
    { name: 'Ben Arous' }, 
    { name: 'Bizerte' }, 
    { name: 'Gabes' }, 
    { name: 'Gafsa' }, 
    { name: 'Jendouba' }, 
    { name: 'Kairouan' }, 
    { name: 'Kasserine' }, 
    { name: 'Kebili' }, 
    { name: 'Le Kef' }, 
    { name: 'Mahdia' }, 
    { name: 'Manouba' }, 
    { name: 'Medenine' }, 
    { name: 'Monastir' }, 
    { name: 'Nabeul' }, 
    { name: 'Sfax' }, 
    { name: 'Sidi Bouzid' }, 
    { name: 'Siliana' }, 
    { name: 'Sousse' },
    { name: 'Tataouine' }, 
    { name: 'Tozeur' }, 
    { name: 'Tunis' }, 
    { name: 'Zaghouan' }
  ]);

  const handleHover = (label) => {
    setActiveDropdown(label);
  };

  const handleLeave = () => {
    setActiveDropdown(null);
  };

  const [numVisibleItems, setNumVisibleItems] = useState(calculateNumVisibleItems());

  useEffect(() => {
    function handleResize() {
      setNumVisibleItems(calculateNumVisibleItems());
    }

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function calculateNumVisibleItems() {
    const containerWidth = window.innerWidth;
    // Adjust this value according to your layout
    const liWidth = 80;
    return Math.floor(containerWidth / liWidth);
  }

  let filteredCategories;
  if (activeDropdown === 'Cabinet') {
    filteredCategories = governorates.slice(0, numVisibleItems);
  } else {
    filteredCategories = categories
      .filter((category) => category.catego.toLowerCase() === activeDropdown)
      .slice(0, numVisibleItems);
  }
  let selectedLabel="/Evenement?searchTerm=&sort=desc&category=événements&subcategory=";

  if (activeDropdown === 'événements') {
    selectedLabel = "/Evenement?searchTerm=&sort=desc&category=événements&subcategory=";
  } else if (activeDropdown === 'santé et mentale') {
    selectedLabel = "/MentalHelath?searchTerm=&sort=desc&category=événements&subcategory=";
  } else if (activeDropdown === 'parent et enfants') {
    selectedLabel = "/ParentEtEnfant?searchTerm=&sort=desc&category=événements&subcategory=";
  } else if (activeDropdown === 'Cabinet') {
    selectedLabel = "/cabinet?adresse=";
  } 

  return (
    <div className='containerdropdown'
    onMouseLeave={handleLeave}
    >
      <div className='containerdropdowncateg'>
        {lab && (
          <Link to="/Evenement">
          <span
            onMouseEnter={() => handleHover(lab)}
          >
            Parent et enfant
          </span>
          </Link>
        )}
        {lab1 && (
          <Link to="/ParentEtEnfant">
          <span
            onMouseEnter={() => handleHover(lab1)}
          >
            {lab1}
          </span>
          </Link>
        )}
        {lab2 && (
          <Link to="MentalHelath">
          <span
            onMouseEnter={() => handleHover(lab2)}
          >
            Santé mentale
          </span>
          </Link>
        )}
        <Link to="/cabinet">
        <span
          onMouseEnter={() => handleHover(lab3)}
        >
          {lab3}
        </span>
        </Link>
      </div>
      <div
        className={`containerdropdownsubcateg ${
          activeDropdown ? 'active' : ''
        }`}
      >
        <div className='containerulcateg'>
          <ul>
          {filteredCategories.map((category, index) => (
  <Link to={`${selectedLabel}${category.name.replace(/ /g, '+')}`} key={index}>
    <li>{category.name}</li>
  </Link>
))}
            {categories.length > numVisibleItems && 
            <Link to={`${selectedLabel}`} >
            <li>Voir plus</li>
            </Link>}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dropdownn;
