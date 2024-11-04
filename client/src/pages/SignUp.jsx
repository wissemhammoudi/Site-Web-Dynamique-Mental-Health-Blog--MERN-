import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage('Remplir tous les données.');
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if(res.ok) {
        navigate('/sign-in');
      }
    } catch (error) {
      setErrorMessage(error.message);
      setLoading(false);
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

        <div className='flex-1 mx-10'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Nom d utlisateur' />
              <TextInput
                type='text'
                placeholder='Nom d utilisateur'
                id='username'
                onChange={handleChange}
                class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 
              />
            </div>
            <div>
              <Label value='name@gmail.com' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
                class="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-custom-color focus:ring-custom-color dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-custom-color dark:focus:ring-custom-color p-2.5 text-sm rounded-lg" 
              />
            </div>
            <div>
              <Label value='mot de passe' />
              <TextInput
                type='password'
                placeholder='Password'
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
              disabled={loading}
              className="focus:border-custom-color focus:ring-custom-color dark:focus:border-custom-color dark:focus:ring-custom-color"

            >
              {loading ? (
                <>
                  <Spinner size='sm' />
                  <span className='pl-3'>Chargement...</span>
                </>
              ) : (
                'S inscrire'
              )}
            </Button>
          </form>
          <div className='flex gap-2 text-sm sm:text-xs mt-5'>
            <span >Avez vous un compte ?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Se connecter
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
