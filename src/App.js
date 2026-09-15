// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import Contact from './pages/Contact';
import Product from './pages/Product';
import ProductDetails from './pages/ProductDetails';
import SellerDashBoard from './pages/SellerDashBoard';
import Cart from './pages/Cart';




function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/> } />
        <Route path='/about' element={<About/> }/>
        <Route path='/contact' element={<Contact />}/>
        <Route path='/product' element={<Product /> } />
        <Route path='/login' element={ <LogIn />}/>
        <Route path='/productdetails/:id' element={<ProductDetails />} />
        <Route path='/sellerDashBoard' element={<SellerDashBoard />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/cart' element={ <Cart />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
