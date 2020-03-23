import React from 'react';

import { render, waitForElement } from '@testing-library/react';

import temperatura from './Temperatura';

describe('Teste no tipo de pokemon' , () => {
  it('Enviar temperatura para saber o tipo do pokemn', async () => {
      console.log(temperatura('0','rain'))
  })
});