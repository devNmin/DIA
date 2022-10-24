import { Route, Redirect } from "react-router-dom";


const NonPrivateRoute = ({children, ...rest}) => {
   
    return (
        <Route {...rest}>
            {localStorage.getItem('userInfo') ? <Redirect to= "/main" /> : children}
        </Route>
    )
}
export default NonPrivateRoute