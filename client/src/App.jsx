import "@fontsource/source-sans-pro"; // Defaults to weight 400
import "@fontsource/source-sans-pro/400.css"; // Specify weight
import "@fontsource/source-sans-pro/400-italic.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Header from './components/header/Header';
import PrivateRoute from './components/PrivateRoute';
import OnlyAdminPrivateRoute from './components/OnlyAdminPrivateRoute';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import PostPage from './pages/PostPage';
import ScrollToTop from './components/ScrollToTop';
import Search from './pages/Search';
import VerificationPage from './pages/VerificationPage';
import Password from './pages/Password'
import ParentEtEnfant from './pages/ParentEtEnfant';
import Evenement from './pages/Evenement';
import MentalHelath from './pages/MentalHealth';
import Footer from './components/Footers/Footer';
import CreateCabinet from './pages/CreateCabinet';
import UpdateCabinet from './pages/UpdateCabinet';
import Cabinet from './pages/cabinet/Cabinet';
import ContactComponent from './pages/ContactUs/ContactComponent';
import Aboutus from './pages/AboutUs/Aboutus'
import FAQ from './pages/FAQ/FAQ'
import PolicyComponent from './pages/policy/PolicyComponent'
import Wronpath from './pages/worngpath/Wronpath'
import Home from './pages/home/Home';
import GethelpComponent from './pages/gethelp/GethelpComponent'
import './index.css';


export default function App() {


  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        <Route path='/verify' element={<VerificationPage/>} />
        <Route path='/password' element={<Password/>} />
        <Route path='/contact' element={<ContactComponent/>} />
        <Route path='/FAQ' element={<FAQ/>} />
        <Route path='/policy' element={<PolicyComponent/>} />
        <Route path='/ParentEtEnfant' element={<ParentEtEnfant/>} />
        <Route path='/Evenement' element={<Evenement/>} />
        <Route path='/MentalHelath' element={<MentalHelath/>} />
        <Route path='/cabinet' element={<Cabinet/>} />
        <Route path='/aboutUs' element={<Aboutus/>} />
        <Route path='/search' element={<Search />} />
        <Route path='/GetHelp' element={<GethelpComponent />} />
        <Route path="*" element={<Wronpath/>} />
        <Route path='/post/:postSlug' element={<PostPage />} />
        

        <Route element={<PrivateRoute />}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/create-cabinet' element={<CreateCabinet/>} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/update-post/:postId' element={<UpdatePost />} />
          <Route path='/update-cabinet/:cabinetId' element={<UpdateCabinet/>} />

        </Route>

      </Routes>
      <Footer/>
    </BrowserRouter>
  );
}
