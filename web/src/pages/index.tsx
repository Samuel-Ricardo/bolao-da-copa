import Image from "next/image";
import { FormEvent, useState } from "react";
import { avatars_example, logo } from "../assets";
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
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logo} alt="NLW Copa Logo"/>
        
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight"> 
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

      </main>
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
