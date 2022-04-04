import { MenuOutlined } from '@mui/icons-material';
import { AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import React, { ReactNode } from 'react';

// import { Container } from './styles';

interface Props {
  rightButton: ReactNode;
}

const TopBar: React.FC<Props> = ({ rightButton }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton>
          <MenuOutlined />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Playlist Creator For Spotify
        </Typography>
        {rightButton}
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
