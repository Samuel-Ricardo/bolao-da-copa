import Image from "next/image";
import { FormEvent, useState } from "react";
import { app_preview, avatars_example, check_icosn as check_icon, logo } from "../assets";
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

        <div className="mt-10 flex items-center gap-2">
          <Image src={avatars_example} alt="avatar example" />

          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+ de {props.userCount - 1}</span> Pessoas já estão usando! :D
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            required
            placeholder="Qual o nome do seu bolão?"
            value={poolTitle}
            onChange={event => setPoolTitle(event.target.value)}
          />

          <button 
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            type="submit"
          >
            Criar meu bolão :D
          </button>
        </form>

        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={check_icon} alt="check icon"/>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+ de {props.poolCount -1}</span>
              <span>Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600"/>
            
          <div className="flex items-center gap-6">
            <Image src={check_icon} alt="" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+ de {props.guessCount - 1}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={app_preview}
        alt="Dois celulares exibindo uma prévia da aplicação do NLW Copa"
        quality={100}
      />
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
