import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { useId } from 'react';

interface BorderedBoxProps extends BoxProps {
  title?: string;
  children: React.ReactNode;
}

const BorderedBox: React.FC<BorderedBoxProps> = ({
  title,
  children,
  ...props
}) => {
  const titleId = useId();

  return (
    <Box
      role='group'
      aria-labelledby={title ? titleId : undefined}
      {...props}
      sx={{
        border: 1,
        borderColor: 'divider',
        borderRadius: 1,
        p: 2,
        position: 'relative',
        ...props.sx,
      }}
    >
      {title && (
        <Typography
          id={titleId}
          variant='caption'
          sx={{
            position: 'absolute',
            top: -10,
            left: 8,
            px: 1,
            backgroundColor: 'background.paper',
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
