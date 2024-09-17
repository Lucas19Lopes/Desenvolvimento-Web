import { collection, query, getDocs, addDoc, doc, getDoc, setDoc, deleteDoc } from "firebase/firestore"

class AlunoFirebaseService {

    static listar(db, callback) {
        const c = collection(db, "alunos")
        //const q = query(c)
        getDocs(c)
        .then(
            (querySnapshot) => {
                const alunos = []
                querySnapshot.forEach(
                    (docSnap) => {  // Alterado de 'professor' para 'docSnap'
                        alunos.push(
                            {
                                id: docSnap.id,  // Alterado de 'aluno.id' para 'docSnap.id'
                                ...docSnap.data()  // Alterado de 'aluno.data()' para 'docSnap.data()'
                            }
                        )
                    }
                )
                callback(alunos)
            }
        )
        .catch(error => console.log(error))
    }

    static criar(db, callback, aluno) {
        const c = collection(db, "alunos")
        addDoc(c, aluno)
        .then(
            (docRef) => {  // Alterado de 'aluno' para 'docRef'
                callback({ id: docRef.id })
            }
        )
        .catch(error => console.log(error))
    }

    static getById(db, callback, id) {
        const docRef = doc(db, "alunos", id)
        getDoc(docRef)
        .then(
            (docSnap) => {
                callback(docSnap.data())
            }
        )
        .catch(error => console.log(error))
    }

    static atualizar(db, callback, id, alunoAtualizado) {
        const docRef = doc(db, "alunos", id)
        setDoc(docRef, alunoAtualizado)
        .then(
            () => {
                callback({ id })
            }
        )
        .catch(error => console.log(error))
    }

    static apagar(db, callback, id) {
        const docRef = doc(db, "alunos", id)
        deleteDoc(docRef)
        .then(
            () => {
                callback({ id })
            }
        )
        .catch(error => console.log(error))
    }
}

export default AlunoFirebaseService;
