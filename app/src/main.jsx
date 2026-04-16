import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Home } from './components/Home/Home'
import { PageNotFound } from './components/Home/PageNotFound'
import TableUsuarios from './components/Usuarios/TableUsuarios'
import DetailUsuarios from './components/Usuarios/DetailUsuarios'
import { ListObjeto } from './components/Objetos/ListObjetos'
import DetailObjeto from './components/Objetos/DetailObjeto'
import ListSubasta from './components/Subasta/ListSubasta'
import DetailSubasta from './components/Subasta/DetailSubasta'
import TableSubasta from './components/Subasta/TableSubasta'
import TablePujas from './components/Subasta/TablePujas'
import { UpdateUsuarios } from './components/Usuarios/UpdateUsuarios'
import { CreateObjeto } from './components/Objetos/CreateObjeto'
import { UpdateObjeto } from './components/Objetos/UpdateObjeto'
import { CreateSubasta } from './components/Subasta/CreateSubasta'
import { UpdateSubasta } from './components/Subasta/UpdateSubasta'
import TestRealtime from "./components/TestRealTime.jsx";

document.documentElement.classList.add("dark");
const rutas = createBrowserRouter([
  {
    
    element: <Layout/>,
    children: [
      // Ruta principal
      { index: true, element: <Home /> },

      // Ruta comodín (404)
      { path: "*", element: <PageNotFound /> },
       //Rutas componentes 

        {path: "usuarios/table", element:<TableUsuarios/>},
        {path: "usuarios/detail/:id", element:<DetailUsuarios/>},
        {path: "usuarios/edit/:id", element: <UpdateUsuarios />},
        {path: "objeto/lista/:idUsuario", element:<ListObjeto/>},
        {path: "objetos/detail/:id", element:<DetailObjeto/>},
        {path: "objetos/edit/:id",element: <UpdateObjeto/>},
        {path:"objeto/create/:idUsuario", element: <CreateObjeto/>},
        {path: "subasta/lista/:tipo/", element:<ListSubasta/>},
        {path: "subasta/misubasta/:id", element:<TableSubasta/>},
        {path: "subasta/detail/:id", element:<DetailSubasta/>},
        {path: "subasta/create/:id", element: <CreateSubasta/>},
        {path: "subasta/update/:id",element: <UpdateSubasta/>},
        {path: "puja/table/:id", element:<TablePujas/>},
        {path: "test/realtime", element:<TestRealtime/>}
        
    ]
  }
])
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={rutas} />
  </StrictMode>,
)
