import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import './styles.css';
import firebaseDb from '../../database/firebase.js';


const AddEdit = () => {
  const initialState = {
    name: "",
    email: "",
    contact: "",
  };
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const { name, email, contact } = state;

  const history = useHistory();

  const { id } = useParams();
  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
         console.log('teste', snapshot.val());
        setData({
          ...snapshot.val(),
        });
        return;
      } 
      setData({});
    });
    return () => {
      setData({});
    };
  }, [id]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
      return;
    }
    setState({ ...initialState });
  }, [id, data]);

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
      alert("Forneça o valor em cada campo de entrada");
    } else {
      if (!id) {
        firebaseDb.child("contacts").push(state, (err) => {
          if (err) {
            alert(err);
          } else {
            alert("Usuários adicionado com sucesso!");
          }
        });
      } else {
        firebaseDb.child(`/contacts/${id}`).set(state, (err) => {
          if (err) {
            alert(err);
          } else {
            alert("Usuário atualizado com sucesso!");
          }
        });
      }
      setTimeout(() => history.push("/"), 500);
    }
  };
  return (
    <div className="add-edit">
      <form
        className="add-edit__form"
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Digite seu nome..."
          value={name || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Digite seu e-mail..."
          value={email || ""}
          onChange={handleInputChange}
        />

        <label htmlFor="contact">Contato:</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Digite seu telefone..."
          value={contact || ""}
          onChange={handleInputChange}
        />

        <input type="submit" value={id ? "Atualizar" : "Salvar"} />
      </form>
    </div>
  );
};

export default AddEdit;