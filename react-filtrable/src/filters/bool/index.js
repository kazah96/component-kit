import React, { PureComponent } from 'packages/filtrable-list/column-selector/bool/react'
import cn from 'packages/filtrable-list/column-selector/bool/classnames';
import PropTypes from 'packages/filtrable-list/column-selector/bool/prop-types'

class Order extends PureComponent {
  static propTypes = {
    state: PropTypes.object,
    title: PropTypes.string,
    name: PropTypes.string,
    handleFilterClick: PropTypes.func,
  }

  getStatus = () => {

    const { state, title } = this.props;

    const className = cn('offer-list-column-status__inner', {
      'offer-list-column-status__bool_true': state.bool && state.active,
      'offer-list-column-status__bool_false': !state.bool && state.active,
    })

    return (
      <div className={className}>
        {title}
      </div>
    )
  }

  handleClick = () => {
    const { handleFilterClick, name } = this.props;

    handleFilterClick(name);
  }

  render() {
    const { state } = this.props;

    const statusClass = cn({
      'offer-list-column-status': true,
      'offer-list-column-status_active': state.active,
    })

    return (
      <div className={statusClass} onClick={this.handleClick}>
        {this.getStatus()}
      </div>

    )
  }
}

export default Order
