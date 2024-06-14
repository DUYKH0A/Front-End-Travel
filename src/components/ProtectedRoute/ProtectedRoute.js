import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    // Nếu không có người dùng nào đã đăng nhập, chuyển hướng đến trang đăng nhập
    return <Navigate to="/login" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Nếu người dùng không có quyền truy cập vào route này, chuyển hướng đến trang không được ủy quyền
    return <Navigate to="/home" />;
  }

  // Nếu người dùng có quyền truy cập vào route này, hiển thị nội dung được bảo vệ
  return children;
};

export default ProtectedRoute;
