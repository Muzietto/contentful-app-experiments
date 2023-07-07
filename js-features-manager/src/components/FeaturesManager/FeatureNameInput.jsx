import React, { useState } from 'react';
import { Button, Flex, FormControl, TextInput } from '@contentful/f36-components';
import tokens from '@contentful/f36-tokens';

const FeatureNameInput = ({ configs, value, showEdit, onConfirm, onCancel }) => {

  const [newValue, setNewValue] = useState(value);

  const isInvalidName = () => {
    return newValue !== value && Object.keys(configs).indexOf(newValue) > -1;
  };

  return (
    <Flex
      justifyContent='space-between'
      paddingTop='spacingM'
      style={{
        width: '100%',
        height: 92,
        paddingLeft: 4,
        borderBottom: `1px solid ${tokens.gray300}`,
      }}
    >
      <FormControl
        isRequired
        isInvalid={isInvalidName()}
        marginBottom='none'
        style={{ width: '60%' }}
      >
        <TextInput
          value={newValue}
          name='config'
          placeholder='Feature name'
          onChange={(e) => setNewValue(e.target.value)}
        />
        <FormControl.ValidationMessage
          style={{ marginBottom: 0, opacity: !isInvalidName() ? 0 : 1 }}
        >
          {isInvalidName() && 'Insert a different name from the ones already present'}
        </FormControl.ValidationMessage>
      </FormControl>
      <div>
        <Button
          onClick={() => {
            onCancel();
            setNewValue('');
          }}
          size='medium'
        >
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm(newValue)}
          variant='primary'
          isDisabled={!newValue || newValue === value || isInvalidName()}
          size='medium'
          style={{ marginLeft: '1rem' }}
        >
          {showEdit ? 'Save' : 'Add'}
        </Button>
      </div>
    </Flex>
  );
};

export default FeatureNameInput;
