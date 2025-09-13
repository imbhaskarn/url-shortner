const { encrypt, decrypt } = require('../payment/encryption');

describe('Encryption', () => {
  it('should encrypt and decrypt sensitive data', () => {
    const sensitiveData = 'my_secret_data';
    const { encryptedData, iv } = encrypt(sensitiveData);
    const decryptedData = decrypt(encryptedData, iv);

    expect(decryptedData).toBe(sensitiveData);
  });
});
