const isValidImage = (file: File) => {
  const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
  const validFormats = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/jpg",
    "image/svg",
    "image/heic",
    "image/heif",
  ];

  return file.size <= maxSizeInBytes && validFormats.includes(file.type);
};

export default isValidImage;
