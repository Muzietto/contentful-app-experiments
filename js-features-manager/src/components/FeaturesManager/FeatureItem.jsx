import { FieldExtensionSDK } from '@contentful/app-sdk';
import { Flex, IconButton, Menu, Subheading, Switch } from '@contentful/f36-components';
import { MoreVerticalIcon } from '@contentful/f36-icons';
import tokens from '@contentful/f36-tokens';
import { useSDK } from '@contentful/react-apps-toolkit';
import React, { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store';
import { selectFilteredConfigs } from '../../store/appSlice';
import { selectedCircuitPlanSelectors } from '../../store/circuitPlansSlice';
import { setEnabledEditFeature } from '../../store/featuresSlice';

import { EntryProps } from 'contentful-management';
import MatchedText from '../MatchedText';
import FeatureNameInput from './FeatureNameInput';

const FeatureItem = ({ featureKey, index }) => {

  const sdk = useSDK();

  const dispatch = useAppDispatch();
  const circuitPlans = useAppSelector((state) => state.circuitPlans);
  const configs = useAppSelector((state) => state.app.configs);
  const filteredConfigs = useAppSelector(selectFilteredConfigs);
  const selectedCircuitPlan = useAppSelector(selectedCircuitPlanSelectors);
  const search = useAppSelector((state) => state.features.search);
  const enabledEditFeature = useAppSelector((state) => state.features.enabledEditFeature);

  const [showEdit, setShowEdit] = useState(false);
  const [isOver, setOver] = useState(false);

  const updateEntry = (configId, selectedCircuitPlan) => {
    const { fields: { planId, circuitId }, sys: { id } } = selectedCircuitPlan;
    const newConfigs = Object.assign({}, configs);

    newConfigs[configId] =
      newConfigs[configId].findIndex(({ idEntry }) => idEntry === id) > -1
        ? newConfigs[configId].filter(({ idEntry }) => idEntry !== id)
        : newConfigs[configId].concat({
          idEntry: id,
          circuitId,
          planId: planId || null
        });

    sdk.field.setValue(newConfigs);
  };

  const deleteConfig = (config: string) => {
    const newConfigs = Object.assign({}, configs);
    delete newConfigs[config];

    sdk.field.setValue(newConfigs);
  };

  const updateConfig = (config: string) => {
    const newConfigs = Object.assign({}, configs);
    const entries = newConfigs[featureKey];
    delete newConfigs[featureKey];
    newConfigs[config] = entries;

    sdk.field.setValue(newConfigs);
  };

  const handleDelete = () => {
    sdk.dialogs
      .openConfirm({
        title: 'Delete feature',
        message: `Are you sure you remove the feature '${featureKey}'?`,
        confirmLabel: 'Delete',
        intent: 'negative',
      })
      .then((result) => {
        if (result) {
          deleteConfig(featureKey);
        }
      });
  };

  const handleEdit = () => {
    dispatch(setEnabledEditFeature(true));
    setShowEdit(true);
  };

  const handleCancel = () => {
    dispatch(setEnabledEditFeature(false));
    setShowEdit(false);
  };

  const handleConfirm = (value: string) => {
    updateConfig(value);
    dispatch(setEnabledEditFeature(false));
  };

  return (
    <>
      {showEdit ? (
        <FeatureNameInput
          configs={configs}
          value={featureKey}
          showEdit={true}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <Flex
            justifyContent='space-between'
            alignItems='center'
            style={{
              width: '100%',
              background: isOver ? tokens.gray100 : '',
              margin: 0,
              height: 72,
              //padding: '1.5rem 0',
              borderBottom: `1px solid ${tokens.gray300}`,
            }}
            onMouseOver={() => setOver(true)}
            onMouseLeave={() => setOver(false)}
          >
            <Subheading marginLeft='spacingXs' marginBottom='none'>
              <MatchedText text={featureKey} search={search} fontWeight='fontWeightDemiBold' />
            </Subheading>

            <Flex>
              {sdk.user.spaceMembership.admin && !selectedCircuitPlan && !enabledEditFeature && (
                <Menu>
                  <Menu.Trigger>
                    <IconButton icon={<MoreVerticalIcon />} aria-label='feature-menu-icon' />
                  </Menu.Trigger>
                  <Menu.List>
                    <Menu.Item as='button' onClick={handleEdit}>
                      Edit
                    </Menu.Item>
                    <Menu.Item as='button' onClick={handleDelete}>
                      Delete
                    </Menu.Item>
                  </Menu.List>
                </Menu>
              )}
              {selectedCircuitPlan && (
                <Switch
                  isChecked={filteredConfigs[featureKey].findIndex(({ idEntry }) => idEntry === circuitPlans.selectedId || '') < 0}
                  onChange={() => updateEntry(featureKey, selectedCircuitPlan)}
                />
              )}
            </Flex>
          </Flex>
        </>
      )}
    </>
  );
};

export default FeatureItem;
