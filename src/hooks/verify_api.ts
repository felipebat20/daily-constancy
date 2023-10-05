import { jwt } from '@/static/storage-keys';

export const getParsedCookies = () => {
  const cookie = document.cookie;
  const parsed_cookies = { [jwt]: false };

  cookie.split(';').forEach((ck) => {
    const [key, value] = ck.split('=');

    return Object.assign(parsed_cookies, { [key.trim()]: value });
  });

  return parsed_cookies;
};

export const hasApi = () => {
  return !! getParsedCookies()[jwt];
};

export const jwtToken = () => {
  return getParsedCookies()[jwt];
};
