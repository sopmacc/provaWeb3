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