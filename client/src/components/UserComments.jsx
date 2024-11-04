import { Table, Button, Modal } from 'flowbite-react';
import { HiAnnotation } from 'react-icons/hi';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function UserComments() {
  const [comments, setComments] = useState([]);
  const [totalUserComments, setTotalUserComments] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [commentToEdit, setCommentToEdit] = useState(null);
  const [editedCommentContent, setEditedCommentContent] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  const handleUpdateComment = async () => {
    try {
      const res = await axios.put(`/api/comment/editComment/${commentToEdit._id}`, {
        content: editedCommentContent
      });
      if (res.status === 200) {
        const updatedComments = comments.map(comment => {
          if (comment._id === commentToEdit._id) {
            return { ...comment, content: editedCommentContent };
          }
          return comment;
        });
        setComments(updatedComments);
        console.log('Comment updated successfully');
      } else {
        console.error('Failed to update comment');
      }
      setShowEditModal(false);
    } catch (error) {
      console.error('Error updating comment:', error.message);
    }
  };
  
  const handleDeleteComment = async () => {
    try {
      const res = await axios.delete(`/api/comment/deleteComment/${commentToDelete._id}`);
      if (res.status === 200) {
        const updatedComments = comments.filter(comment => comment._id !== commentToDelete._id);
        setComments(updatedComments);
        console.log('Comment deleted successfully');
      } else {
        console.error('Failed to delete comment');
      }
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting comment:', error.message);
    }
  };
  
  useEffect(() => {
    const fetchUserComments = async () => {
      try {
        const res = await axios.get(`/api/comment/getusercomments/${currentUser._id}`);
        if (res.status === 200) {
          const userComments = res.data;
          setComments(userComments);
          setTotalUserComments(userComments.length);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchUserComments();
  }, [currentUser]);

  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Nombre total de commentaires</h3>
              <p className='text-2xl'>{totalUserComments}</p>
            </div>
            <HiAnnotation className='bg-indigo-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
        </div>
      </div>
      <div className='flex flex-wrap gap-4 py-3 mx-auto justify-center'>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Vos commentaires</h1>
          </div>
          <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Le contenu</Table.HeadCell>
              <Table.HeadCell>Nombre de j'aimes</Table.HeadCell>
              <Table.HeadCell>Titre d'article</Table.HeadCell>
              <Table.HeadCell>Nom d'utilisateur</Table.HeadCell>
              <Table.HeadCell>Date de création</Table.HeadCell>
              <Table.HeadCell>Date de mise ajour</Table.HeadCell>
              <Table.HeadCell>Mise ajour</Table.HeadCell>
              <Table.HeadCell> Supprimer</Table.HeadCell>

            </Table.Head>
              <Table.Body>
                {comments && comments.map((comment) => (
                  <Table.Row key={comment._id} className='divide-y-2'>
                    <Table.Cell style={{wordBreak:'break-word'}} >
              <p className='line-clamp-2'>{comment.content}</p>
          </Table.Cell>

                    <Table.Cell>
                      <p className='line-clamp-2'>{comment.numberOfLikes}</p>
                    </Table.Cell>
                    <Table.Cell>
                      {comment.postId.title}
                    </Table.Cell>
                    <Table.Cell>
                      {comment.userId.username}
                    </Table.Cell>
                    <Table.Cell>
                      <p className='line-clamp-10'>{comment.createdAt.split("T").join("\n").split("+")[0]}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p className='line-clamp-2'>{comment.updatedAt.split("T").join("\n").split("+")[0]}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setCommentToEdit(comment);
                          setEditedCommentContent(comment.content);
                          setShowEditModal(true);
                        }}
                        className='text-teal-500 hover:underline'
                      >
                        Mise a jour
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span
                        onClick={() => {
                          setCommentToDelete(comment);
                          setShowDeleteModal(true);
                        }}
                        className='font-medium text-red-500 hover:underline cursor-pointer'
                      >
                        Supprimer
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
      {showEditModal && (
        <Modal
          show={showEditModal}
          onClose={() => setShowEditModal(false)}
          popup
          size='lg'
        >
          <Modal.Header>Modifier le commentaire</Modal.Header>
          <Modal.Body>
            <input
              type="text"
              value={editedCommentContent}
              onChange={(e) => setEditedCommentContent(e.target.value)}
              placeholder="Entrez le contenu édité"
              className="border border-gray-300 rounded-md p-2 mb-2"
              style={{width:'430px',height:'200px'}}
            />
            <Button color='gray' onClick={handleUpdateComment}>Update</Button>
          </Modal.Body>
        </Modal>
      )}
      {showDeleteModal && (
        <Modal
          show={showDeleteModal}
          onClose={() => setShowDeleteModal(false)}
          popup
          size='md'
        >
          <Modal.Header>Supprimer le commentaire</Modal.Header>
          <Modal.Body>
            <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
            Êtes-vous sûr de vouloir supprimer cette catégorie ?            </h3>
            <div className='flex justify-center gap-4'>
              <Button color='failure' onClick={handleDeleteComment}>
                Oui
              </Button>
              <Button color='gray' onClick={() => setShowDeleteModal(false)}>
Non              </Button>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}
