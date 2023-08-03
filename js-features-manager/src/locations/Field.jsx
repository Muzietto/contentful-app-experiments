import React, { useEffect, useState } from 'react';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { JsonEditor } from '@contentful/field-editor-json';

import FeaturesManager from '../components/FeaturesManager';
import FeaturesManager2 from '../components/FeaturesManager2';

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

  const Editor = {
    'features-manager': FeaturesManager,
    'features-manager2': FeaturesManager2,
    'generic-json': () => <JsonEditor field={sdk.field} isInitiallyDisabled={false} />,
    'naw-remote-config': () => <JsonEditor field={sdk.field} isInitiallyDisabled={false} />,
  }[handler] || (() => null);

  return <Editor />;
};

export default Field;
