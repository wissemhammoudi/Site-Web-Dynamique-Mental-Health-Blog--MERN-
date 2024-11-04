import { Button, Select, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PostCard from '../components/PostCard';
import axios from 'axios'; 

export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: '',
    sort: 'desc',
    category: '',
    subcategory: ''
  });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [subcategory, setSubcategory] = useState([]); // Add state for subcategories

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const sortFromUrl = urlParams.get('sort');
    const categoryFromUrl = urlParams.get('category');
    const subcategoryFromUrl = urlParams.get('subcategory');

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl || subcategoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl || '',
        sort: sortFromUrl || 'desc',
        category: categoryFromUrl || '',
        subcategory: subcategoryFromUrl || ''
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      try {
        const res = await axios.get(`/api/post/getposts?${searchQuery}`);
        if (res.status === 200) {
          const data = res.data;
          setPosts(data.posts);
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
          setSubcategory(res.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
    fetchPosts();
  }, [location.search]);

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
    navigate(`/search?${urlParams.toString()}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    try {
      const res = await axios.get(`/api/post/getposts?${urlParams.toString()}`);
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
    <div className='flex flex-col md:flex-row'>
      <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
        <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Terme de recherche:</label>
            <TextInput
              placeholder='Chercher...'
              id='searchTerm'
              type='text'
              value={sidebarData.searchTerm}
              onChange={handleChange}
              class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg"
            />
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Trier :</label>
            <Select onChange={handleChange} value={sidebarData.sort} id='sort'  class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg">
              <option value='desc'>Nouveauté</option>
              <option value='asc'>Ancien</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Catégories:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id='category'
              class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg"
            >
              <option value=''> Choisir une catégorie</option>
              <option value='Santé et Mentale'>Santé Mentale</option>
              <option value='Parent et enfants'>Parent et enfant</option>
              <option value='événements'>Évènements</option>
            </Select>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sous-catégories:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.subcategory}
              id='subcategory'
              class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg"
            >
              <option value=''>Choisire une sous catégorie</option>
              {[...new Set(subcategory.map(sub => sub.name))].map((name, index) => (
  <option key={index} value={name}>
    {name}
  </option>
))}
            </Select>
          </div>
          <Button type='submit'   style={{
        backgroundColor: '#D294BB',
        borderColor: '#D294BB',}}
        className="focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color"

        >

            Appliquer les filtres
          </Button>
        </form>
      </div>
      <div className='w-full'>
        <div className='p-7 flex flex-wrap gap-4' style={{justifyContent:'center'}}>
          {!loading && posts.length === 0 && (
            <p className='text-xl text-gray-500'>Aucun article trouvé.</p>
          )}
          {loading && <p className='text-xl text-gray-500'>Chargement...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
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
