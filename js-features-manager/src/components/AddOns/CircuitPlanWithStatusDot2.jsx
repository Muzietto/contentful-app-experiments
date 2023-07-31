import { Flex, Text } from '@contentful/f36-components';
import React from 'react';

import EntityStatusDot2 from './EntityStatusDot2';

const CircuitPlanWithStatusDot2 = ({
  circuitPlan,
  circuitPlans,
}) => {
  // Search circuitPlan by id
  const entity = circuitPlans.find((cp) => cp.sys.id === circuitPlan.sys.id);

  return (
    <Flex justifyContent='space-between'>
      <Flex alignItems='center'>
        <EntityStatusDot2 entity={entity} tooltipDisabled={true} />
        {circuitPlan.fields.circuitId ? (
          circuitPlan.fields.circuitId
        ) : (
          <Text fontColor='gray400' as='i'>
            empty
          </Text>
        )}
        {circuitPlan.fields.planId ? (
          <Text fontColor='gray400'> / {circuitPlan.fields.planId}</Text>
        ) : (
          <Text fontColor='gray400'> / default</Text>
        )}
      </Flex>
    </Flex>
  );
};

export default CircuitPlanWithStatusDot2;
