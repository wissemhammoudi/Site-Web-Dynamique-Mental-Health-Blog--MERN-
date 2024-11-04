import {  Button,Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import axios from 'axios'; 
import './categoryPage.css'
export default function Evenement() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: 'événements',
    subcategory: '',
  });
  const [totalposts, settotalPosts] = useState(0);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [subcategories, setSubcategories] = useState([]);
  const [clickedFilterIndex, setClickedFilterIndex] = useState(null);
  const [adresse, setAdresse] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const subcategoryFromUrl = urlParams.get('subcategory');

    if (searchTermFromUrl || sortFromUrl || subcategoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        subcategory: subcategoryFromUrl || '',
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await axios.get(`/api/post/getposts?category=${sidebarData.category}&${searchQuery}`);
        if (res.status === 200) {
          const data = res.data;
          setPosts(data.posts);
          settotalPosts(data.postsByCategory.find(postsByCategory => postsByCategory._id === "événements")?.totalPosts ?? 0);
          setShowMore(data.posts.length === 9);
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
          setSubcategories(res.data);
          setAdresse(res.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    fetchPosts();
  }, [location.search, sidebarData.category]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prevData) => ({ ...prevData, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    Object.entries(sidebarData).forEach(([key, value]) => {
      urlParams.set(key, value);
    });
    navigate(`/Evenement?${urlParams.toString()}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const adresseFromUrl = urlParams.get('subcategory');
    if (adresseFromUrl !== null) {
      // Filter the adresse array to consider only subcategories with the category 'événements'
      const filteredAdresse = adresse.filter(subCategory => subCategory.catego === 'événements');
      // Find the index of the subcategory in the filtered adresse array
      const index = filteredAdresse.findIndex(subCategory => subCategory.name === adresseFromUrl);
      // If the subcategory is found, set the clickedFilterIndex
      if (index !== -1) {
        setClickedFilterIndex(index);
      }
    }
  }, [location.search, adresse]);
  
  

  const handleClick = (index, subCategory) => {
    setSidebarData((prevState) => ({
      ...prevState,
      subcategory: subCategory.name,
    }));
    setClickedFilterIndex(index);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    try {
      const res = await axios.get(`/api/post/getposts?category=${sidebarData.category}&${urlParams.toString()}`);
      if (res.status === 200) {
        const data = res.data;
        setPosts((prevPosts) => [...prevPosts, ...data.posts]);
        setShowMore(data.posts.length === 9);
      }
    } catch (error) {
      console.error('Error fetching more posts:', error);
    }
  };
  return (
    <div >
      <div className='intropageinfocontainer'>
                <div className='intropagearticle'>
                    <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                        <h1 style={{ fontSize: '1.5rem'}}><b style={{ color: 'black' }}>Evenement</b></h1>
                        <br />
                        <p>
                        Bienvenue dans notre Section Événements. Ici, nous partageons les rassemblements et les activités à venir axés sur la santé mentale. Rejoignez-nous alors que nous mettons en lumière les événements visant à rassembler les gens, à apprendre et à soutenir le bien-être de chacun. 
                        </p>
                    </div>
                    <div className='cardintro'>
                        <div className='cardintrocontenu'>
                            <img src='https://firebasestorage.googleapis.com/v0/b/psychwave-19b6f.appspot.com/o/1708530802270consultation.png?alt=media&token=89e16a69-4cdb-4267-bfff-809cc9fba593' alt='Consultation' />
                            <h3><b>Nous offrons {totalposts} articles sur les évenements.</b></h3>
                        </div>
                    </div>
                </div>
            </div>
        <form  onSubmit={handleSubmit} className='containerfilter' >
          <div style={{display:'flex',flexDirection:'column'}}>
            <div className='deuxinpitcontainer'>
            <div className='inputcontinaer'>
            <label style={{display:'flex',alignItems:'center'}}>Terme de recherche</label>
            <TextInput
              placeholder='Chercher...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
              </div>
              <div  className='inputcontinaer'>
              <label style={{display:'flex',alignItems:'center'}}>Trier:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
              <option value='desc'>Nouveauté</option>
              <option value='asc'>Ancien</option>
            </Select>
            </div>
            </div>
            <div style={{display:'flex',flexDirection:'row', padding:'10px',flexWrap:'wrap',height:'auto'}}>
  {adresse
    .filter(subCategory => subCategory.catego === 'événements')
    .map((subCategory, index) => (
      <div
        key={index}
        className={`onefilter ${clickedFilterIndex === index ? 'clicked' : ''}`}
        onClick={() => handleClick(index, subCategory)} // pass the whole subCategory object
        style={{
          backgroundColor: clickedFilterIndex === index ? '#D294BB' : 'white',
          borderColor: clickedFilterIndex === index ? '#D294BB' : 'black',
          color: clickedFilterIndex === index ? 'white' : '#D294BB',
         
        
        }}
        
      >
        <span >{subCategory.name}</span>
      </div>
    ))}
            </div>
          </div>
         
          <div ><Button 
          style={{    backgroundColor:'#D294BB' 
          }}
          className="group flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 rounded-lg focus:ring-2 focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color"
           type='submit'>
Appliquer les filtres       
     </Button>
            </div>
       
        </form>
        <div className='w-full'>
        <div className='p-7 flex flex-wrap gap-4 justify-evenly justify-center-sm'>                 {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>Aucun article trouvé.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Chargement...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {/* Button to load more posts */}
          {showMore && (
            <button
              onClick={handleShowMore}
              className='text-teal-500 text-lg hover:underline p-7 w-full'
            >
              Voir plus
            </button>
          )}
        </div>
        </div>
    </div>
  );
}
