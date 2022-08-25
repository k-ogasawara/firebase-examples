const functions = require('firebase-functions');
const { updateAllPage } = require('./src/updateAllPage');
const { updateByPage } = require('./src/updateByPage');

const timeZone = 'Asia/Tokyo';

process.env.TZ = timeZone;

const targetUrl = 'https://your-target.site'

exports.updateAllPage = functions
  .runWith({ memory: '512MB' })
  .pubsub.schedule('every day 00:00')
  .timeZone(timeZone)
  .onRun(async (context) => {
    await updateAllPage(targetUrl);
  });

exports.updateByPage = functions
  .runWith({ memory: '512MB' })
  .tasks.taskQueue()
  .onDispatch(async (data) => {
    const { url } = data;
    functions.logger.info(`url: ${url}`);
    if (!url) return;
    await updateByPage(url);
  });
