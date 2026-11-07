let allPrompts = [];
let completedPrompts = JSON.parse(localStorage.getItem('completedPrompts')) || [];

// Fetch prompt data from data.json
async function loadPrompts() {
  try {
    const response = await fetch('data.json');
    if (!response.ok) {
      throw new Error('Failed to load JSON data');
    }
    allPrompts = await response.json();
    renderPrompts(allPrompts);
    updateTracker();
  } catch (error) {
    console.error('Error:', error);
    document.getElementById('prompts-grid').innerHTML = '<p>Unable to load prompts. Run with Live Server.</p>';
  }
}

// Render dynamic prompt cards
function renderPrompts(prompts) {
  const container = document.getElementById('prompts-grid');
  container.innerHTML = '';

  prompts.forEach(item => {
    const isCompleted = completedPrompts.includes(item.id);
    const card = document.createElement('div');
    card.classList.add('prompt-card');

    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}">
      <div class="prompt-info">
        <div class="prompt-header">
          <span class="day-badge">Day ${item.day}</span>
          <span class="category-tag">${item.category}</span>
        </div>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <button class="complete-btn ${isCompleted ? 'done' : ''}" onclick="toggleComplete(${item.id})">
          ${isCompleted ? '✓ Completed' : 'Mark Complete'}
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

// Toggle completion status
function toggleComplete(id) {
  if (completedPrompts.includes(id)) {
    completedPrompts = completedPrompts.filter(itemId => itemId !== id);
  } else {
    completedPrompts.push(id);
  }

  localStorage.setItem('completedPrompts', JSON.stringify(completedPrompts));
  
  // Refresh UI display
  const activeFilterBtn = document.querySelector('.filter-btn.active');
  const currentCategory = activeFilterBtn ? activeFilterBtn.innerText.replace(' Prompts', '') : 'All';
  filterPrompts(currentCategory === 'All' ? 'All' : currentCategory);
  updateTracker();
}

// Filter prompts by category
function filterPrompts(category) {
  // Update button active state
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.innerText.includes(category) || (category === 'All' && btn.innerText === 'All Prompts')) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Filter items
  if (category === 'All') {
    renderPrompts(allPrompts);
  } else {
    const filtered = allPrompts.filter(item => item.category === category);
    renderPrompts(filtered);
  }
}

// Update tracker progress bar
function updateTracker() {
  const count = completedPrompts.length;
  document.getElementById('completed-count').innerText = count;

  const percentage = (count / 30) * 100;
  document.getElementById('progress-bar').style.width = `${percentage}%`;
}

// Reset tracker progress
function resetProgress() {
  if (confirm('Are you sure you want to reset your progress?')) {
    completedPrompts = [];
    localStorage.removeItem('completedPrompts');
    renderPrompts(allPrompts);
    updateTracker();
  }
}

// Initial Call
loadPrompts();