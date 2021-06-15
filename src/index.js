import React from 'react';
import ons from 'onsenui'
import { render } from 'react-dom';
import PrompInstall from './prompInstall';

import {fateEffect} from 'utils/fateEffect'

import { App } from 'components'
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = document.getElementById('root');

ons.disableAutoStyling();

ons.ready(() => {
  render(
    <>
      <App />
      <PrompInstall />
    </>,
    root
  );

  fateEffect('root-loader')
})


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register({timeoutUpdate: 10000 });
