// Keeps page body wrapped in one shared auth shell.
const AuthWrapper = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

export default AuthWrapper;
