const { getFunctions } = require('firebase-admin/functions');
const { getPageCount } = require('./getPageCount');

const updateAllPage = async (url) => {
  const pageCount = await getPageCount(url);
  if (!pageCount) return;
  const queue = getFunctions().taskQueue('updateByPage');
  const enqueues = [...Array(pageCount)].map((_, i) => {
    const data = { url: `${url}?p=${i + 1}` };
    const options = { scheduleDelaySeconds: 60 * i };
    return queue.enqueue(data, options);
  });
  await Promise.all(enqueues);
};

exports.updateAllPage = updateAllPage;
