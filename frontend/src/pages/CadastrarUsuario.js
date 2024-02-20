import FormUsers from "../components/FormUsers.js";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import styles from './../styles/CadastrarUsuario.module.css'

export default function CadastrarUsuario() {

    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
  
    const getUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/users");
        setUsers(res.data.sort((a,b) => (a.nome > b.nome ? 1 : -1)));
      } catch (error) {
        toast.error(error);
      }
    };
  
    useEffect(() => {
      getUsers();
    }, [setUsers]);

    return (
        <div className={styles.body}>
            <FormUsers onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
        </div>
    )
}