const axios = require('axios');

const TOKEN = 'EAANJvkta3DMBRFDgbvkL3AK7sP5x9CMmCrhecZBk91L1GZA644UYpbI7ntCMXMjjVAT2M1fMaheJYVbnGvnRPngNL4cp5ZBLNPB4qDlIZBo22C5TPZAKFOctN1eHU2xUpZAhc0ZCYZA4GOqcFlED8CMl6UveoSBD8Hqs8oYuCZAk5X37DRrmJyUeGQ2o3Gf7UZBYOi6bMIiFKaTJiozIqz';
const IG_ID = '17841446309813754';
const FB_GRAPH_URL = 'https://graph.facebook.com/v21.0';

async function test() {
  try {
    console.log('--- Probando /media ---');
    const media = await axios.get(`${FB_GRAPH_URL}/${IG_ID}/media`, {
      params: { access_token: TOKEN, fields: 'id,caption' }
    });
    console.log('Media count:', media.data?.data?.length);

    if (media.data?.data?.length > 0) {
      const firstMediaId = media.data.data[0].id;
      console.log(`\n--- Probando /comments en media ${firstMediaId} ---`);
      const comments = await axios.get(`${FB_GRAPH_URL}/${firstMediaId}/comments`, {
        params: { access_token: TOKEN, fields: 'id,text,username,timestamp' }
      });
      console.log('Comments:', comments.data);
    }
  } catch (error) {
    console.error('Error detallado:', error.response?.data || error.message);
  }
}

test();
