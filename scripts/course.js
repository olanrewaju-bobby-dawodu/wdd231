const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to programming basics such as variables, loops, and decisions using Python.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Introduces web development using HTML and CSS. Hands-on projects help students get familiar with the web.',
    technology: ['HTML', 'CSS'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Covers writing and organizing reusable functions, error handling, and problem solving.',
    technology: ['Python'],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Introduces object-oriented programming with encapsulation, inheritance, and polymorphism.',
    technology: ['C#'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Uses JavaScript to create dynamic user interactions and responsive websites.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'Focus on frontend best practices, accessibility, performance, and working with APIs.',
    technology: ['HTML', 'CSS', 'JavaScript'],
    completed: false
  }
];

// HTML elements
const courseContainer = document.getElementById('courseContainer');
const totalCreditsSpan = document.getElementById('totalCredits');
const allBtn = document.getElementById('allBtn');
const cseBtn = document.getElementById('cseBtn');
const wddBtn = document.getElementById('wddBtn');

// Display courses
function displayCourses(courseList) {
  courseContainer.innerHTML = '';
  let totalCredits = 0;

  courseList.forEach(course => {
    totalCredits += course.credits;

    const div = document.createElement('div');
    div.classList.add('course-card');
    if (course.completed) {
      div.classList.add('completed');
    }

    div.innerHTML = `
      <h3>${course.completed ? '✔ ' : ''}${course.subject} ${course.number}: ${course.title}</h3>
      <p><strong>Credits:</strong> ${course.credits}</p>
      <p><strong>Description:</strong> ${course.description}</p>
      <p><strong>Technologies:</strong> ${course.technology.join(', ')}</p>
    `;

    courseContainer.appendChild(div);
  });

  totalCreditsSpan.textContent = totalCredits;
}

//initial load
displayCourses(courses);

//Filter button
allBtn.addEventListener('click', () => displayCourses(courses));
cseBtn.addEventListener('click', () => {
  const filtered = courses.filter(course => course.subject === 'CSE');
  displayCourses(filtered);
});
wddBtn.addEventListener('click', () => {
  const filtered = courses.filter(course => course.subject === 'WDD');
  displayCourses(filtered);
});
