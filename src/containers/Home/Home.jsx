import React from 'react';
import { Button, Buuton, Page } from 'react-onsenui';

import { Loader, Toolbar } from 'components';
import { IconTetrad } from 'components/icons'
import { getRoute } from 'routes';

const Home = ({ navigator, params }) => {
  const onSelect = () => {
    const page = getRoute('groupSelect');

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
      <div className="container-home">
        HOME
        <div className="container-home__title">
          TITLE
        </div>

        <Button onClick={onSelect} modifier="material">
          ТЫК
        </Button>
      </div>
    </Page>
  );
}

export default Home;
