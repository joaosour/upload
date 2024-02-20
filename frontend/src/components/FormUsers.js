import styles from './FormUsers.module.css';
import axios from "axios";
import React, { useEffect, useRef } from "react";
import { toast } from "react-toastify";

const FormUsers = ({ getUsers, onEdit, setOnEdit }) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
            const user = ref.current;

            user.nome.value = onEdit.nome;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if(
        !user.nome.value
    ) {
        return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
        await axios
          .put("http://localhost:8000/users/" + onEdit.id, {
            nome: user.nome.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 409) {
              toast.error(error.response.data);
            } else {
              console.error(error);
            }
          });
      } else {
        await axios
          .post("http://localhost:8000/users/", {
            nome: user.nome.value,
          })
          .then(({ data }) => toast.success(data))
          .catch((error) => {
            if (error.response.status === 409) {
              toast.error(error.response.data);
            } else {
              console.error(error);
            }
          });
      }
      

    user.nome.value = "";
    
    setOnEdit(null);
    getUsers();
    };

    return (
        <form className={styles.formContainer} ref={ref} onSubmit={handleSubmit}>
            <div className={styles.inputArea} style={{width: '25%'}}>
                <label className={styles.label} htmlFor="nome">Nome</label>
                <input className={styles.input} name="nome" id="nome"/>
            </div>

            <button className={styles.button} type="submit">SALVAR</button>
        </form>
    );
};

export default FormUsers;
