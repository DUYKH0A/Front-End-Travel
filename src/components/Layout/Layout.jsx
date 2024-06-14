import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation hook
import Header from '../Header/Header';
import Routers from '../../router/Routers';
import Footer from '../Footer/Footer';
import { AuthContext } from '../../context/AuthContext';

const Layout = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation(); // Sử dụng useLocation hook để lấy thông tin về địa chỉ URL hiện tại
  // Danh sách các path mà bạn không muốn hiển thị Header và Footer
  const noHeaderFooterPaths = ['/booking','/usermanager','/tourmanager'];
  // Kiểm tra xem trang hiện tại có trong danh sách không
  const shouldShowHeaderFooter = !noHeaderFooterPaths.some(path => location.pathname.includes(path));
  return (
    <>
      {/* Hiển thị Header nếu trang hiện tại không nằm trong danh sách */}
      {shouldShowHeaderFooter && <Header />}
      {/* Render Routers component */}
      <Routers />
      {/* Hiển thị Footer nếu trang hiện tại không nằm trong danh sách */}
      {shouldShowHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
