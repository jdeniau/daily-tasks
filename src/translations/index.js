import fr from './fr';

const locale = window.navigator.userLanguage || window.navigator.language;

const translations = {
  fr,
};

export default function translate(key) {
  if (!translations[locale]) {
    return key;
  }

  return translations[locale][key] || key;

}
