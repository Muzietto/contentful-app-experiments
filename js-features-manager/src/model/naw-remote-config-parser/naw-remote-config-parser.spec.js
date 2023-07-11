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

describe('json parsers', () => {
  it('parsers json', () => {
    const run = JNullP.run('null');
    expect(run.isSuccess).toBe(true);
    expect(run.value[0].isJNull).toBe(true);
    expect(JNullP.run('nulx').isFailure).toBe(true);
  });
});
