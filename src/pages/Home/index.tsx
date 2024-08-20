import { Play } from "phosphor-react";
import { CountdownContainer, FormContainer, HomeContainer, MinutesInput, Separetor, StartButton, TaskInput } from "./styles";

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" list="task-suggestions" id="task" placeholder="Dê um nome para o projeto" />

          <datalist id="task-suggestions">
            <option value="Projeto 1"></option>
            <option value="Projeto 2"></option>
            <option value="Projeto 3"></option>
            <option value="React"></option>
          </datalist>

          <label htmlFor="minutesCont">Durante</label>
          <MinutesInput type="number" id="minutesCont" placeholder="00" step={5} min={5} max={60} />

          <span>minutos.</span>
        </FormContainer>

        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separetor>:</Separetor>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartButton>
          <Play size={24} />
          Começar
        </StartButton>
      </form>
    </HomeContainer>
  )
}
