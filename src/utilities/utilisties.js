const convertSize = (sizeInBytes) => {
  const units = ["B", "KB", "MB", "GB"];
  let size = Number(sizeInBytes);
  let unitIndex = 0;

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`;
};

const formatDate = (date) => {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  return formattedDate;
};
export { convertSize, formatDate };
