import React, { useState } from 'react';
import { ToggleButton } from 'react-bootstrap';

interface Props {
  tag: string;
  i: number;
  setVal: (val: string[]) => void;
  value: string[];
}

const Tags = ({ tag, i, setVal, value }: Props) => {
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
      className={`${tag === 'Playful' ? 'mr-30 m-2 ' : 'm-2'}`}
      id={`tag-${i}`}
      type='checkbox'
      variant='outline-primary'
      checked={checked}
      value={tag}
      onChange={(e) => {
        handleChange();
      }}
    >
      {tag}
    </ToggleButton>
  );
};

export default Tags;
