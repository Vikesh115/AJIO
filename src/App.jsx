// App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store.js';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Mens from './pages/shop/Mens';
import Womens from './pages/shop/Womens';
import Jewelry from './pages/shop/Jewelry';
import Electronics from './pages/shop/Electronics';
import ProductDetails from './pages/ProductDetails.jsx';
import SearchResults from './pages/SearchResults.jsx';
import Cart from './pages/Cart.jsx';
import Wishlist from './pages/WishList.jsx';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Signup from './pages/Signup.jsx';
import Login from './pages/Login.jsx';
import Footer from './components/Footer.jsx';

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop/mens-clothing" element={<Mens />} />
              <Route path="/shop/womens-clothing" element={<Womens />} />
              <Route path="/shop/jewelry" element={<Jewelry />} />
              <Route path="/shop/electronics" element={<Electronics />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
              <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;