type TButtonSize = 'md' | 'lg';

export type TButtonPrimaryProps = {
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  size?: TButtonSize;
};
