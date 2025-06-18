import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Container } from '@mui/material';

import logo from '@assets/memoir.png';

const AuthLayout: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100%' }}>
      <div className='row' style={{ minHeight: '100vh'}}>
        <div className='col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6 p-0'>
          <Box sx={{ backgroundColor: '#ecd8cc', display: 'flex', flexDirection: 'row', minHeight: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Container style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
              <img src={logo} alt="Logo" />
            </Container>
          </Box>
        </div>
        <div className='col-sm-12 col-xs-12 col-md-6 col-lg-6 col-xl-6' style={{backgroundColor: '#ecd8cc'}}>
          <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Container maxWidth="sm" sx={{ p: 3, my: 4, backgroundColor: 'white', borderRadius: 2, boxShadow: 3 }}>
              <Outlet/>
            </Container>
          </Box>
        </div>
      </div>
    </Box>
  );
};

export default AuthLayout;