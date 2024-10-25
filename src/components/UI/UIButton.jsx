function UIButton({ background, disabled = false, onClick, children }) {
  return (
    <button
      type="button"
      className={`${background} w-full ${disabled ? 'pulse' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default UIButton;
