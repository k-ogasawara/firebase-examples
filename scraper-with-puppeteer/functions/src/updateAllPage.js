const { getFunctions } = require('firebase-admin/functions');
const { getPageCount } = require('./getPageCount');

const updateAllPage = async (url) => {
  const pageCount = await getPageCount(url);
  if (!pageCount) return;
  const queue = getFunctions().taskQueue('updateItemsByPage');
  const enqueues = [...Array(pageCount)].map((_, i) => {
    const data = { url };
    const options = { scheduleDelaySeconds: 60 * i };
    return queue.enqueue(data, options);
  });
  await Promise.all(enqueues);
};

exports.updateAllPage = updateAllPage;