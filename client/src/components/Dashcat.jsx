import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios';

export default function Dashcat() {
  const { currentUser } = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryCatego, setNewCategoryCatego] = useState('');
  const [editCategoryId, setEditCategoryId] = useState('');
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryCatego, setEditCategoryCatego] = useState('');
  const [showEditModal, setShowEditModal] = useState(false);

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

  const handleDeleteCategory = async () => {
    try {
      const res = await axios.delete(`/api/categories/deletecategory/${categoryIdToDelete}/${currentUser._id}`);
      if (res.status === 200) {
        setCategories(categories.filter(category => category._id !== categoryIdToDelete));
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const res = await axios.post('/api/categories/create', { 
        name: newCategoryName,
        catego: newCategoryCatego // Include catego field in the request body
      });
      if (res.status === 201) {
        setCategories([...categories, res.data]);
        setNewCategoryName(''); // Clear input field after adding category
        setNewCategoryCatego(''); // Clear input field for catego
        setShowModal(false);
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };
  

  const handleEditCategory = async () => {
    try {
      const res = await axios.put(`/api/categories/updatecategory/${editCategoryId}/${currentUser._id}`, {
        name: editCategoryName,
        catego: editCategoryCatego // Include catego field in the request body
      });
      if (res.status === 200) {
        const updatedCategoryData = res.data;
        setCategories(categories.map(category => category._id === editCategoryId ? updatedCategoryData : category));
        setEditCategoryName('');
        setEditCategoryCatego('');
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  
  

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <Button onClick={() => setShowModal(true)} style={{
                backgroundColor: '#D294BB',
                borderColor: '#D294BB',
              }}
              className='w-full'
              >Add Category</Button>
      {currentUser.isAdmin && categories.length > 0 ? (
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Category Name</Table.HeadCell>
            <Table.HeadCell>Catego</Table.HeadCell>
            <Table.HeadCell>Edit</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          {categories.map(category => (
            <Table.Body key={category._id} className='divide-y'>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{category.name}</Table.Cell>
                <Table.Cell>{category.catego}</Table.Cell>
                <Table.Cell>
                  <span onClick={() => {
                      setShowEditModal(true);
                      setEditCategoryId(category._id);
                      setEditCategoryName(category.name);
                      setEditCategoryCatego(category.Catego);
                    }}
                    className='text-teal-500 hover:underline'
                    >
                    Edit
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span onClick={() => {
                      setCategoryIdToDelete(category._id);
                      setShowDeleteModal(true);
                    }}
                    className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      ) : (
        <p>No categories available!</p>
      )}
      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        popup
        size='md'
      >
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this category?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteCategory}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <Modal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        popup
        size='md'
      >
        <Modal.Header>Edit Category</Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={editCategoryName}
            onChange={(e) => setEditCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
     <select
  value={editCategoryCatego}
  onChange={(e) => setEditCategoryCatego(e.target.value)}
  className="border border-gray-300 rounded-md p-2 mb-2"
>
  <option value=''>Select a category</option>
  <option value='Santé et Mentale'>Santé et Mentale</option>
  <option value='Parent et enfants'>Parent et enfants</option>
  <option value='événements'>Événements</option>
</select>

          <Button color='success' onClick={handleEditCategory}>Save Changes</Button>
        </Modal.Body>
      </Modal>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size='md'
      >
        <Modal.Header>Add Category</Modal.Header>
        <Modal.Body>
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="border border-gray-300 rounded-md p-2 mb-2"
          />
      <select
  value={newCategoryCatego}
  onChange={(e) => setNewCategoryCatego(e.target.value)}
  className="border border-gray-300 rounded-md p-2"
>
  <option value=''>Select a category</option>
  <option value='Santé et Mentale'>Santé et Mentale</option>
  <option value='Parent et enfants'>Parent et enfants</option>
  <option value='événements'>Événements</option>
</select>

          <Button color='success' onClick={handleAddCategory}>Add</Button>
        </Modal.Body>
      </Modal>
    </div>
  );
}
