const convertImage = (imageName, size) => {
  const splitArray = imageName.split('.');
  const name = splitArray[0].concat(`_${size}`);
  const finalName = name.concat(`.${splitArray[1]}`);
  return finalName;
};

export default convertImage;
