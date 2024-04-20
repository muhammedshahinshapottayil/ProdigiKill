const getID = (id: string): bigint => {
  return BigInt(id.slice(2));
};

export { getID };
