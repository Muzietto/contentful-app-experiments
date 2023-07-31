import React from 'react';
import { Flex, Text, Stack } from '@contentful/f36-components';
import { DoneIcon } from '@contentful/f36-icons';
import { useAppSelector } from '../../store';
import { selectFilteredConfigs } from '../../store/appSlice';
import FeatureItem2 from './FeatureItem2';

const FeatureList2 = ({
  filteredConfigs = {},
  fm2Dispatch = () => {},
  fm2State = {
    features: { enabledEditFeature: false },
    circuitPlans: { entities: {}, selectedId: '' },
  },
}) => {

  // const filteredConfigs = useAppSelector(selectFilteredConfigs);

  const { circuitPlans, features } = fm2State;

  const selectedCircuitPlan = circuitPlans.entities[circuitPlans.selectedId];

  return <>
    {(Object.keys(filteredConfigs).length === 0)
      ? <Flex alignItems='center' marginTop='spacingS' style={{ padding: '10px 16px' }}>
        <Flex gap='16px'>
          <DoneIcon variant='secondary' />
          <Text fontColor='gray600'>Features List is empty</Text>
        </Flex>
      </Flex>
      : <Stack flexDirection='column' paddingTop='spacingXs' style={{ gap: 0 }}>
        {Object.keys(filteredConfigs).map((key, i) => {
          return <FeatureItem2
            key={key}
            featureKey={key}
            fm2Dispatch={fm2Dispatch}
            enabledEditFeature={features.enabledEditFeature}
            selectedCircuitPlan={selectedCircuitPlan}
          />;
        })}
      </Stack>
    }
  </>;
};

export default FeatureList2;
