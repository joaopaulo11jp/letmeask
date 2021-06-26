import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';

import { Button } from '../components/Button';
import { firebase, auth, database } from '../services/Firebase';

import ilustrationImg from '../assets/images/illustration.svg'; //webpack importa isso
import logoImg from '../assets/images/logo.svg';
import googleImg from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';

export function Home() {
    const history = useHistory();
    const { user, singInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');

    async function navigateToNewRoom() {
        if (!user) {
            await singInWithGoogle();
        }

        history.push('/rooms/new');
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();

        if(roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('Room does not exists.')
            return;
        }

        history.push(`/rooms/${roomCode}`);
    }
    
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
                    <img src={logoImg} alt="letmeask" />
                    <button onClick={navigateToNewRoom} className="create-room">
                        <img src={googleImg} alt="Logo do Google" />
                        Crie sua sala com o Google
                    </button>

                    <div className="separator">ou entre em uma sala</div>

                    <form>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                        />
                    </form>

                    <Button>Entrar na sala</Button>
                </div>
            </main>
        </div>
    );
}