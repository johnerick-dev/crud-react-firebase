import React, { useState, useEffect } from 'react';
import firebaseDb from '../../database/firebase.js';
import { Link } from 'react-router-dom';
import './styles.css';


const Home = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    firebaseDb.child("contacts").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({
          ...snapshot.val(),
        });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, []);

  const onDelete = (id) => {
    if (window.confirm("Tem certeza de que deseja excluir?")) {
      firebaseDb.child(`contacts/${id}`).remove((err) => {
        if (err) {
          console.log(err);
        } else {
          alert("Usuário excluído com sucesso!");
        }
      });
    }
  };
  return (
    <div className="home">
      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>E-mail</th>
            <th>telefone</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(data).map((id, index) => {
            return (
              <tr key={id}>
                <th scope="row">{id}</th>
                <td>{data[id].name}</td>
                <td>{data[id].email}</td>
                <td>{data[id].contact}</td>
                <td>
                  <Link to={`/update/${id}`}>
                    <button className="btn btn-edit">Editar</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => onDelete(id)}
                  >
                    Excluir
                  </button>
                  <Link to={`/view/${id}`}>
                    <button className="btn btn-view">Visualizar</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;