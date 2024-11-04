import { Modal, Table, Button } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { HiOutlineExclamationCircle } from 'react-icons/hi';

export default function DashCabinets() {
  const { currentUser } = useSelector((state) => state.user);
  const [cabinets, setCabinets] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [cabinetIdToDelete, setCabinetIdToDelete] = useState('');

  useEffect(() => {
    const fetchCabinets = async () => {
      try {
        const res = await fetch('/api/cabinet/getCabinets');
        const data = await res.json();
        if (res.ok) {
          setCabinets(data.cabinets);
          setTotalCabinets(data.totalCabinets);
          setLastMonthCabinets(data.lastMonthCabinets);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
  
      fetchCabinets();
    
  }, []);
  


  const handleDeleteCabinet = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/cabinet/deleteCabinet/${cabinetIdToDelete}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setCabinets((prev) => prev.filter((cabinet) => cabinet._id !== cabinetIdToDelete));
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {currentUser.isAdmin && (
        <Link to={'/create-cabinet'}>
          <Button type='button' className='w-full'
          style={{
            backgroundColor: '#D294BB',
            borderColor: '#D294BB',
          }} >
            Create a cabinet
          </Button>
        </Link>
      )}

      {currentUser.isAdmin && cabinets.length > 0 ? (
        <>
          <Table hoverable className='shadow-md'>
            <Table.Head>
              <Table.HeadCell>Cabinet Name</Table.HeadCell>
              <Table.HeadCell>Cabinet Image</Table.HeadCell>
              <Table.HeadCell>Address</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Phone Number</Table.HeadCell>
              <Table.HeadCell>edit</Table.HeadCell> 
              <Table.HeadCell>Delete</Table.HeadCell>
            </Table.Head>
            {cabinets.map((cabinet) => (
              <Table.Body className='divide-y'>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>{cabinet.name}</Table.Cell>
                  <Table.Cell>
                    <img
                      src={cabinet.image}
                      alt={cabinet.name}
                      className='w-20 h-10 object-cover bg-gray-500'
                    />
                  </Table.Cell>
                  <Table.Cell>{cabinet.address}</Table.Cell>
                  <Table.Cell>{cabinet.email}</Table.Cell>
                  <Table.Cell>{cabinet.phoneNumber}</Table.Cell>
                  <Table.Cell>
                    <Link to={`/update-cabinet/${cabinet._id}`}  className='text-teal-500 hover:underline'>Edit</Link> 
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setCabinetIdToDelete(cabinet._id);
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
        </>
      ) : (
        <p>No cabinets available!</p>
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md'>
        <Modal.Header />
        <Modal.Body>
          <div className='text-center'>
            <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
              Are you sure you want to delete this cabinet?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteCabinet}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
