import React from 'react';
import { CirclePicker } from 'react-color';

import WidthInput from './widthinput';

export default ({ color, width, onColorChange, onWidthChange }) => (
  <div className="row flex-center">
    <CirclePicker
      className="col col-12"
      name="color"
      value={color}
      onChange={onColorChange}
    />
    <br />
    <WidthInput
      value={width}
      onChange={onWidthChange}
    />
  </div>
);