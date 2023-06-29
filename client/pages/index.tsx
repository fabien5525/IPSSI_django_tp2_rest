import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (localStorage) {
      if (!localStorage.getItem('token')) {
        router.push('/connexion')
        return;
      }
      router.push('/projet');
    }
  });

  return (
    <div>
      <h1>Accueil</h1>
    </div>
  )
}

export default Home
