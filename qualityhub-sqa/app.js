
// === Navigation ===
document.querySelectorAll('.nav-link[data-page]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const page = link.dataset.page;
    document.querySelectorAll('.nav-link[data-page]').forEach(l => l.classList.toggle('active', l === link));
    document.querySelectorAll('.page').forEach(p => p.classList.toggle('active', p.id === page));
    if (page === 'dashboard') renderDashboard();
    if (page === 'reports') renderReports();
  });
});

function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
document.querySelectorAll('.modal').forEach(m => {
  m.addEventListener('click', e => { if (e.target === m) m.classList.remove('active'); });
});

const badge = (type, val) => `<span class="badge badge-${val}">${val.replace('_',' ')}</span>`;
const today = () => new Date().toISOString().split('T')[0];

function renderDashboard() {
  if (!testCases || testCases.length === 0) {
    document.getElementById('stats-grid').innerHTML = '<div class="stat-card"><div class="stat-label">Loading data...</div></div>';
    return;
  }

  const passed = testCases.filter(t => t.status === 'passed').length;
  const passRate = testCases.length > 0 ? Math.round((passed / testCases.length) * 100) : 0;
  const openBugs = bugs.filter(b => b.status === 'open').length;
  const critical = bugs.filter(b => b.severity === 'critical').length;
  const inProgress = bugs.filter(b => b.status === 'in_progress').length;

  document.getElementById('stats-grid').innerHTML = `
    <div class="stat-card"><span class="stat-icon">🧪</span><div class="stat-label">Total Tests</div><div class="stat-value">${testCases.length}</div><div class="stat-sub">across modules</div></div>
    <div class="stat-card"><span class="stat-icon">📈</span><div class="stat-label">Pass Rate</div><div class="stat-value" style="color:var(--success)">${passRate}%</div><div class="stat-sub">↑ 5% from last week</div></div>
    <div class="stat-card"><span class="stat-icon">🐞</span><div class="stat-label">Open Bugs</div><div class="stat-value" style="color:var(--danger)">${openBugs}</div><div class="stat-sub">${critical} critical</div></div>
    <div class="stat-card"><span class="stat-icon">⏱️</span><div class="stat-label">In Progress</div><div class="stat-value" style="color:var(--warning)">${inProgress}</div><div class="stat-sub">being fixed</div></div>
  `;

  document.getElementById('recent-bugs').innerHTML = bugs.length > 0 ? bugs.slice(0, 4).map(b => `
    <div>
      <div style="display:flex;gap:12px;align-items:center"><span class="mono-id">${b.id}</span><span>${b.title}</span></div>
      <div style="display:flex;gap:6px">${badge('sev', b.severity)} ${badge('status', b.status)}</div>
    </div>
  `).join('') : '<div style="padding:20px;color:var(--muted)">No bugs to display</div>';

  drawPieChart();
  drawBugsBarChart();
}

let pieChart, barChart, trendChart, healthChart;
function drawPieChart() {
  const ctx = document.getElementById('testPieChart');
  if (pieChart) pieChart.destroy();
  const counts = ['passed','failed','running','not_run'].map(s => testCases.filter(t => t.status === s).length);
  pieChart = new Chart(ctx, {
    type: 'doughnut',
    data: { labels: ['Passed','Failed','Running','Not Run'], datasets: [{ data: counts, backgroundColor: ['hsl(142,71%,45%)','hsl(0,72%,51%)','hsl(217,91%,60%)','hsl(220,10%,50%)'], borderColor: 'hsl(220,16%,14%)', borderWidth: 2 }] },
    options: { plugins: { legend: { labels: { color: '#aaa', font: { size: 11 } } } } }
  });
}
function drawBugsBarChart() {
  const ctx = document.getElementById('bugsBarChart');
  if (barChart) barChart.destroy();
  const modules = ['Authentication','Cart','Search','Payments','Orders','Profile'];
  const data = modules.map(m => bugs.filter(b => b.module === m).length);
  barChart = new Chart(ctx, {
    type: 'bar',
    data: { labels: modules, datasets: [{ data, backgroundColor: 'hsl(174,62%,47%)', borderRadius: 4 }] },
    options: { plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#888' }, grid: { display: false } }, y: { ticks: { color: '#888', stepSize: 1 }, grid: { color: 'hsl(220,12%,22%)' } } } }
  });
}

function renderTestCases() {
  if (!testCases) return;
  
  const search = document.getElementById('tc-search').value.toLowerCase();
  const filter = document.getElementById('tc-filter').value;
  const filtered = testCases.filter(tc =>
    (tc.title.toLowerCase().includes(search) || tc.id.toLowerCase().includes(search)) &&
    (filter === 'all' || tc.status === filter)
  );
  document.getElementById('tc-count').textContent = `${testCases.length} test cases across all modules`;
  const tbody = document.getElementById('tc-tbody');
  tbody.innerHTML = filtered.length ? filtered.map(tc => `
    <tr>
      <td class="mono-id">${tc.id}</td>
      <td><strong>${tc.title}</strong></td>
      <td style="color:var(--muted)">${tc.module}</td>
      <td>${badge('p', tc.priority)}</td>
      <td>${badge('s', tc.status)}</td>
      <td style="color:var(--muted)">${tc.assignedTo || 'Unassigned'}</td>
      <td class="mono-id">${tc.lastRun ?? '—'}</td>
    </tr>
  `).join('') : `<tr><td colspan="7" class="empty">No test cases found</td></tr>`;
}
document.getElementById('tc-search').addEventListener('input', renderTestCases);
document.getElementById('tc-filter').addEventListener('change', renderTestCases);
document.getElementById('tc-form').addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  submitTestCase(fd);
  e.target.reset();
  closeModal('tc-modal');
});

function renderBugs() {
  if (!bugs) return;
  
  const search = document.getElementById('bug-search').value.toLowerCase();
  const sev = document.getElementById('bug-sev').value;
  const status = document.getElementById('bug-status').value;
  const filtered = bugs.filter(b =>
    (b.title.toLowerCase().includes(search) || b.id.toLowerCase().includes(search)) &&
    (sev === 'all' || b.severity === sev) &&
    (status === 'all' || b.status === status)
  );
  document.getElementById('bug-count').textContent = `${bugs.filter(b => b.status === 'open').length} open bugs`;
  const list = document.getElementById('bug-list');
  list.innerHTML = filtered.length ? filtered.map(b => `
    <div class="bug-card">
      <div class="bug-meta">
        <span class="mono-id">${b.id}</span>
        ${badge('sev', b.severity)} ${badge('status', b.status)}
      </div>
      <div class="bug-title">${b.title}</div>
      <div class="bug-desc">${b.description}</div>
      <div class="bug-footer">
        <span>Module: <span>${b.module}</span></span>
        <span>Assigned: <span>${b.assignedTo || 'Unassigned'}</span></span>
        <span>Reporter: <span>${b.reporter || 'Unknown'}</span></span>
        <span class="mono-id">${b.updatedAt}</span>
      </div>
    </div>
  `).join('') : `<div class="card empty">No bugs found</div>`;
}
['bug-search','bug-sev','bug-status'].forEach(id => {
  const el = document.getElementById(id);
  el.addEventListener(el.tagName === 'SELECT' ? 'change' : 'input', renderBugs);
});
document.getElementById('bug-form').addEventListener('submit', e => {
  e.preventDefault();
  const fd = new FormData(e.target);
  submitBug(fd);
  e.target.reset();
  closeModal('bug-modal');
});

function renderReports() {
  if (trendChart) trendChart.destroy();
  if (healthChart) healthChart.destroy();
  trendChart = new Chart(document.getElementById('trendChart'), {
    type: 'line',
    data: {
      labels: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
      datasets: [
        { label: 'Passed', data: [12,15,14,18,20,17,22], borderColor: 'hsl(142,71%,45%)', backgroundColor: 'hsla(142,71%,45%,0.1)', tension: 0.3, fill: true },
        { label: 'Failed', data: [4,3,5,2,3,4,2], borderColor: 'hsl(0,72%,51%)', backgroundColor: 'hsla(0,72%,51%,0.1)', tension: 0.3, fill: true },
      ]
    },
    options: { plugins: { legend: { labels: { color: '#aaa' } } }, scales: { x: { ticks: { color: '#888' }, grid: { display: false } }, y: { ticks: { color: '#888' }, grid: { color: 'hsl(220,12%,22%)' } } } }
  });
  healthChart = new Chart(document.getElementById('healthChart'), {
    type: 'radar',
    data: {
      labels: ['Auth','Cart','Search','Payments','Orders','Profile'],
      datasets: [{ label: 'Health Score', data: [85, 65, 72, 90, 78, 88], borderColor: 'hsl(174,62%,47%)', backgroundColor: 'hsla(174,62%,47%,0.2)', pointBackgroundColor: 'hsl(174,62%,47%)' }]
    },
    options: { plugins: { legend: { labels: { color: '#aaa' } } }, scales: { r: { angleLines: { color: 'hsl(220,12%,22%)' }, grid: { color: 'hsl(220,12%,22%)' }, pointLabels: { color: '#aaa' }, ticks: { color: '#666', backdropColor: 'transparent' } } } }
  });
}

// === Init ===
// Data will be fetched and rendered by data.js functions
