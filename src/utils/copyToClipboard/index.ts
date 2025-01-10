const copyToClipboard = (value: string) => {
  navigator.clipboard.writeText(value);
};

export default copyToClipboard;
