import React, { useEffect, useState } from 'react';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { JsonEditor } from '@contentful/field-editor-json';

import FeaturesManager from '../components/FeaturesManager';

const Field = () => {
  const sdk = useSDK();

  const [handler, setHandler] = useState();

  useEffect(() => {
    const field = Object.values(sdk.entry.fields).find(({ id }) => id === 'handler');
    const unsubscribe = field?.onValueChanged((e) => {
      setHandler(e);
    });

    return () => {
      if (unsubscribe)
        unsubscribe();
    };
  }, [sdk]);

  return (<>
    {handler === 'features-manager' ?
      <FeaturesManager /> :
      <JsonEditor field={sdk.field} isInitiallyDisabled={false} />}
  </>);
};

export default Field;
