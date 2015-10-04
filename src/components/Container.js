import React from 'react';
import _lodash from 'lodash';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { props: props.routerProps };
  }

  onLoadData(props) {
    const mergedProps = _lodash.merge(this.state.props, props);
    this.setState({ props: mergedProps });
  }

  render() {
    const Component = this.props.component;
    return <Component { ...this.state.props } onLoadData={ this.onLoadData.bind(this) } />;
  }
}

Container.propTypes = {
  component: React.PropTypes.object
};
