import React, { useEffect } from 'react';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { Box, Flex, Note } from '@contentful/f36-components';
import { useAutoResizer, useCMA, useSDK } from '@contentful/react-apps-toolkit';

import { useAppDispatch, useAppSelector } from '../../store';
import { setConfigs, setLocales } from '../../store/appSlice';
import { selectedCircuitPlanSelectors } from '../../store/circuitPlansSlice';
import { setSearch } from '../../store/featuresSlice';
import SearchInput from '../SearchInput';
import SelectCircuitPlan from '../SelectCircuitPlan';
import FeatureInsert from './FeatureInsert';
import FeatureList from './FeatureList';

const FeaturesManager = () => {
  const sdk = useSDK();
  const cma = useCMA();
  useAutoResizer();

  const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.features.search);
  const configs = useAppSelector((state) => state.app.configs);
  const selectedCircuitPlan = useAppSelector(selectedCircuitPlanSelectors);

  useEffect(() => {
    dispatch(setLocales(sdk.locales));
  }, [dispatch, sdk]);

  // Fetch circuit/plan entries
  useEffect(() => {
    const unsubscribe = sdk.field.onValueChanged((e) => {
      dispatch(setConfigs(e));
    });

    const fieldValue = sdk.field.getValue();

    if (fieldValue) {
      dispatch(setConfigs(fieldValue));
    } else {
      sdk.field.setValue({});
    }

    return () => {
      unsubscribe();
    };
  }, [cma, dispatch, sdk]);

  return (
    <Box style={{ margin: '4px 4px 0 0' }}>
      <Flex flexDirection='column' style={{ minHeight: '250px' }}>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          marginBottom={selectedCircuitPlan ? undefined : 'spacingM'}
        >
          <Flex>
            <SelectCircuitPlan />
          </Flex>
          <Flex>
            <SearchInput
              placeholder='Search features'
              value={search}
              onSearch={(term) => dispatch(setSearch(term))}
            />
          </Flex>
        </Flex>
        <Flex flexDirection='column'>
          {(!selectedCircuitPlan
            || !configs
            || Object.keys(configs).length === 0) && (
            <Note variant='primary'>
              {!selectedCircuitPlan
                ? 'Select a circuit/plan to be able to configure the features'
                : 'Add the first feature'}
            </Note>
          )}
          <FeatureList />
          {sdk.user.spaceMembership.admin
            && <>
            <FeatureInsert />
          </>}
        </Flex>
      </Flex>
    </Box>
  );
};

export default FeaturesManager;
