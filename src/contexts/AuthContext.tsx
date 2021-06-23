import { useState, createContext, useEffect, useDebugValue, ReactNode } from "react";
import { auth, firebase } from '../services/Firebase';

type User = {
    id: string;
    name: string;
    avatar: string;
}
  
type AuthContextType = {
    user: User | undefined;
    singInWithGoogle: () => Promise<void>;
}
  
export const AuthContext = createContext({} as AuthContextType);

type AuthContextProviderProps = {
    children: ReactNode;
}

export function AuthContextProvider(props: AuthContextProviderProps) {
    const [user, setUser] = useState<User>();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        handleUser(user);
      })
  
      return () => unsubscribe();// Uma boa prática para que o useEffect pare de ouvir o evento dps
    }, []);
    /**
     * O useEffect por si só é um eventListener, porém como ele está recebendo um array vazio
     * não vai ter variável para que ele enxergue... Então nesse caso ele só vai rodar uma única vez,
     * quando o componente for montado (igual ao componentDidMount).
     *
     * Dentro dele nós chamamos o "auth.onAuthStateChanged" que é outro eventListener!!!
     */
  
    async function singInWithGoogle () {
      const provider = new firebase.auth.GoogleAuthProvider();
  
      const result = await auth.signInWithPopup(provider);
  
      handleUser(result.user);
    }
  
    function handleUser(user: any) {
      if(user) {
        const { displayName, photoURL, uid } = user;
  
        if (!displayName || !photoURL) {
          throw new Error('Usuário não tem foto ou nome definido no Google');
        }
  
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    }


    return (
        <AuthContext.Provider value={{ user, singInWithGoogle}}>
            {props.children}
        </AuthContext.Provider>
    )
}