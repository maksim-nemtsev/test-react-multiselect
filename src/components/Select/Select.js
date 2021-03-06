import React, { Component } from 'react';
import './Select.scss';

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
  }

  //clicked the option
  onClickOption = (e) => {
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
  };

  stopPropagation(e) {
    e.stopPropagation();
  }

  // the main onClick function
  onClick = () => {
    this.setState((prevState) => ({
      isOpen: !prevState.isOpen,
    }));
  };

  onDeleteOption = (e) => {
    const { value } = e.currentTarget.dataset;

    this.setState((prevState) => {
      const [...values] = prevState.values;
      const index = values.indexOf(value);

      values.splice(index, 1);

      return { values };
    });
  };

  renderValues = () => {
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
              <X />
            </span>
          </span>
        );
      });
    }

    return <div className="value">{values[0]}</div>;
  };

  renderOptions = () => {
    const { options } = this.props;
    const { isOpen } = this.state;

    if (!isOpen) {
      return null;
    }

    return <div className="options">{options.map(this.renderOption)}</div>;
  };

  renderOption = (option, index) => {
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
  };

  render() {
    const { isOpen } = this.state;
    const { label } = this.props;

    return (
      <div className="select" tabIndex="0">
        <label className="label">{label}</label>
        {/* the main onClick function */}
        <div className="selection" onClick={this.onClick}>
          {this.renderValues()}
          <span className="arrow">
            {isOpen ? (
              <span>
                <ArrowUp />
              </span>
            ) : (
              <span>
                <ArrowDown />
              </span>
            )}
          </span>
        </div>
        {this.renderOptions()}
      </div>
    );
  }
}

const ArrowDown = () => (
  <svg viewBox="0 0 10 7">
    <path
      d="M2.08578644,6.5 C1.69526215,6.89052429 1.69526215,7.52368927 2.08578644,7.91421356 C2.47631073,8.30473785 3.10947571,8.30473785 3.5,7.91421356 L8.20710678,3.20710678 L3.5,-1.5 C3.10947571,-1.89052429 2.47631073,-1.89052429 2.08578644,-1.5 C1.69526215,-1.10947571 1.69526215,-0.476310729 2.08578644,-0.0857864376 L5.37867966,3.20710678 L2.08578644,6.5 Z"
      transform="translate(5.000000, 3.207107) rotate(90.000000) translate(-5.000000, -3.207107) "
    />
  </svg>
);

const ArrowUp = () => (
  <svg viewBox="0 0 10 8">
    <path
      d="M2.08578644,7.29289322 C1.69526215,7.68341751 1.69526215,8.31658249 2.08578644,8.70710678 C2.47631073,9.09763107 3.10947571,9.09763107 3.5,8.70710678 L8.20710678,4 L3.5,-0.707106781 C3.10947571,-1.09763107 2.47631073,-1.09763107 2.08578644,-0.707106781 C1.69526215,-0.316582489 1.69526215,0.316582489 2.08578644,0.707106781 L5.37867966,4 L2.08578644,7.29289322 Z"
      transform="translate(5.000000, 4.000000) rotate(-90.000000) translate(-5.000000, -4.000000) "
    />
  </svg>
);

const X = () => (
  <svg viewBox="0 0 16 16">
    <path d="M2 .594l-1.406 1.406.688.719 5.281 5.281-5.281 5.281-.688.719 1.406 1.406.719-.688 5.281-5.281 5.281 5.281.719.688 1.406-1.406-.688-.719-5.281-5.281 5.281-5.281.688-.719-1.406-1.406-.719.688-5.281 5.281-5.281-5.281-.719-.688z" />
  </svg>
);

export default Select;
