import React, { forwardRef, useEffect } from 'react';
import './styles.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, ...rest }, ref) => {
  return (
    <div className="input-container">
      <label>{label}</label>
      <input
        className={`input ${error ? 'input-error' : ''}`}
        ref={ref}
        {...rest}
      />
      {error && <span className="error">{error}</span>}
    </div>
  );
});

export default Input;
