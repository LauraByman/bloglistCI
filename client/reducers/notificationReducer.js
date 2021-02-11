let timeoutID = ''

const reducer = (state = '', action) => {
  switch(action.type){
    case 'SET_NOTIFICATION':
      return action.notification
    default: return state
  }
}

export const addNotification = (notification, time, error) => {

  clearTimeout(timeoutID)

  let newNotification = {
      content: notification,
      error: error
  } 

  return async dispatch => {
    await dispatch ({
      type:'SET_NOTIFICATION',
      newNotification
    })
    
    newNotification = {
        content: '',
        error: false
    } 

    timeoutID = setTimeout(() => {
      dispatch({
        type:'SET_NOTIFICATION',
      newNotification
      }
      )
    }, Number(time))    
}
}

export default reducer