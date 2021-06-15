import React, { useRef } from 'react';
import { Navigator } from 'react-onsenui';

import { ErrorBoundary } from 'components';
import { getRoute } from 'routes';

import 'styles';

const initRoute = getRoute('home');

const App = () => {
  const navigatorEl = useRef(null);

  const renderPage = (route, navigator) => {
    return (
      <ErrorBoundary key={route.uniqKey}>
        <route.component navigator={navigator} params={route.params} />
      </ErrorBoundary>
    )
  }

  return (
    <Navigator
      ref={navigatorEl}
      renderPage={renderPage}
      initialRoute={initRoute}
      animation="slide-ios"
    />
  )
}

export default App;
