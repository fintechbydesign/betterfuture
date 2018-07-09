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
    const { alternateRender, renderDurations, statsURL, updateState } = this.props;
    const { debug } = this.state;
    const toggleDebug = this.updateState.bind(null, { debug: !debug });
    const close = () => {
      const newProps = {
        ...this.state,
        showMenu: false
      };
      updateState(newProps);
      alternateRender();
    };
    const durations = Object.entries(renderDurations).map(([key, value]) => {
      const update = (event) => {
        const newDurations = { ...renderDurations };
        newDurations[key] = Number(event.target.value);
        updateState({ renderDurations: newDurations });
      };
      return (
        <div>
          <label htmlFor={key}>{`Duration for ${key}:`}</label>
          <input type='number' id={key} onChange={update} value={value} />
        </div>
      );
    });
    const updateStatsURL = (event) => {
      updateState({ statsURL: event.target.value });
    }
    return (
      <div className='Menu'>
        <h3>WonderWall Options</h3>
        <input type='checkbox' id='debug' onClick={toggleDebug} checked={debug} />
        <label htmlFor='debug'>enable debug elements</label>
        <div>
          <strong>Durations:</strong>
          {durations}
        </div>
        <label htmlFor='statsURL'>URL for data viz:</label>
        <input type='text' id='statsURL' onChange={updateStatsURL} size='80' value={statsURL} />
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
