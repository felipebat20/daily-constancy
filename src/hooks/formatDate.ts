export default (date: Date, format?: string): string => {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  const formats: FormatInterface = {
    'dd/mm/yyyy HH:MM': () => `${day}/${month}/${year} ${hour}:${minutes}`,
  };

  if (format && formats[format]) {
    return formats[format]();
  }

  return `${day}/${month}/${year} ${hour}:${minutes}`;
};

interface FormatInterface {
  [key: string]: () => string
}
