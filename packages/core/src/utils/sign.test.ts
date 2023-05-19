import { sign, signAsync } from './sign.js';

describe('sign', () => {
  it('should generate correct signature with both async and sync version', async () => {
    const signingKey = 'foo';
    const payload = {
      bar: 'bar',
      foo: 'foo',
    };

    const signature = sign(signingKey, payload);
    const signatureByAsync = await signAsync(signingKey, payload);
    const expectedResult =
      'sha256=436958f1dbfefab37712fb3927760490fbf7757da8c0b2306ee7b485f0360eee';

    expect(signature).toBe(expectedResult);
    expect(signatureByAsync).toBe(expectedResult);
  });

  it('should generate correct signature if payload is empty with both async and sync version', async () => {
    const signingKey = 'foo';
    const payload = {};
    const signature = sign(signingKey, payload);
    const signatureByAsync = await signAsync(signingKey, payload);
    const expectedResult =
      'sha256=c76356efa19d219d1d7e08ccb20b1d26db53b143156f406c99dcb8e0876d6c55';

    expect(signature).toBe(expectedResult);
    expect(signatureByAsync).toBe(expectedResult);
  });
});
