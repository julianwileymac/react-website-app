import React from 'react';
import { PasswordForgetForm } from '../PasswordForget';
import PasswordChangeForm from '../PasswordChange';
import { CssBaseline, Container, Box } from '@material-ui/core';
import Typography from 'material-ui/styles/typography';

const AccountPage = () => (
  <React.Fragment>
    <CssBaseline />
    <Container>
      <Typography component="h1" variant="h2" color="textPrimary" gutterBottom>
        Account Page
      </Typography>
    </Container>
    <Box>
      <PasswordChangeForm>
      </PasswordChangeForm>
    </Box>
    <PasswordForgetForm/>
  </React.Fragment>
);

export default AccountPage;