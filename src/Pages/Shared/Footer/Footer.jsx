
import { FaFacebook, FaTwitter, FaInstagram, FaPinterest } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4">
          <h3 className="text-2xl font-bold mb-2">Connect with Us</h3>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-3xl hover:text-blue-500" />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="text-3xl hover:text-blue-400" />
            </a>
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-3xl hover:text-pink-500" />
            </a>
            <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
              <FaPinterest className="text-3xl hover:text-red-500" />
            </a>
          </div>
          <div className="flex space-x-4">
            <Link>Home</Link>
            <Link>Pet Listing</Link>
            <Link>Donation Campaign</Link>
            
          </div>
        </div>
      </div>
      <div className="mt-8 text-center">
        <p>&copy; 2023 PetCrafter. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
