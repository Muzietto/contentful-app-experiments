import capitalize from './capitalize';
import { expect } from 'chai';

describe('capitalize', () => {
  it('capitalizes', () => {
    expect(capitalize('gigio')).to.be.eql('Gigio');
  });
});
