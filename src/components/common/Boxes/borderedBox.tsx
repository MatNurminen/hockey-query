import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from 'react';

interface BorderedBoxProps extends BoxProps {
  title?: string;
  children: React.ReactNode;
}

const BorderedBox: React.FC<BorderedBoxProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <Box
      {...props}
      sx={{
        border: 1,
        borderColor: 'grey.400',
        borderRadius: 1,
        p: 2,
        position: 'relative',
        ...props.sx,
      }}
    >
      {title && (
        <Typography
          component='span'
          sx={{
            position: 'absolute',
            top: -10,
            left: 8,
            px: 1,
            backgroundColor: 'background.paper',
            color: 'text.secondary',
            fontSize: '0.75rem',
          }}
        >
          {title}
        </Typography>
      )}
      {children}
    </Box>
  );
};

export default BorderedBox;
