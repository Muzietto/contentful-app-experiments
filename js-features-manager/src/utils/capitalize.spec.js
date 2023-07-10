import capitalize from './capitalize';

describe('capitalize', () => {
  it('capitalizes', () => {
    expect(capitalize('gigio')).toEqual('Gigio');
  });
});
