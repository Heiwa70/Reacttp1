import {useDispatch, useSelector} from "react-redux";


function Compte() {
//const vueData = useSelector((state)=>console.log("Useselec = "+state.login[0].name))
    const dispatch = useDispatch()

    dispatch({
        type: "login/SetUsers",
        payload: "clement"
    })
   // const name = useSelector((state) => state.login)
    //console.log(name[0].nom)
}


export default Compte;