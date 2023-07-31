
export const initialState = () => {
  const result = {
    app: {
      configs: {},
      locales: [],
      defaultLocale: 'it-IT',
    },
    features: {
      enabledEditFeature: false,
      search: '',
    },
    circuitPlans: {
      ids: [],
      entities: {},
      loading: false,
      selectedId: '',
    },
  };
  return result;
};

export function reducer(state, { type, payload }) { // debugger;

  if (type === 'SET_ENABLEDEDITFEATURE') {
    return {
      ...state,
      features: {
        ...state.features,
        enabledEditFeature: payload,
      }
    };
  }

  if (type === 'SET_CONFIGS') {
    return {
      ...state,
      app: {
        ...state.app,
        configs: payload,
      }
    };
  }

  if (type === 'SET_LOCALES') {
    return {
      ...state,
      app: {
        ...state.app,
        locales: payload,
      }
    };
  }

  if (type === 'SET_SEARCHSTRING') {
    return {
      ...state,
      features: {
        ...state.features,
        search: payload,
      }
    }
  }

  if (type === 'SELECT_CIRCUITPLAN') {
    return {
      ...state,
      circuitPlans: {
        ...state.circuitPlans,
        selectedId: payload,
      }
    }
  }

  if (type === 'UNSELECT_CIRCUITPLAN') {
    return {
      ...state,
      circuitPlans: {
        ...state.circuitPlans,
        selectedId: '',
      }
    }
  }

  if (type === 'START_LOADING_CIRCUITPLANS') {
    return {
      ...state,
      circuitPlans: {
        ...state.circuitPlans,
        loading: true,
      }
    }
  }

  if (type === 'SET_CIRCUITPLANS') {

    const result = {
      ...state,
      circuitPlans: {
        ids : payload.map(i => i.sys.id),
        entities: payload.reduce((acc, currEntity) => {
          const id = currEntity.sys.id
          if (acc[id]) return acc;
          acc[id] = {
            ...currEntity,
            fields: Object.keys(currEntity.fields)
              .reduce((acc, currFieldName) => {
                if (acc[currFieldName]) return acc;
                acc[currFieldName] = currEntity.fields[currFieldName][state.app.defaultLocale];
                return acc;
              }, {}),
          };
          return acc;
        }, {}),
        loading: false,
        selectedId: '',
      },
    };
    return result;
  }
  return state;
}
