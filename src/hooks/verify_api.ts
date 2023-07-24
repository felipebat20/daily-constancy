export const hasApi = () => !! parseInt(sessionStorage.getItem('AVAILABLE_API') || '');
