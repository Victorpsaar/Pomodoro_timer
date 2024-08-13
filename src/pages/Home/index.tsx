import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, Separetor } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <input type="text" id="task" />

          <label htmlFor="minutesCont">Durante</label>
          <input type="number" id="minutesCont" />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separetor>:</Separetor>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <button>
          <Play size={24} />
          Começar
        </button>
      </form>
    </HomeContainer>
  )
}
