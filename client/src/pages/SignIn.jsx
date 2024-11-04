import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState,useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  useEffect(() => {
    dispatch(signInFailure(''));
  }, [dispatch]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }
else{
      if (data.verified) {
        dispatch(signInSuccess(data));
        navigate('/');
      } else {
        dispatch(signInSuccess(data));
        navigate('/verify');
      }}
    
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className=' mt-12 mx-10 my-10'>
        <div className='flex flex-col md:flex-row items-center justify-center gap-5'>        {/* left */}
        <div className='flex-1 gap-5 mx-10'>
        <img src='cerveau.jpg' className='object-cover w-full h-full rounded-lg shadow shadow-md'></img>
        </div>
      
        {/* right */}

        <div className='flex-1 mx-10'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Votre email' />
              <TextInput
                type='email'
                placeholder='name@gmail.com'
                id='email'
                onChange={handleChange}
                class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 

              />
            </div>
            <div>
              <Label value='Votre mot de passe ' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
                class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 
             
                />
 
            </div>
            <Button
              style={{
                backgroundColor: '#D294BB',
                borderColor: '#D294BB',
              }}
              type='submit'
              className="focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color"

            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Chargement...</span>
                </>
              ) : (
                'Se connecter'
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm sm:text-xs mt-5'>  
          <Link to='/Password' className='text-blue-500'>
            Mot de passe oublié
          </Link>
          <span className="hidden md:block">N'avez vous un compte ?</span>
          <Link to='/sign-up' className='text-blue-500'>
            S'inscrire
          </Link>
          </div>


          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
