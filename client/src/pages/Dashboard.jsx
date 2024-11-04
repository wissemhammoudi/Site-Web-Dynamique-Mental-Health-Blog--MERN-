import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar';
import DashProfile from '../components/DashProfile';
import DashPosts from '../components/DashPosts';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComments';
import DashboardComp from '../components/DashboardComp';
import Dashcat from '../components/Dashcat';
import DashNewsletter from '../components/DashNewsletter'
import DashCabinets from '../components/DashCabinet';
import DashHistory from '../components/DashHistory';


export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
      <div className='md:w-56'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}

      {tab === 'profile' && <DashProfile />}
      
      {tab === 'history' && <DashHistory/>}

      {/* posts... */}
      {tab === 'posts' && <DashPosts />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      {/* comments  */}
      {tab === 'comments' && <DashComments />}
      {tab === 'category' && <Dashcat />}
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
      {tab === 'newsletter' && <DashNewsletter/>}
      {tab === 'cabinet' && <DashCabinets/>}


    </div>
  );
}
