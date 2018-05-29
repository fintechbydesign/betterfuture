import React, { Component } from 'react';
import './Menu.css';

class Menu extends Component {
  constructor (props) {
    super(props);
    this.renderMenu = this.renderMenu.bind(this);
    this.updateState = this.updateState.bind(this);
    this.state = {
      debug: props.debug
    };
  }

  updateState (newProps) {
    this.setState({
      ...this.state,
      ...newProps
    });
  }

  renderMenu () {
    const toggleDebug = this.updateState.bind(null, { debug: !this.state.debug });
    const close = () => {
      const newProps = {
        ...this.state,
        showMenu: false
      };
      this.props.updateState(newProps);
    };
    return (
      <div className='Menu'>
        <h3>WonderWall Options</h3>
        <input type='checkbox' id='debug' onClick={toggleDebug} checked={this.state.debug} />
        <label htmlFor='debug'>enable debug elements</label>
        <button id='ok' className='Menu_ok' onClick={close} >OK</button>
      </div>
    );
  }

  render () {
    if (this.props.showMenu) {
      // menu dialog
      return this.renderMenu();
    } else if (this.props.popupVisible) {
      // no menu icon if popup showing
      return null;
    } else {
      // menu icon
      const showMenu = this.props.updateState.bind(null, { showMenu: true });
      return (<img src='./images/menu-icon.png' alt='menu' className='Menu_icon' onClick={showMenu} />);
    }
  }
}

export default Menu;
