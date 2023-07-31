import React, { useState } from 'react';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { Flex, TextLink } from '@contentful/f36-components';
import { PlusIcon } from '@contentful/f36-icons';
import { useSDK } from '@contentful/react-apps-toolkit';

import { useAppSelector } from '../../store';
import FeatureNameInput2 from './FeatureNameInput2';

const FeatureInsert2 = () => {

  const sdk = useSDK();

  const enabledEditFeature = useAppSelector((state) => state.features.enabledEditFeature);
  const selectedCircuitPlan = useAppSelector((state) => state.circuitPlans.selectedId);
  const configs = useAppSelector((state) => state.app.configs);

  const [isCreation, setCreation] = useState(false);

  const addConfig = (value: string) => {
    const newConfigs = Object.assign({}, configs);
    newConfigs[value] = [];

    sdk.field.setValue(newConfigs);
    setCreation(false);
  };

  return (
    <>
      {isCreation ? (
        <FeatureNameInput2
          configs={configs}
          value={''}
          onCancel={() => setCreation(false)}
          onConfirm={addConfig}
        />
      ) : (
        <>
          {!selectedCircuitPlan && (
            <Flex style={{ height: 72, padding: 4 }}>
              <TextLink
                variant='primary'
                isDisabled={enabledEditFeature}
                onClick={() => setCreation(true)}
                icon={<PlusIcon />}
              >
                Add feature
              </TextLink>
            </Flex>
          )}
        </>
      )}
    </>
  );
};

export default FeatureInsert2;
