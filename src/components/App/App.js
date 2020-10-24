import React from 'react';
import Select from '../Select';
import './App.css';

const App = () => {
  const options = [
    { value: 'one' },
    { value: 'two' },
    { value: 'three' },
    { value: 'four' },
    { value: 'five' },
    { value: 'six' },
    { value: 'seven' },
    { value: 'eight' },
    { value: 'nine' },
    { value: 'ten' },
  ];
  return (
    <Select
      options={options}
      placeholder="choose the option"
      label="React Multiple Select for test"
      multiple
    />
  );
};

export default App;
