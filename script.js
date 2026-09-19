const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

const moduleData = {
  fraud: {
    index: 'MODULE 01',
    title: 'Suspicious activity<br />Or a <em>missing detail?</em>',
    description: 'Review transactions, camera feeds, and customer profiles Decide what deserves a flag—and what deserves a second look',
    question: 'Is the transaction suspicious, or just unfamiliar?',
    action: 'Request a playtest',
    visual: `<div class="module-visual fraud-visual"><div class="visual-header"><span>LIVE REVIEW / CASE 03</span><b>● RECORDING</b></div><div class="cctv-scene"><span class="timestamp">09:41:47</span><div class="cctv-figure"></div><div class="street-line"></div></div><div class="visual-tags"><span>LOCATION</span><span>TIME</span><span>PRICE</span><span>ITEM</span></div></div>`
  },
  kyc: {
    index: 'MODULE 02',
    title: 'Verify identity<br />Respect the person',
    description: 'Inspect a 3D face scan, selfie, and simulated government ID Separate real signs of fraud from the access barriers people face when proving who they are',
    question: 'What does “valid” look like—and who gets excluded?',
    action: 'Inspect an identity',
    visual: `<img src="1.png" style="width: 100%; height: auto;">`
  },
  credit: {
    index: 'MODULE 03',
    title: 'Score the loan<br />Question the score',
    description: 'Review payment history, debt ratio, and the AI recommendation Decide when to trust a model—and when a seemingly objective number needs human judgment',
    question: 'Can an efficient score still create an unfair future?',
    action: 'Assess an application',
    visual: `<img src="4.png" style="width: 100%; height: auto;">`
  }
};

const display = document.querySelector('.module-display');
const tabs = document.querySelectorAll('.module-tab');

function setModule(key) {
  const module = moduleData[key];
  if (!module || !display) return;
  display.dataset.activeModule = key;
  display.innerHTML = `${module.visual}<div class="module-content"><p class="module-index">${module.index}</p><h3>${module.title}</h3><p>${module.description}</p><div class="module-question"><span>THE QUESTION</span><p>${module.question}</p></div><a href="#play" class="text-link light">${module.action} <span>→</span></a></div>`;
  tabs.forEach((tab) => {
    const active = tab.dataset.module === key;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
  });
}

tabs.forEach((tab) => tab.addEventListener('click', () => setModule(tab.dataset.module)));

const evaluationCategories = [
  { id: 'functional-suitability', name: 'Functional suitability', description: 'Does the prototype provide the right functions for the specified learning and evaluation tasks?', items: [
    ['functional-completeness', 'Functional completeness', 'Coverage of the specified tasks and user objectives'],
    ['functional-correctness', 'Functional correctness', 'Delivery of correct results with the needed degree of precision'],
    ['functional-appropriateness', 'Functional appropriateness', 'How well the functions facilitate the intended tasks and objectives']
  ]},
  { id: 'performance-efficiency', name: 'Performance efficiency', description: 'Does the prototype perform acceptably relative to the resources it uses?', items: [
    ['time-behaviour', 'Time behaviour', 'Whether response, processing, and throughput times meet expectations'],
    ['resource-utilization', 'Resource utilization', 'Whether the amount and type of resources used are appropriate'],
    ['capacity', 'Capacity', 'Whether system parameter limits meet the stated requirements']
  ]},
  { id: 'compatibility', name: 'Compatibility', description: 'Can the prototype perform its functions alongside relevant systems and environments?', items: [
    ['co-existence', 'Co-existence', 'Ability to operate efficiently in a shared environment without detrimental impact'],
    ['interoperability', 'Interoperability', 'Ability to exchange and use information with other systems or components']
  ]},
  { id: 'usability', name: 'Usability', description: 'Can intended users learn, operate, and benefit from the prototype effectively and satisfactorily?', items: [
    ['appropriateness-recognizability', 'Appropriateness recognizability', 'Whether users can recognize that the system is appropriate for their needs'],
    ['learnability', 'Learnability', 'How effectively and satisfactorily users can learn to use the system'],
    ['operability', 'Operability', 'How easy the system is to operate and control'],
    ['user-error-protection', 'User error protection', 'How well the system protects users against making errors'],
    ['user-interface-aesthetics', 'User interface aesthetics', 'Whether the interface enables a pleasing and satisfying interaction'],
    ['accessibility', 'Accessibility', 'How well the system supports users with a wide range of characteristics and capabilities']
  ]},
  { id: 'reliability', name: 'Reliability', description: 'Can the prototype perform its specified functions consistently under stated conditions?', items: [
    ['maturity', 'Maturity', 'Ability to meet reliability needs under normal operation'],
    ['availability', 'Availability', 'Whether the system is operational and accessible when needed'],
    ['fault-tolerance', 'Fault tolerance', 'Ability to operate as intended despite hardware or software faults'],
    ['recoverability', 'Recoverability', 'Ability to restore affected data and re-establish the desired state after interruption or failure']
  ]},
  { id: 'security', name: 'Security', description: 'Does the prototype protect information and provide appropriate access?', items: [
    ['confidentiality', 'Confidentiality', 'Whether data are accessible only to authorized users'],
    ['integrity', 'Integrity', 'Protection against unauthorized modification of programs or data'],
    ['non-repudiation', 'Non-repudiation', 'Whether actions or events can be proven to have taken place'],
    ['accountability', 'Accountability', 'Whether actions can be traced uniquely to an entity'],
    ['authenticity', 'Authenticity', 'Whether the identity of a subject or resource can be proved as claimed']
  ]},
  { id: 'maintainability', name: 'Maintainability', description: 'Can the prototype be effectively analyzed, improved, corrected, and adapted?', items: [
    ['modularity', 'Modularity', 'Use of discrete components so change has minimal impact elsewhere'],
    ['reusability', 'Reusability', 'Ability for an asset to be used in more than one system or other assets'],
    ['analysability', 'Analysability', 'Efficiency of assessing the impact of change or diagnosing deficiencies'],
    ['modifiability', 'Modifiability', 'Ability to be modified effectively without introducing defects or degrading quality'],
    ['testability', 'Testability', 'Efficiency of establishing and performing tests to determine whether criteria are met']
  ]},
  { id: 'portability', name: 'Portability', description: 'Can the prototype be transferred, installed, or adapted across required environments?', items: [
    ['adaptability', 'Adaptability', 'Ability to be adapted effectively for differing or evolving environments'],
    ['installability', 'Installability', 'Ability to be successfully installed or uninstalled in its specified environment'],
    ['replaceability', 'Replaceability', 'Ability to replace another product for the same purpose in the same environment']
  ]}
];

const evaluationForm = document.querySelector('#expert-evaluation-form');
const ratingMount = document.querySelector('#rating-categories');
const totalScore = document.querySelector('#overall-score');
const categorySummary = document.querySelector('#category-summary');
const saveStatus = document.querySelector('#save-status');
const storageKey = 'train-or-fail-iso25010-evaluation-v1';

function ratingOption(itemId, value) {
  return `<label class="rating-option"><input type="radio" name="rating-${itemId}" value="${value}" aria-label="${value} out of 4" /><span>${value}</span></label>`;
}

function renderEvaluationCategories() {
  if (!ratingMount) return;
  ratingMount.innerHTML = evaluationCategories.map((category) => `
    <section class="rating-category" data-category="${category.id}">
      <div class="rating-category-header"><div><h4>${category.name}</h4><p>${category.description}</p></div><output class="category-score" data-score-for="${category.id}">Not rated</output></div>
      ${category.items.map(([id, name, description]) => `<div class="criterion"><div><span class="criterion-title">${name}</span><span class="criterion-description">${description}</span></div><div class="rating-options" role="radiogroup" aria-label="Rate ${name} from 1 to 4">${[1, 2, 3, 4].map((value) => ratingOption(id, value)).join('')}</div></div>`).join('')}
    </section>`).join('');
}

function collectEvaluation() {
  if (!evaluationForm) return null;
  const formData = new FormData(evaluationForm);
  const profile = {
    name: formData.get('expert-name') || '',
    age: formData.get('expert-age') || '',
    institution: formData.get('institution') || '',
    designation: formData.get('designation') || ''
  };
  const ratings = {};
  evaluationCategories.forEach((category) => category.items.forEach(([id]) => {
    const value = Number(formData.get(`rating-${id}`));
    ratings[id] = Number.isFinite(value) && value > 0 ? value : null;
  }));
  return {
    schemaVersion: 1,
    project: 'Train or Fail',
    standard: 'ISO/IEC 25010 Software Product Quality',
    savedAt: new Date().toISOString(),
    expertProfile: profile,
    ratings,
    feedback: {
      strengths: formData.get('strengths') || '',
      improvements: formData.get('improvements') || '',
      additionalFeatures: formData.get('additional-features') || ''
    }
  };
}

function calculateScores(ratings) {
  const summary = evaluationCategories.map((category) => {
    const values = category.items.map(([id]) => ratings[id]).filter((value) => Number.isFinite(value));
    return { id: category.id, name: category.name, score: values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null };
  });
  const all = Object.values(ratings).filter((value) => Number.isFinite(value));
  return { summary, overall: all.length ? all.reduce((sum, value) => sum + value, 0) / all.length : null, rated: all.length };
}

function updateScores() {
  const data = collectEvaluation();
  if (!data) return;
  const { summary, overall, rated } = calculateScores(data.ratings);
  if (totalScore) totalScore.innerHTML = overall ? `${overall.toFixed(2)}<em>/ 4.00</em>` : '—<em>/ 4.00</em>';
  if (categorySummary) categorySummary.innerHTML = summary.map(({ name, score }) => `<div class="summary-category"><span>${name}</span><strong>${score ? score.toFixed(1) : '—'}</strong></div>`).join('');
  document.querySelectorAll('[data-score-for]').forEach((element) => {
    const result = summary.find(({ id }) => id === element.dataset.scoreFor);
    element.textContent = result?.score ? `${result.score.toFixed(2)} / 4.00` : 'Not rated';
  });
  return rated;
}

function setSaveStatus(message, type = '') {
  if (!saveStatus) return;
  saveStatus.textContent = message;
  saveStatus.className = `save-status ${type}`.trim();
}

function saveDraft(message = 'Draft saved on this device') {
  const data = collectEvaluation();
  if (!data) return false;
  try {
    localStorage.setItem(storageKey, JSON.stringify(data));
    setSaveStatus(message, 'success');
    return true;
  } catch (error) {
    setSaveStatus('Unable to save locally Export a JSON copy instead', 'error');
    return false;
  }
}

function restoreDraft() {
  if (!evaluationForm) return;
  try {
    const saved = localStorage.getItem(storageKey);
    if (!saved) return;
    const data = JSON.parse(saved);
    Object.entries(data.expertProfile || {}).forEach(([key, value]) => {
      const field = evaluationForm.elements[`expert-${key === 'name' ? 'name' : key}`];
      if (field) field.value = value;
    });
    Object.entries(data.ratings || {}).forEach(([id, value]) => {
      const input = evaluationForm.querySelector(`input[name="rating-${id}"][value="${value}"]`);
      if (input) input.checked = true;
    });
    Object.entries(data.feedback || {}).forEach(([key, value]) => {
      const field = evaluationForm.elements[key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)];
      if (field) field.value = value;
    });
    setSaveStatus('Saved draft restored from this device', 'success');
  } catch (error) {
    setSaveStatus('Saved draft could not be restored', 'error');
  }
}

const ghlWebhookUrl = 'https://services.leadconnectorhq.com/hooks/HzaOxDVzGTWAhjOdBfyG/webhook-trigger/9a31b16f-a107-4f47-8a38-71fcc3b73c36';

async function submitEvaluation() {
  const data = collectEvaluation();
  if (!data) return;
  const rated = updateScores();
  if (!rated) {
    setSaveStatus('Rate at least one criterion before submitting', 'error');
    return;
  }
  const submitButton = document.querySelector('#submit-evaluation');
  if (submitButton) submitButton.disabled = true;
  setSaveStatus('Submitting your evaluation…');
  try {
    const payload = { ...data, scores: calculateScores(data.ratings) };
    const response = await fetch(ghlWebhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!response.ok) throw new Error(`Request failed with status ${response.status}`);
    try { localStorage.removeItem(storageKey); } catch (error) { /* Browser storage may be unavailable */ }
    evaluationForm?.reset();
    updateScores();
    setSaveStatus('Evaluation submitted, thank you', 'success');
  } catch (error) {
    setSaveStatus('Could not submit evaluation Check your connection and try again', 'error');
  } finally {
    if (submitButton) submitButton.disabled = false;
  }
}

renderEvaluationCategories();
restoreDraft();
updateScores();

evaluationForm?.addEventListener('input', () => {
  updateScores();
  saveDraft('Changes saved locally');
});

document.querySelector('#save-draft')?.addEventListener('click', () => saveDraft());
document.querySelector('#submit-evaluation')?.addEventListener('click', submitEvaluation);
document.querySelector('#clear-evaluation')?.addEventListener('click', () => {
  if (!window.confirm('Clear this saved evaluation from this device? This cannot be undone')) return;
  evaluationForm?.reset();
  try { localStorage.removeItem(storageKey); } catch (error) { /* Browser storage may be unavailable */ }
  updateScores();
  setSaveStatus('Local draft cleared');
});
