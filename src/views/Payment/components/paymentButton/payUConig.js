import { PayU } from 'payu-sdk-react';

PayU.setup({
  apiKey: 'TU_API_KEY',
  apiLogin: 'TU_LOGIN',
  language: 'es',
  test: true, // Cambia a `false` en producción
});
