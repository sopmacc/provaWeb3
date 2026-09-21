let eventos = [
   { id: 1, titulo: "Workshop de Git e GitHub", tipo: "Workshop", data: "2026-09-25", local: "Laboratório 2", descricao: "Atividade prática sobre versionamento.", status: "Agendado" },
   { id: 2, titulo: "Palestra de Inteligência Artificial", tipo: "Palestra", data: "2026-09-28", local: "Auditório Principal", descricao: "Discussão sobre o futuro da IA no mercado de trabalho.", status: "Agendado" },
   { id: 3, titulo: "Visita Técnica à Empresa Tech", tipo: "Visita Técnica", data: "2026-10-05", local: "Empresa TechCorp", descricao: "Conhecer a infraestrutura de desenvolvimento de software.", status: "Realizado" }
];
const app = document.getElementById('app');
document.addEventListener('DOMContentLoaded', () => {
   document.querySelectorAll('[data-view]').forEach(link => {
       link.addEventListener('click', (e) => {
           e.preventDefault();
           mudarTela(link.dataset.view);
       });
   });
   mudarTela('dashboard');
});
function mudarTela(view) {
   app.innerHTML = '';
   if (view === 'dashboard') {
       const total = eventos.length;
       const agendados = eventos.filter(ev => ev.status === 'Agendado').length;
       const realizados = eventos.filter(ev => ev.status === 'Realizado').length;
       app.innerHTML = `
<div class="p-4 bg-white rounded shadow-sm">
<h2>Dashboard</h2>
<p>Total de eventos: ${total}</p>
<p>Eventos agendados: ${agendados}</p>
<p>Eventos realizados: ${realizados}</p>
</div>
       `;
   } else if (view === 'novo') {
       app.innerHTML = `
<div class="p-4 bg-white rounded shadow-sm">
<h2>Novo Evento</h2>
<form onsubmit="adicionarEvento(event)">
<input type="text" id="titulo" class="form-control mb-2" placeholder="Título" required>
<select id="tipo" class="form-control mb-2" required>
<option value="">Selecione o Tipo</option>
<option value="Palestra">Palestra</option>
<option value="Workshop">Workshop</option>
<option value="Minicurso">Minicurso</option>
<option value="Visita Técnica">Visita Técnica</option>
</select>
<input type="date" id="data" class="form-control mb-2" required>
<input type="text" id="local" class="form-control mb-2" placeholder="Local" required>
<textarea id="descricao" class="form-control mb-2" placeholder="Descrição" required></textarea>
<button class="btn btn-primary">Cadastrar</button>
</form>
</div>
       `;
   } else if (view === 'eventos') {
       app.innerHTML = `
<div class="p-4 bg-white rounded shadow-sm">
<h2>Eventos</h2>
<input type="text" id="busca" class="form-control mb-3" placeholder="Pesquisar por título..." oninput="renderizarLista()">
<div id="lista-eventos"></div>
</div>
       `;
       renderizarLista();
   }
}
function adicionarEvento(e) {
   e.preventDefault();
   const novo = {
       id: Date.now(),
       titulo: document.getElementById('titulo').value.trim(),
       tipo: document.getElementById('tipo').value,
       data: document.getElementById('data').value,
       local: document.getElementById('local').value.trim(),
       descricao: document.getElementById('descricao').value.trim(),
       status: "Agendado"
   };
   eventos.push(novo);
   alert('Cadastrado com sucesso!');
   mudarTela('eventos');
}
function renderizarLista() {
   const container = document.getElementById('lista-eventos');
   if (!container) return;
   container.innerHTML = '';
   const termo = document.getElementById('busca').value.toLowerCase();
   const filtrados = eventos.filter(ev => ev.titulo.toLowerCase().includes(termo));
   if (filtrados.length === 0) {
       container.innerHTML = '<p class="text-muted">Nenhum evento encontrado.</p>';
       return;
   }
   filtrados.forEach(ev => {
       const div = document.createElement('div');
       div.className = 'border p-3 mb-2 rounded bg-light';
       div.innerHTML = `
<h5>${ev.titulo} <span class="badge bg-secondary">${ev.tipo}</span> <span class="badge ${ev.status === 'Realizado' ? 'bg-success' : 'bg-warning text-dark'}">${ev.status}</span></h5>
<p class="mb-1">${ev.descricao}</p>
<small class="text-muted">Data: ${ev.data} | Local: ${ev.local}</small>
<div class="mt-2">
<button class="btn btn-sm btn-success me-1" onclick="alternarStatus(${ev.id})">${ev.status === 'Realizado' ? 'Desmarcar' : 'Realizar'}</button>
<button class="btn btn-sm btn-danger" onclick="removerEvento(${ev.id})">Excluir</button>
</div>
       `;
       container.appendChild(div);
   });
}
function alternarStatus(id) {
   const ev = eventos.find(i => i.id === id);
   if (ev) {
       ev.status = ev.status === 'Realizado' ? 'Agendado' : 'Realizado';
       renderizarLista();
   }
}
function removerEvento(id) {
   if (confirm('Deseja excluir?')) {
       eventos = eventos.filter(i => i.id !== id);
       renderizarLista();
   }
}