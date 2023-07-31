import { Flex, Spinner, Text } from '@contentful/f36-components';
import React from 'react';

const TextLoader2 = ({ message = 'Loading' }) => {
  return (
    <Flex>
      <Text marginRight='spacingXs'>{message}</Text>
      <Spinner size='small' />
    </Flex>
  );
};

export default TextLoader2;
