import React, { Component } from 'react';
import './Select.css';

export class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // для рендера списка
      values: [],
      //focused value length - 1
      focusedValue: -1,
      // для взятия в фокус элемента списка
      isFocused: false,
      // для открытия дропдаун меню
      isOpen: false,
    };

    this.renderOptions = this.renderOptions.bind(this);
    this.renderOption = this.renderOption.bind(this);
    this.renderValues = this.renderValues.bind(this);
    this.onClickOption = this.onClickOption.bind(this);
    this.onClick = this.onClick.bind(this);
  }

  //clicked the option
  onClickOption(e) {
    const { multiple } = this.props;

    const { value } = e.currentTarget.dataset;

    this.setState((prevState) => {
      if (!multiple) {
        return {
          values: [value],
          isOpen: false,
        };
      }

      const [...values] = prevState.values;
      const index = values.indexOf(value);

      if (index === -1) {
        values.push(value);
      } else {
        values.splice(index, 1);
      }

      return { values };
    });
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  // the main onClick function
  onClick() {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  }

  renderValues() {
    const { placeholder, multiple } = this.props;
    const { values } = this.state;

    if (values.length === 0) {
      return <div className="placeholder">{placeholder}</div>;
    }

    if (multiple) {
      return values.map((value) => {
        return (
          <span key={value} onClick={this.stopPropagation} className="multiple value">
            {value}
            <span data-value={value} onClick={this.onDeleteOption} className="delete">
              del
            </span>
          </span>
        );
      });
    }

    return <div className="value">{values[0]}</div>;
  }

  renderOptions() {
    const { options } = this.props;
    const { isOpen } = this.state;

    if (!isOpen) {
      return null;
    }

    return <div className="options">{options.map(this.renderOption)}</div>;
  }

  renderOption(option, index) {
    const { multiple } = this.props;
    const { values, focusedValue } = this.state;

    const { value } = option;

    const selected = values.includes(value);

    let className = 'option';
    if (selected) className += ' selected';
    if (index === focusedValue) className += ' focused';

    return (
      <div
        key={value}
        data-value={value}
        className={className}
        onMouseOver={this.onHoverOption}
        onClick={this.onClickOption}>
        {multiple ? <span className="checkbox">{selected ? 'check' : null}</span> : null}
        {value}
      </div>
    );
  }

  render() {
    const { isOpen } = this.state;
    const { label } = this.props;

    return (
      <div className="select" tabIndex="0">
        <label className="label">Label {label}</label>
        {/* the main onClick function */}
        <div className="selection" onClick={this.onClick}>
          Render values {this.renderValues()}
          <span className="arrow">{isOpen ? <span>arrow up</span> : <span>arrow down</span>}</span>
        </div>
        render options {this.renderOptions()}
      </div>
    );
  }
}

export default Select;
