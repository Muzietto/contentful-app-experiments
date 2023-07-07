import React from 'react';
import { Flex, Text, Stack } from '@contentful/f36-components';
import { DoneIcon } from '@contentful/f36-icons';
import { useAppSelector } from '../../store';
import { selectFilteredConfigs } from '../../store/appSlice';
import FeatureItem from './FeatureItem';

const FeatureList = () => {
  
  const filteredConfigs = useAppSelector(selectFilteredConfigs);

  return (<>
    {Object.keys(filteredConfigs).length === 0
      ? <Flex alignItems='center' marginTop='spacingS' style={{ padding: '10px 16px' }}>
        <Flex gap='16px'>
          <DoneIcon variant='secondary' />
          <Text fontColor='gray600'>Features List is empty</Text>
        </Flex>
      </Flex>
      : <Stack flexDirection='column' paddingTop='spacingXs' style={{ gap: 0 }}>
        {Object.keys(filteredConfigs).map((key, i) => {
          return (<FeatureItem key={key} featureKey={key} index={i} />);
        })}
      </Stack>
    }
  </>);
};

export default FeatureList;
