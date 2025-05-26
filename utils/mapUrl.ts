export const generateGoogleMapUrl = (latitude: number, longitude: number) => {
  return `https://www.google.com/maps?q=${latitude},${longitude}&hl=en&z=15&output=embed`;
};