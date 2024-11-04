import React, { useEffect, useState } from 'react';
import { Modal, Table, Button, TextInput } from 'flowbite-react'; // Make sure TextInput is correctly imported
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import axios from 'axios';
import Editor from './Ediftor';

import 'react-quill/dist/quill.snow.css';

export default function DashNewsletter() {
  const [newsletters, setNewsletters] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newsletterIdToDelete, setNewsletterIdToDelete] = useState('');
  const [newsletterContent, setNewsletterContent] = useState('');
  const [newSubscriberEmail, setNewSubscriberEmail] = useState('');
  const [newsletterSubject, setNewsletterSubject] = useState(''); // State for the subject

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const res = await axios.get('/api/newsletters/emails');
        if (res.status === 200) {
          setNewsletters(res.data);
        }
      } catch (error) {
        console.error("Error fetching newsletters:", error);
      }
    };
    fetchNewsletters();
  }, []);

  const handleDeleteNewsletter = async (id) => {
    try {
      const res = await axios.delete(`/api/newsletters/emails/${id}`);
      if (res.status === 200) {
        setNewsletters(newsletters.filter(newsletter => newsletter._id !== id));
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error("Error deleting newsletter:", error);
    }
  };

  const handleSendNewsletter = async () => {
    try {
      const res = await axios.post('/api/newsletters/emails/send', { subject: newsletterSubject, text: newsletterContent });
      if (res.status === 200) {
        // Handle success, clear the content or show success message
        setNewsletterSubject(''); // Clear the subject input
        setNewsletterContent('');
      }
    } catch (error) {
      console.error("Error sending newsletter:", error);
    }
  };

  const handleAddSubscriber = async () => {
    try {
      const res = await axios.post('/api/newsletters/emails/add', { email: newSubscriberEmail });
      if (res.status === 201) {
        setNewsletters([...newsletters, res.data]); // Assuming the response contains the new subscriber object
        setNewSubscriberEmail('');
      }
    } catch (error) {
      console.error("Error adding subscriber:", error);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
     
      <Editor value={newsletterContent} onChange={setNewsletterContent} />
      <TextInput
        type="text"
        placeholder="Enter subject"
        value={newsletterSubject}
        onChange={(e) => setNewsletterSubject(e.target.value)}
        className="mb-4"
      />
      <Button onClick={handleSendNewsletter}
      style={{
        backgroundColor: '#D294BB',
        borderColor: '#D294BB',
      }} 
      className='w-full'

      >Send Newsletter</Button>

      <div className="flex gap-4 my-4">
        <TextInput
          type="email"
          placeholder="Enter email"
          value={newSubscriberEmail}
          onChange={(e) => setNewSubscriberEmail(e.target.value)}
          
        />
        <Button onClick={handleAddSubscriber}
        style={{
          backgroundColor: '#D294BB',
          borderColor: '#D294BB',
        }} 
        >Subscribe</Button>
      </div>

      {newsletters.length > 0 ? (
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Email</Table.HeadCell>
            <Table.HeadCell>Delete</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {newsletters.map((newsletter) => (
              <Table.Row key={newsletter._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{newsletter.email}</Table.Cell>
                <Table.Cell>
                  <span onClick={() => {
                      setNewsletterIdToDelete(newsletter._id);
                      setShowDeleteModal(true);
                    }}
                    className='font-medium text-red-500 hover:underline cursor-pointer'
                    >
                    Delete
                  </span>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <p>No newsletters available!</p>
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
              Are you sure you want to delete this newsletter?
            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={() => handleDeleteNewsletter(newsletterIdToDelete)}>
                Yes, I'm sure
              </Button>
              <Button color='gray' onClick={() => setShowDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
