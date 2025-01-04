export const formatMongoDate = (mongoDate) => {
  const date = new Date(mongoDate);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};
