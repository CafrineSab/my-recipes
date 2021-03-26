export default function(userInfo = null, action){
  console.log('action.userInfo', action.userInfo);

  if (action.type === 'saveUserInfo') {
    return (action.userInfo);
  }
  else if (action === 'deleteUserInfo') {
    return ({});
  }
  else {
    return (userInfo);
  }
};
  
