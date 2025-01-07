module.exports = {
    i18n: {
      defaultLocale: 'en',
      locales: ['en', 'vi'], // add your supported languages
  },
  defaultNS: "common",
  localePath: "./public/locales",
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
