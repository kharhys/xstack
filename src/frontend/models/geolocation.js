import utils from 'redux-model-utils'

const initialState = {
  location: {}
}

const selectors = {
  location: state => state.location
}

const actionMap = {
  _setLocation: {
    private: true,
    params: 'location',
    reducer: (state, action) => Object.assign(state, action.location)
  },
  getLocation: {
    async() {
      let err = () => {
        privateActions._setLocation({})
        model.actions.stopWaiting()
      }
      let success = position => {
        privateActions._setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
        model.actions.stopWaiting()
      }

      model.actions.wait()
      console.log('on it')
      if(navigator && "geoLocation" in navigator)
        navigator.geoLocation.getCurrentPosition(success, error, { maximunAge: 60000 })
      else
        err()
    }
  }
}

const model = utils.modelBuilder({
  name: 'geolocator',
  selectors,
  actionMap,
  initialState,
  options: {
    waitable: true
  }
})

const privateActions = model.severPrivateActions()

export default model
