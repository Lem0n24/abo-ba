import React from 'react';
import { Button, Buuton, Page } from 'react-onsenui';

import { Loader, Toolbar } from 'components';
import { IconTetrad } from 'components/icons'
import { getRoute } from 'routes';

const Home = ({ navigator, params }) => {
  const onSelect = () => {
    const page = getRoute('groupSelect');

    console.log('page', page);
    navigator.pushPage(page);
  }

  const onBack = () => {
    navigator.popPage();
  };

  return (
    <Page
      modifier="home"
      renderToolbar={() => (
        <Toolbar onBack={onBack} />
      )}
    >
      <Loader size={24} />
      <IconTetrad width="30" height={30} />

      <Button modifier="button-main-node" onClick={onSelect}>
        ТЫК
      </Button>
    </Page>
  );
}

export default Home;
