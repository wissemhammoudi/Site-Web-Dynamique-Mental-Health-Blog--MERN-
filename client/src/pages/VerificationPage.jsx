import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';

const VerificationPage = () => {
  const [verificationNumber, setverificationNumber] = useState('');
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setverificationNumber(e.target.value.trim());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ verificationNumber }),
      });
      const data = await res.json();

      if (res.ok) {
        // Verification successful, navigate to the home page
        navigate('/');
      } else {
        // Verification failed, handle the error
        dispatch(signInFailure(data.message));
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className='mt-12 mx-10 my-10'>
      <div className='flex flex-col md:flex-row items-center justify-center gap-5'>
        {/* left */}
        <div className='flex-1 gap-5 mx-10'>
        <img src='cerveau.jpg' className='object-cover w-full h-full rounded-lg shadow shadow-md'></img>
        </div>
        {/* right */}
        <div className='flex-1 x-10'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Verification Code' />
              <TextInput
                type='text'
                placeholder='Entrer votre code'
                value={verificationNumber}
                onChange={handleChange}
                class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 
              />
            </div>
            <Button 
              style={{
                backgroundColor: '#D294BB',
                borderColor: '#D294BB',
              }} type='submit' 
              className="focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color"

              >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Verification...</span>
                </>
              ) : (
                'Verify'
              )}
            </Button>
          </form>
       
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
