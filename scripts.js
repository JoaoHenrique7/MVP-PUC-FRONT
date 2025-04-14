let barbeiros = [];
let servicos = [];
let agendamentos = [];

const API_URL = 'http://localhost:5000';

function salvarLocalmente() {
  localStorage.setItem('barbeiros', JSON.stringify(barbeiros));
  localStorage.setItem('servicos', JSON.stringify(servicos));
  localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
}

function carregarLocalmente() {
  barbeiros = JSON.parse(localStorage.getItem('barbeiros')) || [];
  servicos = JSON.parse(localStorage.getItem('servicos')) || [];
  agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];
}

async function carregarDados() {
  try {
    const [barbeirosRes, servicosRes, agendamentosRes] = await Promise.all([
      fetch(`${API_URL}/barbeiros`),
      fetch(`${API_URL}/servicos`),
      fetch(`${API_URL}/agendamentos`)
    ]);

    if (barbeirosRes.ok && servicosRes.ok && agendamentosRes.ok) {
      barbeiros = await barbeirosRes.json();
      servicos = await servicosRes.json();
      agendamentos = await agendamentosRes.json();
    } else {
      throw new Error('Backend indisponível');
    }
  } catch (error) {
    console.warn('Erro ao acessar a API. Usando LocalStorage.', error);
    carregarLocalmente();
  }

  atualizarTabelaBarbeiros();
  atualizarTabelaServicos();
  atualizarTabelaAgendamentos();
}

carregarDados();

function showSection(sectionId) {
  document.querySelectorAll('.newItem').forEach(sec => sec.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
}

async function adicionarBarbeiro() {
  const nome = document.getElementById('nomeBarbeiro').value;
  if (nome.trim() === '') return alert('Digite o nome do barbeiro.');

  const novoBarbeiro = { nome };

  try {
    const res = await fetch(`${API_URL}/barbeiros`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoBarbeiro)
    });

    if (!res.ok) throw new Error('Falha na API');
  } catch (error) {
    barbeiros.push(novoBarbeiro);
    salvarLocalmente();
  }

  atualizarTabelaBarbeiros();
  document.getElementById('nomeBarbeiro').value = '';
}

function atualizarTabelaBarbeiros() {
  const table = document.getElementById('tableBarbeiros');
  table.innerHTML = `
    <tr>
      <th>Nome</th>
      <th><img src="https://cdn-icons-png.flaticon.com/512/126/126468.png" width="15px" height="15px"></th>
    </tr>
  `;
  barbeiros.forEach((b, index) => {
    table.innerHTML += `
      <tr>
        <td>${b.nome || b}</td>
        <td><button onclick="removerBarbeiro(${index})">🗑️</button></td>
      </tr>
    `;
  });
}

function removerBarbeiro(index) {
  barbeiros.splice(index, 1);
  salvarLocalmente();
  atualizarTabelaBarbeiros();
}

async function adicionarServico() {
  const nome = document.getElementById('nomeServico').value;
  const preco = document.getElementById('precoServico').value;
  if (nome.trim() === '' || preco.trim() === '') return alert('Preencha todos os campos.');

  const novoServico = { nome, preco };

  try {
    const res = await fetch(`${API_URL}/servicos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoServico)
    });

    if (!res.ok) throw new Error('Falha na API');
  } catch (error) {
    servicos.push(novoServico);
    salvarLocalmente();
  }

  atualizarTabelaServicos();
  document.getElementById('nomeServico').value = '';
  document.getElementById('precoServico').value = '';
}

function atualizarTabelaServicos() {
  const table = document.getElementById('tableServicos');
  table.innerHTML = `
    <tr>
      <th>Serviço</th>
      <th>Preço</th>
      <th><img src="https://cdn-icons-png.flaticon.com/512/126/126468.png" width="15px" height="15px"></th>
    </tr>
  `;
  servicos.forEach((s, index) => {
    table.innerHTML += `
      <tr>
        <td>${s.nome}</td>
        <td>R$ ${s.preco}</td>
        <td><button onclick="removerServico(${index})">🗑️</button></td>
      </tr>
    `;
  });
}

function removerServico(index) {
  servicos.splice(index, 1);
  salvarLocalmente();
  atualizarTabelaServicos();
}

async function adicionarAgendamento() {
  const cliente = document.getElementById('nomeCliente').value;
  const barbeiro = document.getElementById('barbeiroSelect').value;
  const servico = document.getElementById('servicoSelect').value;
  const horario = document.getElementById('horarioAgendamento').value;
  if (!cliente || !barbeiro || !servico || !horario) return alert('Preencha todos os campos.');

  const novoAgendamento = { cliente, barbeiro, servico, horario };

  try {
    const res = await fetch(`${API_URL}/agendamentos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novoAgendamento)
    });

    if (!res.ok) throw new Error('Falha na API');
  } catch (error) {
    agendamentos.push(novoAgendamento);
    salvarLocalmente();
  }

  atualizarTabelaAgendamentos();
  document.getElementById('nomeCliente').value = '';
  document.getElementById('barbeiroSelect').value = '';
  document.getElementById('servicoSelect').value = '';
  document.getElementById('horarioAgendamento').value = '';
}

function atualizarTabelaAgendamentos() {
  const table = document.getElementById('tableAgendamentos');
  table.innerHTML = `
    <tr>
      <th>Cliente</th>
      <th>Barbeiro</th>
      <th>Serviço</th>
      <th>Horário</th>
      <th><img src="https://cdn-icons-png.flaticon.com/512/126/126468.png" width="15px" height="15px"></th>
    </tr>
  `;
  agendamentos.forEach((a, index) => {
    table.innerHTML += `
      <tr>
        <td>${a.cliente}</td>
        <td>${a.barbeiro}</td>
        <td>${a.servico}</td>
        <td>${a.horario}</td>
        <td><button onclick="removerAgendamento(${index})">🗑️</button></td>
      </tr>
    `;
  });
}

function removerAgendamento(index) {
  agendamentos.splice(index, 1);
  salvarLocalmente();
  atualizarTabelaAgendamentos();
}
