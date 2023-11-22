import React from 'react';

const Checkbox = ({ label, checked, onChange }) => {
  return (
    <label className="mr-4">
      <input type="checkbox" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
};

export default Checkbox;
