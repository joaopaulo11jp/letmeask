import { useContext } from 'react';
import { Button } from '../components/Button';
import { Link } from 'react-router-dom';

import ilustrationImg from '../assets/images/illustration.svg'; //webpack importa isso
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';

import { AuthContext } from '../contexts/AuthContext';

export function NewRoom() {
    const { user, singInWithGoogle } = useContext(AuthContext);

    return (
        <div id="page-auth">
            <aside>
                <img src={ilustrationImg} alt="Ilustração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao-vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo-real</p>
            </aside>
            <main>
                <h1>{user?.name}</h1>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask"/>
                    <h2>Crie uma nova sala</h2>

                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                    </form>

                    <Button>Criar sala</Button>
                    <p>
                        Quer entrar em uma sala existente? Clique <Link to="/">aqui</Link>.
                    </p>
                </div>
            </main>
        </div>
    );
}