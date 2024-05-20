// import React from 'react';
// import {BrowserRouter as Route, Navigate } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext';

// const PrivateRoute = ({ element: Element, ...rest }) => {
//   const { user } = useContext(AuthContext);

//   return (
//     <Route
//       {...rest}
//       render={(props) =>
//         user ? <Element {...props} /> : <Navigate to="/login" />
//       }
//     />
//   );
// };

// export default PrivateRoute;

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { user } = useContext(AuthContext);

  return user ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
