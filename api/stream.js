const ytdl = require('ytdl-core');

module.exports = async (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).json({ error: 'URL is required' });
  }

  try {
    const info = await ytdl.getInfo(url);
    const streamUrl = ytdl(url, { filter: 'audioonly' });

    res.status(200).json({ streamUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get stream URL', details: error.message });
  }
};
