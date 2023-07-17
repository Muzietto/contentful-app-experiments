import { expect } from 'chai';
import {
  JNullP,
  JBoolP,
  jUnescapedCharP,
  jEscapedCharP,
  jUnicodeCharP,
  JStringP,
  jNumberStringP,
  JNumberP,
  JArrayP,
  JObjectP,
} from '../json-parser/json-parsers';
import {
  JValue,
} from '../json-parser/lib/classes';

import nawRemoteConfig from '../../doc/json-js-samples/NAW-remote-config';

describe('json parsers', () => {
  it('parsers json', () => {
    const run = JNullP.run('null');
    expect(run.isSuccess).to.be.true;
    expect(run.value[0].isJNull).to.be.true;
    expect(JNullP.run('nulx').isFailure).to.be.true;
  });
});

console.log('#######################', nawRemoteConfig);
