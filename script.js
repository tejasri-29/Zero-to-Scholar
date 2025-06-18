const topicInput = document.getElementById("topicInput");
const container = document.getElementById("planContainer");

function generatePrompt(topic) {
  const prompts = [
    `Watch a short video explaining the basics of ${topic}.`,
    `Read an article about a beginner concept in ${topic}.`,
    `Write down 5 key points you learned about ${topic}.`,
    `Find a quiz related to ${topic} and try it.`,
    `Teach someone what you learned today about ${topic}.`,
    `Explore real-life applications of ${topic}.`,
    `Create a mind map for a topic in ${topic}.`,
    `Look up a famous expert in ${topic} and read about them.`,
    `Draw a diagram or flowchart explaining a process in ${topic}.`,
    `Summarize today's learning in a tweet (280 characters!).`
  ];
  return prompts[Math.floor(Math.random() * prompts.length)];
}

function generatePath() {
  const topic = topicInput.value.trim();
  if (!topic) return alert("Please enter a topic!");

  const plan = [];
  for (let day = 1; day <= 30; day++) {
    plan.push({ day, text: generatePrompt(topic), completed: false });
  }
  localStorage.setItem("learningPlan", JSON.stringify(plan));
  renderPlan(plan);
}

function renderPlan(plan) {
  container.innerHTML = "";
  plan.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "day-item" + (item.completed ? " completed" : "");
    div.innerHTML = `
      <span>Day ${item.day}: ${item.text}</span>
      <button class="toggle-btn" onclick="toggleComplete(${index})">
        ${item.completed ? "Undo" : "Done"}
      </button>
    `;
    container.appendChild(div);
  });
}

function toggleComplete(index) {
  const plan = JSON.parse(localStorage.getItem("learningPlan")) || [];
  plan[index].completed = !plan[index].completed;
  localStorage.setItem("learningPlan", JSON.stringify(plan));
  renderPlan(plan);
}

function resetPlan() {
  localStorage.removeItem("learningPlan");
  container.innerHTML = "<p>Plan reset. Enter a new topic to generate a fresh plan.</p>";
}

function exportPlan() {
  const plan = JSON.parse(localStorage.getItem("learningPlan")) || [];
  if (plan.length === 0) return alert("No plan to export!");
  const lines = plan.map((p) => `Day ${p.day}: ${p.text}`);
  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "learning_plan.txt";
  link.click();
}

// Load saved plan on start
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem("learningPlan"));
  if (saved) renderPlan(saved);
};

// Theme toggle
document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});
