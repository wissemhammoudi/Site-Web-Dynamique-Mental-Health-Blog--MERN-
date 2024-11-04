
import UserComments from './UserComments';

export default function DashHistory() {



  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Historique des commentaires</h1>
      
      <UserComments/>
    
   
    </div>
  );
}
