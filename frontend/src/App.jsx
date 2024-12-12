import { Route, Routes } from "react-router-dom"
import Header from "./Header/Header"
import Home from "./Home/Home"
import AboutUs from './AboutUs/AboutUs'
import Services from './Services/Services'
import ContactUs from './ContacUs/ContactUs'
import Auth from './Auth/Auth'
import Projects from "./Projects/Projects"
import AddUser from "./Auth/AddUser"
import { useDispatch, useSelector } from "react-redux"
import AddProject from "./Projects/AddProject"
import UpdateProject from "./Projects/UpdateProject"
import { useEffect } from "react"
import { authActions } from "./store"
import Images from "./Images_gallery/Images"
import AddNewImages from "./Images_gallery/AddNewImages"
import DocumentGallery from "./Document_gallery/DocumentGallery"
import AddNewPdfDocument from "./Document_gallery/AddNewPdfDocument"
import AddNewImage from "./Images_gallery/AddNewImages"
import LatestProjects from "./Projects/LatestProjects"
import Users from "./Auth/Users"

function App() {
  const dispatch =useDispatch()
  const isLoggedIn=useSelector(state=>state.isLoggedIn)
  console.log(isLoggedIn)
  useEffect(()=>{
    if (localStorage.getItem("userId")) {
      dispatch(authActions.login())
    }
  },[localStorage])
  
  return (
    <>
      <header>
        <Header />
      </header>
      <section>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about-us' element={<AboutUs />} />
          <Route path='/services' element={<Services />} />
          <Route path='/contact-us' element={<ContactUs />} />
          <Route path='/users/login' element={<Auth />} />
          <Route path='/projects' element={<Projects />} />
          <Route path='/projects/latest-projects' element={<LatestProjects />} />
          <Route path='/image-gallery' element={<Images />} />
          <Route path='/document-gallery' element={<DocumentGallery />} />
          {isLoggedIn && <>
          
          <Route path='/users' element={<Users />} />
          <Route path='/users/signup' element={<AddUser />} />
          <Route path='/projects/new' element={<AddProject />} />
          <Route path='/projects/:id' element={<UpdateProject />} />
          <Route path='/document-gallery/new' element={<AddNewPdfDocument />} />
          <Route path='/image-gallery/new' element={<AddNewImage />} />
          
          </>}
        </Routes>
      </section>
    </>
  )
}

export default App
