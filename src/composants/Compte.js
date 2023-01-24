import {useDispatch, useSelector} from "react-redux";


function Compte() {
const vueData = useSelector((state)=>console.log(state.login[0]))
const dispatch = useDispatch()

    dispatch({
        type:"login/changeUsers",
        payload:"clement"
    })

}


export default Compte;