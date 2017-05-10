const initialState = {
  userId: null,
  isLoading: false,
  isEdited: false,
  focused: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case 'VIEW_PROFILE':
      return Object.assign({}, state, {
        userId: action.payload.userId
      })
    case 'EDIT_PROFILE_FIELD':
      return Object.assign({}, state, {
        focused: action.payload.field
      })
    case 'EDIT_PROFILE':
      return Object.assign({}, state, {
        isLoading: true,
        isEdited: false
      })
    case 'FETCH_PROFILE':
      return Object.assign({}, state, {
        isLoading: true
      })
    case 'FETCH_PROFILE_SUCCESS':
      return Object.assign({}, state, {
        ...action.payload.profile,
        userId: action.payload.profile.id,
        isLoading: false,
        isEdited: false
      })
    case 'EDIT_PROFILE_SUCCESS':
      const newUsername = !(action.payload.user.username === state.username)
      return Object.assign({}, state, {
        ...state,
        ...action.payload.user,
        isLoading: false,
        isEdited: true,
        newUsername,
        focused: null
      })
    case 'REFRESH_PROFILE_EDITING':
      return Object.assign({}, state, {
        isLoading: false,
        isEdited: false,
        newUsername: false
      })
    default:
      return state
  }
}