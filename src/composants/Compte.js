import {useDispatch, useSelector} from "react-redux";


function Compte() {
//const vueData = useSelector((state)=>console.log("Useselec = "+state.login[0].name))
    const dispatch = useDispatch()

    dispatch({
        type: "login/SetUsers",
        payload: "clement"
    })
    const name = useSelector((state) => state.login[0].name)
    console.log("nom de l'user = " + name)
}


export default Compte;