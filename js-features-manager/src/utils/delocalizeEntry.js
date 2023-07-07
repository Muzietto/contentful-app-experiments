import getKeys from './getKeys';

export default function delocalizeEntry(
  entry,
  locale
) {
  const fields = getKeys(entry.fields).reduce((localizedEntry, key) => {
    localizedEntry[key] = entry.fields[key][locale];
    return localizedEntry;
  }, {});
  return { ...entry, fields };
}
