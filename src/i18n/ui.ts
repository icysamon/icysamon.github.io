export const showDefaultLang = false;

export const languages = {
  ja: '日本語',
  en: 'English',
};

export const defaultLang = 'ja';

export const ui = {
  ja: {
    'nav.home': 'ホーム',
    'nav.about': 'プロフィール',
    'nav.electronicWork': '電子工作',
    'nav.game': '自作ゲーム',
    'sns.twitter': 'Twitter',
    'nav.blog': 'ブログ',
    'nav.request': 'リクエスト',
    'dictionary.musicdistribution': '音楽配信',
    'dictionary.song': '新曲です↓',
    'profile.name': 'icysamon',
    'profile.description': '𓆝𓂃‪ 𓈒𓏸',

    'release.kawaiiSqueeze.title': 'かわいいぎゅっと！',
    'release.kawaiiSqueeze.subtitle': '2026年10月4日',
    'release.kawaiiSqueeze.url': 'https://linkco.re/CC6eP5GY',

    'link.blog': 'https://blog.icysamon.com',
    'link.tunecore': 'https://www.tunecore.co.jp/artists/icysamon',
    'back': '戻る',
    'dictionary.privacyPolicy': 'プライバシーポリシー',

    // Home
    'home.electronicWork.title': '電子工作',
    'home.electronicWork.description': '電子工作の作品です。温湿度センサー DHT20 やディスプレイチップ TM1637 など部品のドライバーを GitHub で公開しています。',
    'home.game.title': '自作ゲーム',
    'home.game.description': '自作ゲームです。Unity や Godot などを使った作品を公開しています。',
    'home.music.title': '新曲',
    //'home.music.description': '音楽作品です。オリジナル曲やカバー曲を公開しています。',

    // Projects
    'project.tm1637.title': 'TM1637 ライブラリ（C/C++）',
    'project.tm1637.description': 'Raspberry Pi Pico 向け、ディスプレイチップ TM1637 の C/C++ ライブラリです。',

    'project.dht20.title': '温湿度センサー DHT20 ライブラリ（MicroPython）',
    'project.dht20.description': 'Raspberry Pi Pico 向け、温湿度センサー DHT20 の MicroPython ライブラリです。',

    'project.sg90.title': 'サーボモーター SG-90 ライブラリ',
    'project.sg90.description': 'Raspberry Pi Pico 向け、サーボモーター SG-90 の MicroPython & C/C++ ライブラリです。',

    'project.stm32DHT20.title': 'STM32：温湿度センサー DHT20 ライブラリ（MicroPython）',
    'project.stm32DHT20.description': 'STM32 向け、温湿度センサー DHT20 の C/C++ ライブラリです。',

    'project.pixelFontsDesigner.title': 'フォントデザイナー',
    'project.pixelFontsDesigner.description': 'ディスプレイ SSD1306 向けのフォントデザイナーアプリです。',
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.electronicWork': 'Electronic Work',
    'nav.game': 'Game Dev',
    'sns.twitter': 'Twitter',
    'nav.blog': 'Blog',
    'nav.request': 'Request',
    'dictionary.musicdistribution': 'Music Distribution',
    'dictionary.song': 'New Song ↓',
    'profile.name': 'icysamon',
    'profile.description': '𓆝𓂃‪ 𓈒𓏸',
    'release.kawaiiSqueeze.title': 'KAWAII Squeeze!',
    'release.kawaiiSqueeze.subtitle': 'October 4, 2026',
    'release.kawaiiSqueeze.url': 'https://linkco.re/CC6eP5GY?lang=en',
    'link.blog': 'https://blog.icysamon.com/en',
    'link.tunecore': 'https://www.tunecore.co.jp/artists/icysamon?artistPagePath=icysamon&lang=en',
    'back': 'Back',
    'dictionary.privacyPolicy': 'Privacy Policy',

    // Home
    'home.electronicWork.title': 'Electronic Work',
    'home.electronicWork.description': 'This is an electronic work. Drivers for components such as the temperature and humidity sensor DHT20 and the display chip TM1637 are published on GitHub.',
    'home.game.title': 'Game Dev',
    'home.game.description': 'This is a self-made game. Works using Unity, Godot, etc. are published.',
    'home.music.title': 'New Song',
    //'home.music.description': 'This is a music work. Original songs and cover songs are published.',

    // Projects
    'project.tm1637.title': 'TM1637 Library (C/C++)',
    'project.tm1637.description': 'A C/C++ library for the TM1637 display chip on the Raspberry Pi Pico.',

    'project.dht20.title': 'DHT20 Temperature & Humidity Sensor Library (MicroPython)',
    'project.dht20.description': 'A MicroPython library for the DHT20 temperature and humidity sensor on the Raspberry Pi Pico.',

    'project.sg90.title': 'SG-90 Servo Motor Library',
    'project.sg90.description': 'A MicroPython & C/C++ library for the SG-90 servo motor on the Raspberry Pi Pico.',

    'project.stm32DHT20.title': 'STM32: DHT20 Temperature & Humidity Sensor Library (MicroPython)',
    'project.stm32DHT20.description': 'A C/C++ library for the DHT20 temperature and humidity sensor on STM32.',

    'project.pixelFontsDesigner.title': 'Pixel Fonts Designer',
    'project.pixelFontsDesigner.description': 'A font designer app for the SSD1306 display.',
  },
} as const;