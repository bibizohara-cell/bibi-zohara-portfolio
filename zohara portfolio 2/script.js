document.addEventListener('DOMContentLoaded', () => {
  // Fetch Portfolio Data from JSON
  fetch('data.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load portfolio data');
      }
      return response.json();
    })
    .then(data => {
      renderPortfolio(data);
    })
    .catch(error => {
      console.error('Error loading JSON data:', error);
      const alertArea = document.getElementById('hero-intro');
      if (alertArea) {
        alertArea.innerHTML = '<span class="text-danger">Unable to load data.json. Make sure you are running a Live Server.</span>';
      }
    });

  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function (event) {
    event.preventDefault();
    event.stopPropagation();

    const alertBox = document.getElementById('form-alert');

    if (contactForm.checkValidity()) {
      alertBox.innerHTML = '<div class="alert alert-success">Thank you! Your message has been sent successfully.</div>';
      contactForm.reset();
      contactForm.classList.remove('was-validated');
    } else {
      contactForm.classList.add('was-validated');
      alertBox.innerHTML = '<div class="alert alert-danger">Please fill in all fields correctly before submitting.</div>';
    }
  });
});

function renderPortfolio(data) {
  // Personal & Hero Info
  document.getElementById('nav-brand').innerText = data.personal.name;
  document.getElementById('hero-name').innerText = `${data.personal.name} (${data.personal.age} Yrs)`;
  document.getElementById('hero-title').innerText = data.personal.title;
  document.getElementById('hero-intro').innerText = data.personal.introduction;
  document.getElementById('hero-img').src = data.personal.profileImage;
  document.getElementById('resume-btn').href = data.personal.resumeLink;
  document.getElementById('footer-name').innerText = data.personal.name;

  // About Section
  document.getElementById('about-desc').innerText = data.about.description;

  // Render Skills
  const skillsContainer = document.getElementById('skills-container');
  skillsContainer.innerHTML = '';
  data.skills.forEach(skill => {
    skillsContainer.innerHTML += `
      <div class="col-6 col-md-4 col-lg-2">
        <div class="card h-100 border-0 shadow-sm text-center p-3 skill-card">
          <h5 class="fw-bold mb-1">${skill.name}</h5>
          <span class="badge ${skill.badge} mt-2">${skill.level}</span>
        </div>
      </div>
    `;
  });

  // Render Projects
  const projectsContainer = document.getElementById('projects-container');
  projectsContainer.innerHTML = '';
  data.projects.forEach(project => {
    projectsContainer.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="card h-100 border-0 shadow-sm">
          <img src="${project.image}" class="card-img-top" alt="${project.name}" style="height: 200px; object-fit: cover;">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title fw-bold">${project.name}</h5>
            <p class="card-text text-muted">${project.description}</p>
            <p class="card-text mt-auto"><strong>Tech:</strong> ${project.technologies}</p>
            <a href="${project.link}" class="btn btn-outline-primary mt-2">View Project</a>
          </div>
        </div>
      </div>
    `;
  });

  // Render Education
  const eduContainer = document.getElementById('education-container');
  eduContainer.innerHTML = '';
  data.education.forEach(edu => {
    eduContainer.innerHTML += `
      <div class="card border-0 shadow-sm mb-3">
        <div class="card-body">
          <h5 class="fw-bold">${edu.degree}</h5>
          <h6 class="text-primary">${edu.institution}</h6>
          <p class="text-muted mb-1"><strong>${edu.semester}</strong> | ${edu.year}</p>
          <p class="mb-0">${edu.details}</p>
        </div>
      </div>
    `;
  });

  // Render Certifications
  const certContainer = document.getElementById('certifications-container');
  certContainer.innerHTML = '';
  data.certifications.forEach(cert => {
    certContainer.innerHTML += `
      <div class="card border-0 shadow-sm mb-3">
        <div class="card-body">
          <h5 class="fw-bold">${cert.title}</h5>
          <p class="text-muted mb-0">Issued by ${cert.issuer} (${cert.year})</p>
        </div>
      </div>
    `;
  });

  // Social Links
  document.getElementById('link-github').href = data.socials.github;
  document.getElementById('link-linkedin').href = data.socials.linkedin;
  document.getElementById('link-twitter').href = data.socials.twitter;
}