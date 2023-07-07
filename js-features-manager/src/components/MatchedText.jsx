import { Text, TextProps } from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';
import { getStringMatch } from '@contentful/f36-utils';
import React from 'react';

const MatchedText = ({ text, search = '', ...props }) => {
  const { before, match, after } = getStringMatch(text, search || '');

  return (
    <>
      <Text {...props}>{before}</Text>
      <Text {...props} style={{ backgroundColor: tokens.blue200 }}>
        {match}
      </Text>
      <Text {...props}>{after}</Text>
    </>
  );
};

export default MatchedText;
