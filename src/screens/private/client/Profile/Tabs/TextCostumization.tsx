import React from 'react';

type Props = React.HTMLAttributes<HTMLSpanElement> & {
  children: React.ReactNode;
};

const TextCostumization: React.FC<Props> = ({ style, children, ...props }) => (
  <span
    style={{
      fontFamily: 'Inter, Arial, sans-serif',
      fontWeight: 400,
      ...style,
    }}
    {...props}>
    {children}
  </span>
);

export default TextCostumization;
