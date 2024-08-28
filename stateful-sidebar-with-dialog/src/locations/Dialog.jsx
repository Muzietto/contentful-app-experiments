import React from 'react';
import { Paragraph, Button } from '@contentful/f36-components';
import { /* useCMA, */ useSDK } from '@contentful/react-apps-toolkit';
import { useStateAndDispatch } from '../components/StateAndDispatch';

const Dialog = () => {
  const sdk = useSDK();
  const [state, dispatch] = useStateAndDispatch();
  /*
     To use the cma, inject it as follows.
     If it is not needed, you can remove the next line.
  */
  // const cma = useCMA();

  return <>
    <Paragraph>Hello Dialog Component (AppId: {sdk.ids.app})</Paragraph>
    <Paragraph>{`Time is ${state.timestamp}`}</Paragraph>
    <Button onClick={() => {
      dispatch({
        type: 'SET_TIME',
        payload: new Date().toString(),
      });
    }}>SET TIME</Button>
  </>;
};

export default Dialog;
