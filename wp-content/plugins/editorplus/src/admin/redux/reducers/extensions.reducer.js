
import { TOGGLE_EXTENSION, LOADED_EXTENSION, LOADING_EXTENSION } from '../actions/types'

const extensions = editor_plus_extension

const initialState = {
    data: {
        ...extensions
    },
    loading: {
        name: '',
    }
};

export default function (state = initialState, action) {

    switch (action.type) {


        case LOADING_EXTENSION:

            return {
                ...state,
                loading: {
                    name: action.payload.name
                }
            }

        case LOADED_EXTENSION:
            return {
                ...state,
                loading: {
                    name: ''
                }
            }

        case TOGGLE_EXTENSION:
            const { name, value } = action.payload;

            return {
                ...state,
                data: {
                    ...state.data,
                    [name]: {
                        ...state.data[name],
                        enabled: value
                    }
                }
            }


        default:
            return state;

    }

}