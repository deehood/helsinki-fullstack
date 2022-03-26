const Notification = ({ message, isError }) =>
  isError ? (
    <div className="message errorMessage">{message}</div>
  ) : (
    <div className="message normalMessage">{message}</div>
  );

export default Notification;
