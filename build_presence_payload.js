const {
  APPLICATION_ID,
  ACTIVITY_TYPE,
  ACTIVITY_NAME,
  DETAILS,
  STATE,
  EMOJI,
  LARGE_TEXT,
  SMALL_TEXT,
  BUTTONS,
} = require('./config.js');

async function buildPresencePayload(client, largeUrl, smallUrl, startTime) {
  let activity;

  if (ACTIVITY_TYPE === 4) {
    //Xây dựng payload cho Custom Status (type 4)
    activity = {
      name: 'Buon ia vcl',
      type: 4,
      state: STATE,
      emoji: {
        name: EMOJI,
      },
    };
  } else {
    // Xây dựng payload cho Rich Presence (các type khác)
    let large = null;
    let small = null;

    try {
      const res = await client.api.applications[APPLICATION_ID]['external-assets'].post({
        data: { urls: [largeUrl, smallUrl].filter(Boolean) },
      });
      large = res[0]?.external_asset_path ? `mp:${res[0].external_asset_path}` : null;
      small = res[1]?.external_asset_path ? `mp:${res[1].external_asset_path}` : null;
    } catch (e) {
      console.warn(`[Lỗi Tải Ảnh]: Không thể tải ảnh lên Discord. Bỏ qua hình ảnh cho lần cập nhật này. Lỗi: ${e.message}`);
    }

    activity = {
      name: ACTIVITY_NAME,
      type: ACTIVITY_TYPE,
      application_id: APPLICATION_ID,
      details: DETAILS,
      state: STATE,
      timestamps: { start: startTime },
      assets: {
        ...(large ? { large_image: large, large_text: LARGE_TEXT } : {}),
        ...(small ? { small_image: small, small_text: SMALL_TEXT } : {}),
      },
    };

    if (BUTTONS.length) {
      activity.buttons = BUTTONS.map(b => b.name).slice(0, 2);
      activity.metadata = { button_urls: BUTTONS.map(b => b.url).slice(0, 2) };
    }
  }

  return {
    op: 3,
    d: {
      since: startTime,
      activities: [activity],
      status: 'dnd',
      afk: false,
    },
  };
}

module.exports = buildPresencePayload;

