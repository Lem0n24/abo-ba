import React, { Component, ErrorInfo } from 'react';

import './ErrorBoundary.less';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
    this.setState({ hasError: true });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      const menu = document.getElementsByClassName('navigation-menu')[0];

      if (menu) {
        menu.remove();
      }

      return (
        <div className="error-boundary">
          <span className="error-boundary__icon" role="img" aria-label="Something wrong!">
            &#128561;
          </span>
          <h3 className="error-boundary__title">Что-то пошло не так!</h3>
          <h4 className="error-boundary__subtitle">но мы уже над этим работаем</h4>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
