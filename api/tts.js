const { execSync } = require('child_process');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
  try {
    const { text } = req.body;
    const filename = `audio_${uuidv4()}.mp3`;
    
    // gTTS CLI کمانڈ
    execSync(`gtts-cli '${text}' --lang ur --output ${filename}`);
    
    // آواز فائل بھیجیں
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.sendFile(filename, { root: __dirname }, () => {
      execSync(`rm ${filename}`); // فائل ڈیلیٹ کریں
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
