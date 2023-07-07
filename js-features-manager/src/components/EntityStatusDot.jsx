import { Tooltip } from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';
import React, { useMemo } from 'react';

import capitalize from '../utils/capitalize';
import { getEntityStatus } from '../utils/entityStatus';
import Dot from './Dot';

const EntityStatusDot = ({ entity, tooltipDisabled }) => {
  const { color, borderColor, status, testId } = useMemo(() => {
    if (entity) {
      const status = getEntityStatus(entity);
      switch (status) {
        case 'draft':
          return {
            color: tokens.yellow600,
            borderColor: tokens.yellow300,
            status,
            testId: 'draft-dot',
          };
        case 'changed':
          return {
            color: tokens.blue500,
            borderColor: tokens.blue200,
            status,
            testId: 'changed-dot',
          };
        case 'published':
          return {
            color: tokens.green500,
            borderColor: tokens.green200,
            status,
            testId: 'published-dot',
          };
      }
    }
    return {
      color: tokens.gray500,
      borderColor: tokens.gray200,
      testId: 'undefined-dot',
    };
  }, [entity]);

  return (
    <>
      {tooltipDisabled ? (
        <Dot borderColor={borderColor} color={color} testId={testId} />
      ) : (
        <Tooltip
          content={status ? capitalize(status) : 'Not defined'}
          placement='top'
          id='entity-status-dot'
        >
          <Dot borderColor={borderColor} color={color} testId={testId} />
        </Tooltip>
      )}
    </>
  );
};

export default EntityStatusDot;
