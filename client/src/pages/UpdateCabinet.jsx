import { Alert, Button, FileInput, TextInput, Select } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Editor from '../components/Ediftor'; // Corrected import path

export default function UpdateCabinet() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    description: '',
    image: ''
  });
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();
  const { cabinetId } = useParams();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCabinet = async () => {
      try {
        const res = await axios.get(`/api/cabinet/getCabinet/${cabinetId}`);
        const data = res.data; // Assuming the response is an object containing cabinet data
        setPublishError(null);
        setFormData(data);
      } catch (error) {
        console.error('Error fetching cabinet data:', error);
        setPublishError('Error fetching cabinet data');
      }
    };

    fetchCabinet();
  }, [cabinetId]);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError('Please select an image');
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError('Image upload failed');
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData((prevData) => ({ ...prevData, image: downloadURL }));
          });
        }
      );
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `/api/cabinet/updateCabinet/${cabinetId}/${currentUser._id}`;
      const res = await axios.put(url, formData);
      if (res.status >= 200 && res.status < 300) {
        setPublishError(null);
        navigate(`/`);
      } else {
        setPublishError(res.data.message);
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Update cabinet</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Name'
          required
          onChange={(e) => setFormData((prevData) => ({ ...prevData, name: e.target.value }))}
          value={formData.name || ''}
          class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 

        />
        <Select
          required
          value={formData.address || ''} 
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 

        >
        <option value=''>Select a governorate</option>
          <option value='Ariana'>Ariana</option>
          <option value='Beja'>Béja</option>
          <option value='Ben Arous'>Ben Arous</option>
          <option value='Bizerte'>Bizerte</option>
          <option value='Gabes'>Gabès</option>
          <option value='Gafsa'>Gafsa</option>
          <option value='Jendouba'>Jendouba</option>
          <option value='Kairouan'>Kairouan</option>
          <option value='Kasserine'>Kasserine</option>
          <option value='Kebili'>Kébili</option>
          <option value='Kef'>Le Kef</option>
          <option value='Mahdia'>Mahdia</option>
          <option value='Manouba'>La Manouba</option>
          <option value='Medenine'>Médenine</option>
          <option value='Monastir'>Monastir</option>
          <option value='Nabeul'>Nabeul</option>
          <option value='Sfax'>Sfax</option>
          <option value='Sidi Bouzid'>Sidi Bouzid</option>
          <option value='Siliana'>Siliana</option>
          <option value='Sousse'>Sousse</option>
          <option value='Tataouine'>Tataouine</option>
          <option value='Tozeur'>Tozeur</option>
          <option value='Tunis'>Tunis</option>
          <option value='Zaghouan'>Zaghouan</option>
        </Select>
        <TextInput
          type='email'
          placeholder='Email'
          required
          onChange={(e) => setFormData((prevData) => ({ ...prevData, email: e.target.value }))}
          value={formData.email || ''}
          class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 

        />
        <TextInput
          type='tel'
          placeholder='Phone Number'
          required
          onChange={(e) => setFormData((prevData) => ({ ...prevData, phoneNumber: e.target.value }))}
          value={formData.phoneNumber || ''}
          class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 

        />
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
            class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 

          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && (
          <img
            src={formData.image}
            alt='upload'
            className='w-full h-72 object-cover'
          />
        )}
        <Editor
          value={formData.description || ''}
          onChange={(value) => setFormData((prevData) => ({ ...prevData, description: value }))}
          maxLength ='100'
        />
        <Button type='submit'
         style={{
          backgroundColor: '#D294BB',
          borderColor: '#D294BB',
        }}
        className="focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color">
          Update Cabinet
        </Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
}
