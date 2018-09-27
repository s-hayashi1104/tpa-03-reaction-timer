const getRandomInt = function(min, max) {
  const range = Math.floor(max) - Math.ceil(min);
  return Math.floor(Math.random() * range) + min;
};

export {
  getRandomInt,
};
