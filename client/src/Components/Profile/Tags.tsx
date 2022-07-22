import React, { useState, useContext } from 'react';
import { ToggleButton } from 'react-bootstrap';
import { ThemeContext } from '../../App';

interface Props {
  tag: string;
  i: number;
  setVal: (val: string[]) => void;
  value: string[];
}

const Tags = ({ tag, i, setVal, value }: Props) => {
  const theme = useContext(ThemeContext);
  const [checked, setChecked] = useState(
    value.find((val) => val === tag) !== undefined
  );

  const handleChange = () => {
    if (checked) {
      setVal(value.filter((item) => item !== tag));
    } else {
      setVal([...value, tag]);
    }
    setChecked(!checked);
  };

  return (
    <ToggleButton
      className={theme === 'dark' ? 'm-2 dark' : 'm-2'}
      id={`tag-${i}`}
      type='checkbox'
      variant='outline-primary'
      checked={checked}
      value={tag}
      onChange={() => {
        handleChange();
      }}
    >
      {tag}
    </ToggleButton>
  );
};

export default Tags;
