const axios = require('axios');

const TOKEN = 'EAANJvkta3DMBRFDgbvkL3AK7sP5x9CMmCrhecZBk91L1GZA644UYpbI7ntCMXMjjVAT2M1fMaheJYVbnGvnRPngNL4cp5ZBLNPB4qDlIZBo22C5TPZAKFOctN1eHU2xUpZAhc0ZCYZA4GOqcFlED8CMl6UveoSBD8Hqs8oYuCZAk5X37DRrmJyUeGQ2o3Gf7UZBYOi6bMIiFKaTJiozIqz';
const IG_ID = '17841446309813754';
const FB_GRAPH_URL = 'https://graph.facebook.com/v21.0';

async function test() {
  try {
    console.log('--- Probando /info ---');
    const info = await axios.get(`${FB_GRAPH_URL}/${IG_ID}`, {
      params: { access_token: TOKEN, fields: 'username,name' }
    });
    console.log('Info:', info.data);

    console.log('\n--- Probando /conversations ---');
    const convs = await axios.get(`${FB_GRAPH_URL}/${IG_ID}/conversations`, {
      params: { 
        access_token: TOKEN, 
        platform: 'instagram',
        fields: 'id,updated_time'
      }
    });
    console.log('Conversations:', convs.data);
  } catch (error) {
    console.error('Error detallado:', error.response?.data || error.message);
  }
}

test();
