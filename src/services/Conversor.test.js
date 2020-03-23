import React from 'react';

import { render, waitForElement } from '@testing-library/react';

import conversor from './Conversor';

describe('Teste na conversão' , () => {
  it('converte F para C', async () => {
      console.log(conversor(60))
  })
});