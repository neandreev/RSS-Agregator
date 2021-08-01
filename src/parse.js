const getContent = (item) => (key) => item.querySelector(key).textContent;

export default (str) => {
  const parser = new DOMParser();
  const rssParse = parser.parseFromString(str.contents, 'application/xml');
  if (rssParse.childNodes[0].nodeName !== 'rss') {
    throw new Error('notRSS');
  }
  const channel = rssParse.querySelector('channel');
  return {
    title: getContent(channel)('title'),
    description: getContent(channel)('description'),
    items: [...channel.querySelectorAll('item')].map((item) => ({
      title: getContent(item)('title'),
      description: getContent(item)('description'),
      link: getContent(item)('link'),
      isRead: false,
    })),
  };
};
