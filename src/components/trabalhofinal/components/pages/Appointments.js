import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../keys/firebaseConfig'; // Certifique-se de importar o auth
import { useNavigate } from 'react-router-dom';
import '../css/Appoirments.css'; // Certifique-se de criar este arquivo CSS corretamente

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    date: '',
    time: '',
    barber: ''
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se o usuário está logado
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login'); // Redirecionar para a página de login se não estiver logado
      }
    });

    // Função para obter agendamentos
    const fetchAppointments = async () => {
      const snapshot = await firestore.collection('appointments').get();
      setAppointments(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchAppointments();

    return () => unsubscribe();
  }, [navigate]);

  const handleDelete = async (id) => {
    // Deletar o agendamento no Firestore
    await firestore.collection('appointments').doc(id).delete();
    
    // Atualizar a lista de agendamentos localmente
    setAppointments(appointments.filter(appointment => appointment.id !== id));
  };

  const handleEdit = (appointment) => {
    // Ativar o modo de edição e preencher os dados existentes do agendamento
    setEditingId(appointment.id);
    setEditData({
      date: appointment.date,
      time: appointment.time,
      barber: appointment.barber
    });
  };

  const handleUpdate = async () => {
    // Atualizar o agendamento no Firestore
    await firestore.collection('appointments').doc(editingId).update({
      date: editData.date,
      time: editData.time,
      barber: editData.barber
    });
    
    // Atualizar a lista de agendamentos localmente
    setAppointments(appointments.map(appointment => 
      appointment.id === editingId ? { ...appointment, ...editData } : appointment
    ));

    // Limpar o modo de edição
    setEditingId(null);
    setEditData({
      date: '',
      time: '',
      barber: ''
    });
  };

  const handleLogout = async () => {
    await auth.signOut();
    // Redirecionar ou atualizar a interface após o logout
    window.location.reload();
  };

  return (
    <div className="container">
      <h2>Horários Agendados</h2>
      <button className="logout-btn" onClick={handleLogout}>Logout</button>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>
            {editingId === appointment.id ? (
              <>
                <input 
                  type="date" 
                  value={editData.date} 
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                />
                <input 
                  type="time" 
                  value={editData.time} 
                  onChange={(e) => setEditData({ ...editData, time: e.target.value })}
                />
                <input 
                  type="text" 
                  value={editData.barber} 
                  onChange={(e) => setEditData({ ...editData, barber: e.target.value })}
                />
                <button className="update-btn" onClick={handleUpdate}>Atualizar</button>
              </>
            ) : (
              <>
                {appointment.date} - {appointment.time} - {appointment.barber} - {appointment.user}
                {appointment.user === auth.currentUser.email && (
                  <>
                    <button className="edit-btn" onClick={() => handleEdit(appointment)}>Editar</button>
                    <button className="delete-btn" onClick={() => handleDelete(appointment.id)}>Excluir</button>
                  </>
                )}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Appointments;
