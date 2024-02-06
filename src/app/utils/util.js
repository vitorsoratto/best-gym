
export const getStringToken = () => {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
    
  return userToken?.replace(/['"]+/g, '');
}

export const expiredToken = () => {
  sessionStorage.removeItem('token');
  window.location.reload();
}