export const formatMongoDate = (mongoDate) => {
    const date = new Date(mongoDate); 
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return date.toLocaleString("en-US", options); 
  };