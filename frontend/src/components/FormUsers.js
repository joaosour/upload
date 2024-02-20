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
            user.usuario.value = onEdit.usuario;
            user.email.value = onEdit.email;
            user.senha.value = onEdit.senha;
            user.usuario_admin.value = onEdit.usuario_admin;
        }
    }, [onEdit]);

    const handleSubmit = async (e) => {
    e.preventDefault();

    const user = ref.current;

    if(
        !user.nome.value ||
        !user.usuario.value ||
        !user.email.value ||
        !user.senha.value ||
        !user.usuario_admin.value
    ) {
        return toast.warn("Preencha todos os campos!");
    }

    if (onEdit) {
        await axios
          .put("http://localhost:8000/users/" + onEdit.id, {
            nome: user.nome.value,
            usuario: user.usuario.value,
            email: user.email.value,
            senha: user.senha.value,
            usuario_admin: user.usuario_admin.value,
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
            usuario: user.usuario.value,
            email: user.email.value,
            senha: user.senha.value,
            usuario_admin: user.usuario_admin.value,
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
    user.usuario.value = "";
    user.email.value = "";
    user.senha.value = "";
    user.usuario_admin.value = "";
    
    setOnEdit(null);
    getUsers();
    };

    return (
        <form className={styles.formContainer} ref={ref} onSubmit={handleSubmit}>
            <div className={styles.inputArea} style={{width: '25%'}}>
                <label className={styles.label} htmlFor="nome">Nome</label>
                <input className={styles.input} name="nome" id="nome"/>
            </div>
            <div className={styles.inputArea} style={{width: '15%'}}>
                <label className={styles.label} htmlFor="usuario">Usuário</label>
                <input className={styles.input} style={{textTransform: 'uppercase'}} name="usuario" id="usuario" />
            </div>
            <div className={styles.inputArea} style={{width: '25%'}}>
                <label className={styles.label} htmlFor="email">E-mail</label>
                <input className={styles.input} style={{textTransform: 'none'}} name="email" type="email" id="email" />
            </div>
            <div className={styles.inputArea} style={{width: '20%'}}>
                <label className={styles.label} htmlFor="senha">Senha</label>
                <input className={styles.input} style={{textTransform: 'none'}} name="senha" id="senha"/>
            </div>
            <div className={styles.inputArea} style={{width: '15%'}}>
                <label className={styles.label} htmlFor="usuario_admin">Admin</label>
                <input className={styles.input} name="usuario_admin" id="usuario_admin" />
            </div>

            <button className={styles.button} type="submit">SALVAR</button>
        </form>
    );
};

export default FormUsers;
