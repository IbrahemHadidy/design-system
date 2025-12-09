const RTL_LANGS = ['ar', 'he', 'fa', 'ur', 'ps', 'sd', 'ug', 'dv'];

export function getDirection(locale: string): 'ltr' | 'rtl' {
  const lang = locale.split('-')[0];
  return RTL_LANGS.includes(lang) ? 'rtl' : 'ltr';
}
