import React from 'react';

export default ({ value, onChange}) => (
  <div className="form-group">
    <label>Stroke width</label>
    <input
      name="width"
      type="number"
      min="1"
      step="1"
      max="20"
      value={value}
      onChange={onChange}
    />
  </div>
);