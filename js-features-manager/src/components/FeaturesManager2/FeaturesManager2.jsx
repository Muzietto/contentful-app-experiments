import React, { useEffect, useReducer } from 'react';
import { FieldExtensionSDK } from '@contentful/app-sdk';
import { Box, Flex, Note, Text } from '@contentful/f36-components';
import { useAutoResizer, useCMA, useSDK } from '@contentful/react-apps-toolkit';

import { useAppDispatch, useAppSelector } from '../../store';
import { setConfigs, setLocales } from '../../store/appSlice';
import { selectedCircuitPlanSelectors } from '../../store/circuitPlansSlice';
import { setSearch } from '../../store/featuresSlice';

import {
  initialState,
  reducer,
} from './featuresManager2Administration';

import SearchInput2 from '../AddOns/SearchInput2';
import SelectCircuitPlan2 from '../AddOns/SelectCircuitPlan2';
import FeatureInsert2 from './FeatureInsert2';
import FeatureList2 from './FeatureList2';

const FeaturesManager2 = () => {
  const sdk = useSDK();
  const cma = useCMA();
  useAutoResizer();

  // const dispatch = useAppDispatch();
  const search = useAppSelector((state) => state.features.search);
  const configs = useAppSelector((state) => state.app.configs);
  const selectedCircuitPlan = useAppSelector(selectedCircuitPlanSelectors);

  const [fm2State, fm2Dispatch] = useReducer(reducer, initialState());

  useEffect(() => {
    fm2Dispatch({
      type: 'START_LOADING_CIRCUITPLANS',
    });
    cma.entry.getMany({
      query: { content_type: 'circuitPlan' },
    })
    .then(({ items }) => {
      fm2Dispatch({
        type: 'SET_CIRCUITPLANS',
        payload: items,
      });
    })
  }, []);

  useEffect(() => {
    fm2Dispatch({
      type: 'SET_LOCALES',
      payload: sdk?.locales.available,
    });
    // dispatch(setLocales(sdk.locales));
  }, [sdk]);

  // NB: circuit/plan entries are fetched inside circuitPlansSlice

  useEffect(() => {
    const unsubscribe = sdk.field.onValueChanged(e => {
      // debugger;
      fm2Dispatch({
        type: 'SET_CONFIGS',
        payload: e,
      });
      // dispatch(setConfigs(e));
    });

    return unsubscribe;
  }, [cma, sdk]);

  const filteredConfigs = Object.keys(fm2State.app.configs)
    .reduce((acc, curr) => {
      const soughtString = fm2State.features.search;
      if (!soughtString || curr.toLowerCase().includes(soughtString.toLowerCase())) {
        acc[curr] = fm2State.app.configs[curr];
      }
      return acc;
    }, {});

  return (
    <Box style={{ margin: '4px 4px 0 0' }}>
      <Text fontColor='gray400'>
        VERSION 2
      </Text>
      <Flex flexDirection='column' style={{ minHeight: '250px' }}>
        <Flex
          justifyContent='space-between'
          alignItems='center'
          marginBottom={selectedCircuitPlan ? undefined : 'spacingM'}
        >
          <Flex>
            <SelectCircuitPlan2
              circuitPlans={fm2State.circuitPlans}
              fm2Dispatch={fm2Dispatch}
            />
          </Flex>
          <Flex>
            <SearchInput2
              placeholder='Search features'
              value={search}
              onSearch={term => {
                fm2Dispatch({
                  type: 'SET_SEARCHSTRING',
                  payload: term,
                });
                // dispatch(setSearch(term));
              }}
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
          <FeatureList2
            filteredConfigs={filteredConfigs}
            fm2Dispatch={fm2Dispatch}
            fm2State={fm2State}
          />
          {sdk.user.spaceMembership.admin
            && <>
            <FeatureInsert2 />
          </>}
        </Flex>
      </Flex>
    </Box>
  );
};

export default FeaturesManager2;
