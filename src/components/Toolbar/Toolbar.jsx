import React from 'react';
import { Toolbar as RootToolbar, Button } from 'react-onsenui';

import { IconBack } from 'components/icons';

const Toolbar = (props) => {
  const {
    onBack,
  } = props;

  return (
    <RootToolbar className="toolbar-container">
      <div className="toolbar-container__back-btn">
        <Button onClick={onBack} modifier="button-main-node">
          <IconBack width={24} height={24} />
        </Button>
      </div>
    </RootToolbar>
  );
};

export default Toolbar;
