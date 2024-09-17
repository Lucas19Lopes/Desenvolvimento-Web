import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "./components/Home";

import { Criar } from "./components/professor/Criar";
import Editar from "./components/professor/Editar";
import Listar from "./components/professor/Listar";
import { CriarAluno } from "./components/aluno/CriarAluno";
import ListarAluno from "./components/aluno/ListarAluno";
import EditarAluno from "./components/aluno/EditarAluno";

import Firebase from "./utils/Firebase";
import FirebaseContext from "./utils/FirebaseContext";

const router = createBrowserRouter([
    {
        path:"/",
        element: <Home />,
        children: [
            {
                path:"professores/criar",
                element:<Criar />
            },
            {
                path:"professores/listar",
                element:<Listar />
            },
            {
                path:"professores/editar/:id",
                element:<Editar />
            },
            {
                path:"alunos/criar",
                element:<CriarAluno />
            },
            {
                path:"alunos/listar",
                element:<ListarAluno />
            },
            {
                path:"aluno/editar/:id",
                element:<EditarAluno />
        
            }
        
        ]
        }

    ]

)

const Main = () => {
    return (
        <FirebaseContext.Provider value={new Firebase()}>
            <RouterProvider router={router}/>
        </FirebaseContext.Provider >
        
    )
}
export default Main