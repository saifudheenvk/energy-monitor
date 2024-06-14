let defaultLang = 'en'

const languageReducer = (state = defaultLang, action) => {
    switch (action.type) {
      case 'SET_LANGUAGE':
          console.log("called", action.language)
        return action.language
      default:
        return state
    }
  }
  export default languageReducer