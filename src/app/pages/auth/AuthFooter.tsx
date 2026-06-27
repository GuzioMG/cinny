import React from 'react';
import { Box, Text } from 'folds';
import * as css from './styles.css';

export function AuthFooter() {
  return (
    <Box className={css.AuthFooter} justifyContent="Center" gap="400" wrap="Wrap">
      <Text as="a" size="T300" href="https://cinny.in" target="_blank" rel="noreferrer">
        Forked from Cinny
      </Text>
      <Text as="a" size="T300" href="https://github.com/GuzioMG/cinny?tab=AGPL-3.0-1-ov-file" target="_blank" rel="noreferrer">
        Licensed under GPL
      </Text>
      <Text as="a" size="T300" href="https://matrix.org" target="_blank" rel="noreferrer">
        Powered by Matrix
      </Text>
    </Box>
  );
}
