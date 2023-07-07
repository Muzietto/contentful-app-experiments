import { Flex, Text } from '@contentful/f36-components';
import React from 'react';

import EntityStatusDot from './EntityStatusDot';

const CircuitPlanWithStatusDot = ({
  circuitPlan,
  circuitPlans,
}) => {
  // Search circuitPlan by id
  const entity = circuitPlans.find((cp) => cp.sys.id === circuitPlan.sys.id);

  return (
    <Flex justifyContent='space-between'>
      <Flex alignItems='center'>
        <EntityStatusDot entity={entity} tooltipDisabled={true} />
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

export default CircuitPlanWithStatusDot;
