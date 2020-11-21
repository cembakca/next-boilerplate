export const GTMPushEvent = (data) => {
  // eslint-disable-next-line
  dataLayer.push(data);
  // eslint-disable-next-line no-undef
  // console.log(dataLayer);
};

export default { GTMPushEvent };
