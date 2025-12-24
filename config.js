module.exports = {
  TOKEN: process.env.TOKEN || '',
  VOICE_CHANNEL_ID: '1440693248447217664', // Các ID khác: '1440693248447217664', '1428735965702258790', '1196104553649668136'
  APPLICATION_ID: '1426485738689531936',

  // Loại hoạt động: 0: Chơi, 2: Nghe, 3: Xem, 4: Trạng thái tùy chỉnh, 5: Thi đấu
  ACTIVITY_TYPE: 5, 

  // Cấu hình cho Rich Presence (khi ACTIVITY_TYPE không phải là 4)
  GIF_URL: 'https://i.pinimg.com/originals/0a/d7/35/0ad735f722522d9a424b2a018ff63319.gif',
  SMALL_URL: 'https://i.pinimg.com/736x/30/1d/42/301d428573b2680be34b88b26eed8225.jpg',
  ACTIVITY_NAME: 'Anh sống thế đấy em',
  DETAILS: '君と過ごした日々を、僕は決して後悔しない。🍂',
  LARGE_TEXT: 'Anh sống thế đấy em',
  SMALL_TEXT: 'Cộng Hòa Séc (Sếch)',
  BUTTONS: [
    { name: 'Xem Haiten', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
  ],

  // Cấu hình cho Custom Status (khi ACTIVITY_TYPE là 4)
  STATE: 'Nhạc l gì suy vcl.',
  EMOJI: '🍂', // Emoji cho trạng thái tùy chỉnh
};



