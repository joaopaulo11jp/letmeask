import { Button } from '../components/Button';
import { Link, useHistory } from 'react-router-dom';

import ilustrationImg from '../assets/images/illustration.svg'; //webpack importa isso
import logoImg from '../assets/images/logo.svg';
import '../styles/auth.scss';

import { useAuth } from '../hooks/useAuth';
import { FormEvent } from 'react';
import { useState } from 'react';
import { database } from '../services/Firebase';

export function NewRoom() {
    const { user } = useAuth();
    const history = useHistory();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomsRef = database.ref('rooms');

        const roomReference = await roomsRef.push({
            title: newRoom,
            authorId: user?.id
        }).get();

        history.push(`/rooms/${roomReference.key}`)
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
                    <img src={logoImg} alt="letmeask"/>
                    <h2>Crie uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button>Criar sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? Clique <Link to="/">aqui</Link>.
                    </p>
                </div>
            </main>
        </div>
    );
}