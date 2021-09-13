import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import * as UserActionCreators from "../store/actions/user"

export const useAction = () => {
    const dispatch = useDispatch()
    return bindActionCreators(UserActionCreators, dispatch);
}
