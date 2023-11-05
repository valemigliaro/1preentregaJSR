import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer"
import { NavBar } from "./components/NavBar/NavBar"


export const App = () => {
  return (
    <>
      <NavBar />
      <ItemListContainer greeting={"Bienvenidos a mi sitio"} />
    </>
  )
}

