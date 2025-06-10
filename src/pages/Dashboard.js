import React, { useState, useEffect } from "react";
import '../assets/css/dashboard.css';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/img/logo.png';
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState("dashboard");

  // Eventos
  const [eventos, setEventos] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1);
  const eventosPorPagina = 2;

  // Equipes
  const [equipes, setEquipes] = useState([]);
  const [formEquipe, setFormEquipe] = useState("");
  const [indexEditandoEquipe, setIndexEditandoEquipe] = useState(null);

  // Inscrições
  const [inscricoes, setInscricoes] = useState([]);
  const [formInscricao, setFormInscricao] = useState({ nome: "", evento: "" });

  // Formulário evento
  const [showEventoForm, setShowEventoForm] = useState(false);
  const [formEvento, setFormEvento] = useState({ nome: "", equipes: "", data: "" });
  const [indexEditando, setIndexEditando] = useState(null);

  // Busca
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState("Select");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  

  const options = [
    "FLORÊNCIO JOSÉ PEREIRA",
    "CORAÇÃO PANTANEIRO",
    "CLUBE DO LAÇO JARDIM",
    "CLUBE DO LAÇO GUIA LOPES",
    "NABILEQUE",
  ];

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );


  // Carrega dados do localStorage ao montar
  useEffect(() => {
    const eventosDados = JSON.parse(localStorage.getItem("eventos") || "[]");
    setEventos(eventosDados);
    const equipesDados = JSON.parse(localStorage.getItem("equipes") || "[]");
    setEquipes(equipesDados);
    const inscricoesDados = JSON.parse(localStorage.getItem("inscricoes") || "[]");
    setInscricoes(inscricoesDados);
  }, []);

  // Salva dados no localStorage sempre que mudarem
  useEffect(() => {
    localStorage.setItem("eventos", JSON.stringify(eventos));
    localStorage.setItem("equipes", JSON.stringify(equipes));
    localStorage.setItem("inscricoes", JSON.stringify(inscricoes));
  }, [eventos, equipes, inscricoes]);

  // Filtro de eventos
  const eventosFiltrados = eventos.filter(ev =>
    ev.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginação dos eventos
  const totalPaginas = Math.ceil(eventosFiltrados.length / eventosPorPagina);
  const inicio = (paginaAtual - 1) * eventosPorPagina;
  const eventosPagina = eventosFiltrados.slice(inicio, inicio + eventosPorPagina);

  // Manipulação de eventos
  const abrirFormularioEdicao = i => {
    setFormEvento(eventos[i]);
    setIndexEditando(i);
    setShowEventoForm(true);
  };

  const abrirFormularioNovo = () => {
    setFormEvento({ nome: "", equipes: "", data: "" });
    setIndexEditando(null);
    setShowEventoForm(true);
  };

  const salvarEvento = e => {
    e.preventDefault();
    const { nome, equipes, data } = formEvento;
    if (!nome || !equipes || !data) {
      alert("Preencha todos os campos.");
      return;
    }

    const novoEvento = { nome, equipes, status: "Ativo", data };

    if (indexEditando !== null) {
      // Editar evento
      const listaAtualizada = [...eventos];
      listaAtualizada[indexEditando] = novoEvento;
      setEventos(listaAtualizada);
    } else {
      // Adicionar evento
      setEventos([...eventos, novoEvento]);
    }

    setShowEventoForm(false);
    setFormEvento({ nome: "", equipes: "", data: "" });
    setIndexEditando(null);
  };

  const removerEvento = i => {
    if (window.confirm("Deseja realmente remover este evento?")) {
      const novaLista = eventos.filter((_, idx) => idx !== i);
      setEventos(novaLista);
      if (paginaAtual > 1 && (novaLista.length / eventosPorPagina) <= (paginaAtual - 1)) {
        setPaginaAtual(paginaAtual - 1);
      }
    }
  };

  // Manipulação de equipes
  const salvarEquipe = e => {
    e.preventDefault();
    if (!formEquipe) return;

    if (indexEditandoEquipe !== null) {
      const equipesAtualizadas = [...equipes];
      equipesAtualizadas[indexEditandoEquipe] = formEquipe;
      setEquipes(equipesAtualizadas);
    } else {
      setEquipes([...equipes, formEquipe]);
    }

    setFormEquipe("");
    setIndexEditandoEquipe(null);
  };

  const removerEquipe = i => {
    setEquipes(equipes.filter((_, idx) => idx !== i));
  };
  const [photo, setPhoto] = useState(null);
const [photoUrl, setPhotoUrl] = useState("");

useEffect(() => {
  const savedPhoto = localStorage.getItem("userPhoto");
  if (savedPhoto) {
    setPhotoUrl(savedPhoto);
  }
}, []);

const handlePhotoChange = (e) => {
  const file = e.target.files[0];
  setPhoto(file);

  if (file) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const dataUrl = event.target.result;
      localStorage.setItem("userPhoto", dataUrl); // salva no localStorage
      setPhotoUrl(dataUrl); // atualiza visualmente
    };
    reader.readAsDataURL(file);
  }
};

  // Manipulação de inscrições
  const salvarInscricao = e => {
    e.preventDefault();
    const { nome, evento } = formInscricao;
    if (!nome || !evento) {
      alert("Preencha todos os campos.");
      return;
    }

    setInscricoes([...inscricoes, { nome, evento }]);
    setFormInscricao({ nome: "", evento: "" });
  };

  // Dropdown handlers
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const selectOption = option => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  // Navegar entre páginas
  const paginaAnterior = () => {
    if (paginaAtual > 1) setPaginaAtual(paginaAtual - 1);
  };
  const paginaProxima = () => {
    if (paginaAtual < totalPaginas) setPaginaAtual(paginaAtual + 1);
  };

  // Resetar formulário
  const cancelarFormulario = () => {
    setShowEventoForm(false);
    setFormEvento({ nome: "", equipes: "", data: "" });
    setIndexEditando(null);
  };

  // Usuário estático para exemplo
  const userName = "Romário";

  const [modalidade, setModalidade] = useState("equipes");
 
  return (
    <div className="dashboard" style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside className="sidebar" style={{ width: "250px", padding: "1rem", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <div>
          <div className="logo" style={{ marginBottom: "2rem" }}>
                      <img src={logo} alt="Logo" style={{ maxWidth: "100%" }} />
          </div>
          <nav>
          <h3 className="menu-title">Menu</h3>
          <ul style={{ listStyle: "none", paddingLeft: 0 }}>
            <li className={activeSection === "dashboard" ? "active" : ""}>
              <a href="#" onClick={e => { e.preventDefault(); setActiveSection("dashboard"); }} style={{ textDecoration: "none" }}>
                <i className="fas fa-th-large"></i> Dashboard
              </a>
            </li>
            <li className={activeSection === "eventos" ? "active" : ""}>
              <a href="#" onClick={e => { e.preventDefault(); setActiveSection("eventos"); }} style={{ textDecoration: "none" }}>
                <i className="fas fa-calendar-alt"></i> Eventos
              </a>
            </li>
            <li className={activeSection === "equipes" ? "active" : ""}>
              <a href="#" onClick={e => { e.preventDefault(); setActiveSection("equipes"); }} style={{ textDecoration: "none" }}>
                <i className="fas fa-users"></i> Equipes
              </a>
            </li>
            <li className={activeSection === "inscricoes" ? "active" : ""}>
              <a href="#" onClick={e => { e.preventDefault(); setActiveSection("inscricoes"); }} style={{ textDecoration: "none" }}>
                <i className="fas fa-file-alt"></i> Inscrições
              </a>
            </li>
          </ul>
         </nav>
         
        </div>
        <div className="user-footer" style={{ textAlign: "center" }}>
          <div>
            <span className="user">{userName}</span><br />
            <img
              id="userPhoto"
              src={photoUrl}
              alt="Foto do usuário"
              width="48"
              style={{ borderRadius: "50%", marginTop: "0.5rem" }}
            />
            <p>Administrador</p>
            <Link className="logout-link" to="/">Sair</Link>
          </div>
        </div>
      </aside>

      {/* Conteúdo principal */}
      <main className="main-content" style={{ flexGrow: 1, padding: "1rem 2rem", overflowY: "auto", backgroundColor: "#ecf0f1", minHeight: "100vh" }}>
        <header>
          <h1>Bem-vindo(a) <span>{userName}</span> 👋</h1>
        </header>

        {activeSection === "dashboard" && (
          <section className="content-section active">
            <h2>🏠 Dashboard</h2>
            <p>Resumo geral do sistema.</p>
             {/* Dropdown customizado */}
              <div className="switch-container">
      <label className="switch-label">Switch</label>
      <div className="switch-toggle">
        <input
          type="radio"
          name="modalidade"
          id="equipesRadio"
          checked={modalidade === "equipes"}
          onChange={() => setModalidade("equipes")}
        />
        <label htmlFor="equipesRadio">Modalidades por equipes</label>

        <input
          type="radio"
          name="modalidade"
          id="individuais"
          checked={modalidade === "individuais"}
          onChange={() => setModalidade("individuais")}
        />
        <label htmlFor="individuais">Modalidades individuais</label>
      </div>
    </div>

        <div className="custom-select-container">
      <div className="custom-select-toggle" onClick={() => setDropdownOpen(!dropdownOpen)}>
        <span>{selectedOption}</span>
        <i className="fa fa-chevron-down"></i>
      </div>

      {dropdownOpen && (
        <div className="custom-select-dropdown">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar"
          />
          <ul>
            {filteredOptions.map((option, index) => (
              <li key={index} onClick={() => { setSelectedOption(option); setDropdownOpen(false); }}>
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>

      {/* Mostrando o valor selecionado */}
      
          </section>
        )}

        {activeSection === "eventos" && (
          <section className="content-section active">
            <h2>📅 Eventos</h2>
            <input
              type="text"
              placeholder="Buscar evento..."
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setPaginaAtual(1); }}
              style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
            />
            <button onClick={abrirFormularioNovo} style={{ marginBottom: "1rem" }}>
              + Novo Evento
            </button>
            {showEventoForm && (
              <form onSubmit={salvarEvento} style={{ marginBottom: "1rem", background: "#fff", padding: "1rem", borderRadius: "5px" }}>
                <div>
                  <label>Nome do Evento:</label><br />
                  <input
                    type="text"
                    value={formEvento.nome}
                    onChange={e => setFormEvento({ ...formEvento, nome: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label>Total de Equipes:</label><br />
                  <input
                    type="number"
                    value={formEvento.equipes}
                    onChange={e => setFormEvento({ ...formEvento, equipes: e.target.value })}
                    required
                    min="1"
                  />
                </div>
                <div>
                  <label>Data do Evento:</label><br />
                  <input
                    type="date"
                    value={formEvento.data}
                    onChange={e => setFormEvento({ ...formEvento, data: e.target.value })}
                    required
                  />
                </div>
                <button type="submit" style={{ marginTop: "1rem" }}>
                  {indexEditando !== null ? "Salvar Alterações" : "Adicionar Evento"}
                </button>
                <button type="button" onClick={cancelarFormulario} style={{ marginLeft: "1rem" }}>
                  Cancelar
                </button>
              </form>
            )}

            {/* Lista de eventos paginada */}
            {eventosPagina.length === 0 && <p>Nenhum evento encontrado.</p>}
            {eventosPagina.length > 0 && (
              <table border="1" cellPadding="8" style={{ width: "100%", background: "white", borderCollapse: "collapse" }}>
                <thead style={{ background: "#3498db", color: "white" }}>
                  <tr>
                    <th>Nome do Evento</th>
                    <th>Total de Equipes</th>
                    <th>Status</th>
                    <th>Data</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {eventosPagina.map((ev, i) => (
                    <tr key={inicio + i}>
                      <td>{ev.nome}</td>
                      <td>{ev.equipes}</td>
                      <td>{ev.status}</td>
                      <td>{ev.data}</td>
                      <td>
                        <button onClick={() => abrirFormularioEdicao(inicio + i)}>Editar</button>
                        <button onClick={() => removerEvento(inicio + i)} style={{ marginLeft: "0.5rem", color: "red" }}>Remover</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div style={{ marginTop: "1rem", display: "flex", justifyContent: "space-between" }}>
              <button onClick={paginaAnterior} disabled={paginaAtual === 1}>Anterior</button>
              <span>Página {paginaAtual} de {totalPaginas || 1}</span>
              <button onClick={paginaProxima} disabled={paginaAtual === totalPaginas || totalPaginas === 0}>Próximo</button>
            </div>
          </section>
        )}

        {/* Seção de Equipes */}
        {activeSection === "equipes" && (
          <section className="content-section active">
            <h2>👥 Equipes</h2>
            <input
              type="text"
              placeholder="Nome da equipe"
              value={formEquipe}
              onChange={e => setFormEquipe(e.target.value)}
              style={{ marginBottom: "1rem", padding: "0.5rem", width: "100%" }}
            />
            <button onClick={salvarEquipe} style={{ marginBottom: "1rem" }}>
              + Nova Equipe
            </button>
            <ul>
              {equipes.map((equipe, i) => (
                <li key={i}>
                  {equipe}
                  <button onClick={() => removerEquipe(i)} style={{ marginLeft: "1rem", color: "red" }}>❌</button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Seção de Inscrições */}
        {activeSection === "inscricoes" && (
          <section className="content-section active">
            <h2>📝 Inscrições</h2>
            <form onSubmit={salvarInscricao} style={{ marginBottom: "1rem" }}>
              <input
                type="text"
                placeholder="Nome do Participante"
                value={formInscricao.nome}
                onChange={e => setFormInscricao({ ...formInscricao, nome: e.target.value })}
                required
                style={{ marginRight: "1rem", padding: "0.5rem" }}
              />
              <select
                value={formInscricao.evento}
                onChange={e => setFormInscricao({ ...formInscricao, evento: e.target.value })}
                required
                style={{ marginRight: "1rem", padding: "0.5rem" }}
              >
                <option value="">Selecione o Evento</option>
                {eventos.map((evento, idx) => (
                  <option key={idx} value={evento.nome}>{evento.nome}</option>
                ))}
              </select>
              <button type="submit" style={{ padding: "0.5rem" }}>
                Inscrever
              </button>
            </form>
            <ul>
              {inscricoes.map((inscricao, i) => (
                <li key={i}>
                  {inscricao.nome} - {inscricao.evento}
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </div>
  );
}
