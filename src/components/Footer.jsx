import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 bottom-0">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Customer Service */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">CUSTOMER SERVICE</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-gray-300">Contact Us</Link></li>
                            <li><Link to="/" className="hover:text-gray-300">FAQs</Link></li>
                            <li><Link to="/" className="hover:text-gray-300">Returns & Refunds</Link></li>
                            <li><Link to="/" className="hover:text-gray-300">Track Order</Link></li>
                            <li><Link to="/" className="hover:text-gray-300">Shipping Information</Link></li>
                        </ul>
                    </div>

                    {/* About AJIO */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">ABOUT AJIO</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-gray-300">About Us</Link></li>
                            <li><Link to="/" className="hover:text-gray-300">Careers</Link></li>
                            <li><Link to="/" className="hover:text-gray-300">Terms & Conditions</Link></li>
                            <li><Link to="/" className="hover:text-gray-300">Privacy Policy</Link></li>
                            <li><Link to="/" className="hover:text-gray-300">Blog</Link></li>
                        </ul>
                    </div>

                    {/* Shop By */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">SHOP BY</h3>
                        <ul className="space-y-2">
                            <li><Link to="/shop/mens-clothing" className="hover:text-gray-300">Men</Link></li>
                            <li><Link to="/shop/womens-clothing" className="hover:text-gray-300">Women</Link></li>
                            <li><Link to="/shop/jewelry" className="hover:text-gray-300">Jewelry</Link></li>
                            <li><Link to="/shop/electronics" className="hover:text-gray-300">Electronics</Link></li>
                            <li><Link to="/" className="hover:text-gray-300">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Follow Us */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">FOLLOW US</h3>
                        <div className="flex space-x-4 mb-4">
                            <Link to="/" className="hover:text-gray-300">
                                <span className="sr-only">Facebook</span>
                                <i className="fab fa-facebook-f text-xl"></i>
                            </Link>
                            <Link to="/" className="hover:text-gray-300">
                                <span className="sr-only">Instagram</span>
                                <i className="fab fa-instagram text-xl"></i>
                            </Link>
                            <Link to="/" className="hover:text-gray-300">
                                <span className="sr-only">Twitter</span>
                                <i className="fab fa-twitter text-xl"></i>
                            </Link>
                            <Link to="/" className="hover:text-gray-300">
                                <span className="sr-only">Pinterest</span>
                                <i className="fab fa-pinterest text-xl"></i>
                            </Link>
                        </div>
                        <div>
                            <h4 className="font-medium mb-2">DOWNLOAD APP</h4>
                            <div className="flex space-x-2">
                                <Link to="/">
                                    <img src="https://cdn-icons-png.flaticon.com/128/5977/5977575.png" alt="App Store" className="h-10" />
                                </Link>
                                <Link to="/">
                                    <img src="https://cdn-icons-png.flaticon.com/128/12942/12942208.png" alt="Play Store" className="h-10" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700 mt-8 pt-8 text-center">
                    <p>© 2025 AJIO. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;