import { Alert, Button, FileInput, Select, TextInput } from 'flowbite-react';
import 'react-quill/dist/quill.snow.css';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { useState, useCallback } from 'react'; // Update import
import Editor from '../components/Ediftor';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'; // Add import statement for axios
import { useNavigate } from 'react-router-dom';

export default function CreateCabinet() {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    email: '',
    phoneNumber: '',
    description: '',
    image: '', // Add image field to formData
  });

  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [publishError, setPublishError] = useState(null);

  const navigate = useNavigate();

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
      await new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setImageUploadProgress(progress.toFixed(0));
          },
          (error) => {
            setImageUploadError('Image upload failed');
            setImageUploadProgress(null);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref)
              .then((downloadURL) => {
                setImageUploadProgress(null);
                setImageUploadError(null);
                setFormData({ ...formData, image: downloadURL });
                resolve();
              })
              .catch((error) => {
                setImageUploadError('Failed to get download URL');
                setImageUploadProgress(null);
                reject(error);
              });
          }
        );
      });
    } catch (error) {
      setImageUploadError('Image upload failed');
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageToSend = formData.image;
      if (!formData.image) {
        imageToSend = 'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png';
      }
      const formDataToSend = {
        ...formData,
        image: imageToSend,
      };
      const res = await axios.post('/api/cabinet/createCabinet', formDataToSend);
      if (res.status === 201) {
        setPublishError(null);
        navigate('/dashboard?tab=cabinet');
      }
    } catch (error) {
      setPublishError('Something went wrong');
    }
  };

  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Create a cabinet</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <TextInput
          type='text'
          placeholder='Name'
          required
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 

        />
        <Select required onChange={(e) => setFormData({ ...formData, address: e.target.value })}>
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
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 

        />
        <TextInput
          type='tel'
          placeholder='Phone Number'
          required
          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
          class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 

        />
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput type='file' accept='image/*' onChange={(e) => setFile(e.target.files[0])} />
          <Button
            type='button'
            style={{
              backgroundColor: '#D294BB',
              borderColor: '#D294BB',
            }}
            className="focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color"
            size='sm'
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress || 0}%`} />
              </div>
            ) : (
              'Upload Image'
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
        {formData.image && <img src={formData.image} alt='upload' className='w-full h-72 object-cover' />}
        <Editor
          value={formData.description}
          onChange={(value) => setFormData({ ...formData, description: value })}
          maxLength ='100'
        />
        <Button type='submit'               
         style={{
          backgroundColor: '#D294BB',
          borderColor: '#D294BB',
        }}
        className="focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color"
>
          Publish
        </Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
}
