const { joinVoiceChannel } = require('@discordjs/voice');
const { VOICE_CHANNEL_ID, GIF_URL, SMALL_URL } = require('./config.js');
const getShard = require('./get_shard.js');
const buildPresencePayload = require('./build_presence_payload.js');

const startTime = Date.now();
let isInitialized = false;

function setupClient(client) {
  client.on('ready', async () => {
    if (isInitialized) {
      console.log(`${client.user.username} đã kết nối lại.`);
      return;
    }
    isInitialized = true;

    console.log(`${client.user.username} đã đăng nhập`);

    if (VOICE_CHANNEL_ID) {
      try {
        const channel = await client.channels.fetch(VOICE_CHANNEL_ID);
        if (!channel || channel.type !== 'GUILD_VOICE') {
          console.error('ID kênh thoại không hợp lệ');
        } else {
          const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: true,
            selfMute: true,
          });
          
          connection.on('error', (error) => {
            console.warn(`[Lỗi Voice Connection]: ${error.message}`);
          });

          console.log(`Đã tham gia kênh thoại: ${channel.name}`);
        }
      } catch (e) {
        console.warn('Lỗi khi fetch kênh thoại:', e.message);
      }
    }

    const updatePresence = async () => {
      try {
        const shard = client.ws.shards.first();
        // Kiểm tra xem shard có sẵn sàng không. Status 0 = READY.
        if (!shard || shard.status !== 0) {
          console.warn('Shard không sẵn sàng, bỏ qua cập nhật trạng thái lần này.');
          return;
        }
        
        const payload = await buildPresencePayload(client, GIF_URL, SMALL_URL, startTime);
        shard.connection.send(JSON.stringify(payload));
      } catch (e) {
        console.warn('Lỗi khi gửi payload trạng thái:', e.message);
      }
    };

    await updatePresence();
    console.log('Cập nhật trạng thái thành công');
    
    setInterval(updatePresence, 60_000);
  });

  client.on('error', console.error);
}

module.exports = setupClient;
