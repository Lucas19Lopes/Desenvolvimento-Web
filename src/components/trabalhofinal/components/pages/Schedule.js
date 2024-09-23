import React, { useState, useEffect } from 'react';
import { firestore, auth } from '../keys/firebaseConfig';
import { useNavigate, Link } from 'react-router-dom';
import "../css/Schedule.css"

function Schedule() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [barber, setBarber] = useState('');
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  const barbers = ["Joabe", "Rivas", "Lyetson", "Arthur"];

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
      setAppointments(snapshot.docs.map(doc => doc.data()));
    };

    fetchAppointments();

    return () => unsubscribe();
  }, [navigate]);

  const handleSchedule = async () => {
    if (!date || !time || !barber) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const selectedTime = new Date(`${date}T${time}`);

    // Verificar se já existe um agendamento para o barbeiro no mesmo horário ou nos próximos 30 minutos
    const snapshot = await firestore.collection('appointments')
      .where('barber', '==', barber)
      .where('date', '==', date)
      .get();

    let conflict = false;
    let conflictingAppointment = null;

    snapshot.docs.forEach(doc => {
      const appointmentTime = new Date(`${doc.data().date}T${doc.data().time}`);
      const timeDifference = (selectedTime - appointmentTime) / (1000 * 60); // Diferença de tempo em minutos
      if (Math.abs(timeDifference) < 30) {
        conflict = true;
        conflictingAppointment = appointmentTime;
      }
    });

    if (conflict) {
      // Calcular o próximo horário disponível (30 minutos após o último agendamento)
      const nextAvailableTime = new Date(conflictingAppointment.getTime() + 30 * 60000);
      const formattedNextAvailableTime = nextAvailableTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const formattedAppointmentTime = conflictingAppointment.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      alert(`Este barbeiro já tem um agendamento às ${formattedAppointmentTime}. Ele estará disponível novamente após ${formattedNextAvailableTime}.`);
      return;
    }

    // Adicionar agendamento ao banco de dados
    await firestore.collection('appointments').add({
      date,
      time,
      barber,
      user: auth.currentUser.email,
    });

    setDate('');
    setTime('');
    setBarber('');

    alert('Agendamento confirmado!');
    
    // Atualiza a lista de agendamentos após adicionar um novo
    const updatedSnapshot = await firestore.collection('appointments').get();
    setAppointments(updatedSnapshot.docs.map(doc => doc.data()));
  };

  return (
    <div className="container">
      <div className="schedule-box">
        <h2>Agende seu horário</h2>

        <label>Escolha uma data:</label>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
        />

        <label>Escolha um horário:</label>
        <input 
          type="time" 
          value={time} 
          onChange={(e) => setTime(e.target.value)} 
        />

        <label>Escolha um barbeiro:</label>
        <select value={barber} onChange={(e) => setBarber(e.target.value)}>
          <option value="">Selecione um barbeiro</option>
          {barbers.map((barber, index) => (
            <option key={index} value={barber}>{barber}</option>
          ))}
        </select>

        <button onClick={handleSchedule}>Confirmar Agendamento</button>
      </div>
    </div>
  );
}

export default Schedule;





// Schedule.js
// import React, { useState, useEffect } from 'react';
// import { firestore, auth } from '../keys/firebaseConfig';
// import { useNavigate } from 'react-router-dom';
// import "../css/Schedule.css";

// function Schedule() {
//   const [appointments, setAppointments] = useState([]);
//   const [date, setDate] = useState('');
//   const [time, setTime] = useState('');
//   const [barber, setBarber] = useState('');
//   const navigate = useNavigate();

//   // Lista de barbeiros disponíveis (pode ser substituída por uma consulta ao Firestore)
//   const barbers = ["Barbeiro 1", "Barbeiro 2", "Barbeiro 3"];

//   useEffect(() => {
//     const fetchAppointments = async () => {
//       const snapshot = await firestore.collection('appointments').get();
//       setAppointments(snapshot.docs.map(doc => doc.data()));
//     };

//     fetchAppointments();
//   }, []);

//   const handleLogout = async () => {
//     await auth.signOut();
//     navigate('/login');
//   };

//   const handleSchedule = async () => {
//     await firestore.collection('appointments').add({
//       date,
//       time,
//       barber,
//       user: auth.currentUser.email,
//     });
//     setDate('');
//     setTime('');
//     setBarber('');
//   };

//   return (
//     <div>
//       <h2>Agendar Horário</h2>

//       {/* Selecionar a data */}
//       <input 
//         type="date" 
//         value={date} 
//         onChange={(e) => setDate(e.target.value)} 
//         placeholder="Data" 
//       />

//       {/* Selecionar a hora */}
//       <input 
//         type="time" 
//         value={time} 
//         onChange={(e) => setTime(e.target.value)} 
//         placeholder="Hora" 
//       />

//       {/* Selecionar o barbeiro */}
//       <select value={barber} onChange={(e) => setBarber(e.target.value)}>
//         <option value="">Selecione um barbeiro</option>
//         {barbers.map((barber, index) => (
//           <option key={index} value={barber}>{barber}</option>
//         ))}
//       </select>

//       <button onClick={handleSchedule}>Agendar</button>

//       <h3>Horários Agendados:</h3>
//       <ul>
//         {appointments.map((appointment, index) => (
//           <li key={index}>
//             {appointment.date} - {appointment.time} - {appointment.barber} - {appointment.user}
//           </li>
//         ))}
//       </ul>

//       <button onClick={handleLogout}>Logout</button>
//     </div>
//   );
// }

// export default Schedule;
