import React, { useEffect, useState } from 'react';
import { Page, Button } from 'react-onsenui';

import { Toolbar, BottomSheet } from 'components';

const GroupSelect = ({ navigator, params }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [arr, setArr] = useState([]);

  console.log(arr);

  const onBack = () => {
    navigator.popPage();
  };

  const onOpen = () => {
    setIsOpen(true);

    setArr([1, 2, 3])
  }

  useEffect(() => {
    console.log('Выполнился effect');
  }, []);

  const onClose = () => {
    setIsOpen(false);
  }

  const footer = () => (
    <Button modifier="button-main-node" onClick={onClose}>
      Закрыть модалку
    </Button>
  )

  return (
    <Page
      modifier="group-select"
      renderToolbar={() => (
        <Toolbar onBack={onBack} />
      )}
    >
      <div className="home-container">
        This is Select

        <Button modifier="button-main-node" onClick={onOpen}>
          Открыть модалку
        </Button>
      </div>

      <BottomSheet
        isOpen={isOpen}
        onClose={onClose}
      >
        <div>
          Я модальное окно!

          <Button modifier="button-main-node" onClick={onClose}>
            Закрыть модалку
          </Button>
        </div>
      </BottomSheet>
    </Page>
  )
};

export default GroupSelect;
