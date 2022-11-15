import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

interface IHomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: IHomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event: FormEvent){
    event.preventDefault();

    try {
      const response = await api.post('/pools', {title:poolTitle})

      const {code} = response.data;
      await navigator.clipboard.writeText(code);

      alert('Bolão criado com sucesso, o código foi copoado para a área de transferencia! ;)')

      setPoolTitle('')
    } catch (err) {
      console.error(err);
      alert('Falha ao criar o bolão :/  \n\n tente novamente! :D')
    }
  }

  return (
    <div>
      <h1>Hello World :D</h1>
      
      <p>Count: {props.poolCount}</p>
      </div>
  )
}

export const getServerSideProps = async () => {
  const response = await fetch('http://localhost:3333/pools/count')
  const data = await response.json()

  return {
    props: {
      count: data.count
    },
  }
}
