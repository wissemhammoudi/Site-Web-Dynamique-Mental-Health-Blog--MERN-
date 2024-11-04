import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineSearch } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux';
import { signoutSuccess } from '../../redux/user/userSlice';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { encodeBase64 } from 'bcryptjs';
import Dropdownn from './Dropdownn';
import './Header.css'

export default function Header() {
  const path = useLocation().pathname;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <div>
    <Navbar className='mr-0 gap-4'>
      <div className="mx-auto gap-2 flex flex-wrap items-center justify-between container">
      <Link 
        to='/'>
      
      <h1 className="text-lg sm:text-xl md:text-3xl"> <b style={{color:'#D294BB'}}>Mind</b>span</h1>
      </Link>
      <form onSubmit={handleSubmit} className="flex items-center">
  <div className="relative">
    <input
      type='text'
      placeholder='Search Articles ...'
      className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg"

      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
    <button type='submit' className="absolute inset-y-0 right-0 flex items-center justify-center px-3 text-gray-400">
      <AiOutlineSearch />
    </button>
  </div>
</form>
        <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link active={path === '/'} as={'div'} style={{ color: path === '/' ? '#D294BB' : 'initial',backgroundColor: path === '/' ? 'initial' : 'initial' }}>
          <Link to='/'>Accueil</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/AboutUs'} as={'div'} style={{ color: path === '/AboutUs' ? '#D294BB' : 'initial',backgroundColor: path === '/' ? 'initial' : 'initial' }}>
          <Link to='/AboutUs'>À propos</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/projects'} as={'div'} style={{ color: path === '/search' ? '#D294BB' : 'initial',backgroundColor: path === '/' ? 'initial' : 'initial' }}>
          <Link to='/search'>Articles</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/contact'} as={'div'} style={{ color: path === '/contact' ? '#D294BB' : 'initial',backgroundColor: path === '/' ? 'initial' : 'initial' }}>
          <Link to='/contact'>Contactez-nous</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/FAQ'} as={'div'} style={{ color: path === '/FAQ' ? '#D294BB' : 'initial' ,backgroundColor: path === '/' ? 'initial' : 'initial'}}>
          <Link to='/FAQ'>FAQ</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/GetHelp'} as={'div'} style={{ color: path === '/GetHelp' ? '#D294BB' : 'initial' ,backgroundColor: path === '/' ? 'initial' : 'initial'}}>
          <Link to='/GetHelp'>Obtenir de l'aide</Link>
        </Navbar.Link>
       
      </Navbar.Collapse>
      {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt='user' img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span >
                {currentUser.username}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profil</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Se déconnecter</Dropdown.Item>
          </Dropdown>
        ) : (
          <div className='flex space-x-4 '>
          <Link to='/sign-in'>
            <Button  style={{ backgroundColor: '#D294BB' }} 
                          className="focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color">
              Se connecter
            </Button>
          </Link>
            <Link to='/sign-up'>
            <Button  style={{ backgroundColor: '#D294BB' }} 
                          className="focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color"

            >
S'inscrire
            </Button>
          </Link>
          </div>
        )}
        </div>
            </Navbar>

  <div className="containerdropdownkbira">
  
  
<Dropdownn
      categories={categories}
      lab2="santé et mentale"
      lab1='parent et enfants'
      lab='événements'
      lab3='Cabinet'

    >
        
        </Dropdownn>
          
</div>
    </div>
  );
}
