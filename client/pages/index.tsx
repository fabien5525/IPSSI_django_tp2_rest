import type { NextPage } from 'next'
import { useRouter } from 'next/router';
import { useEffect } from 'react'

const Home: NextPage = () => {
  const router = useRouter();

  //redirect to /login if not logged in
  useEffect(() => {
    if (localStorage) {
      if (!localStorage.getItem('token')) {
        router.push('/login')
        return;
      }
      router.push('/dashboard');
    }
  });

  return (
    <div>
      <h1>Accueil</h1>
    </div>
  )
}

export default Home
