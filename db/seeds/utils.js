const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};


exports.createReference = (data, existingKey, newKey) => {
  const ref = {};
  data.forEach((dataInput) => {
    const existingValue = dataInput[existingKey];
    ref[existingValue] = dataInput[newKey];
  })
  
  return ref;
};

