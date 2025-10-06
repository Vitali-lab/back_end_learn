console.log("hello world");

async function addNote() {
  await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: "New note" }),
  });
}

document.addEventListener("click", (e) => {
  if (e.target.dataset.type === "remove") {
    removeNote(e.target.dataset.id).then(() => {
      e.target.closest("li").remove();
    });
  }
});

async function removeNote(id) {
  await fetch(`/${id}`, {
    method: "DELETE",
  });
}

document.addEventListener("click", async (e) => {
  if (e.target.dataset.type === "edit") {
    const newContent = prompt("Enter new content");
    editNote(e.target.dataset.id, newContent).then(() => {
      e.target.closest("li").querySelector("span").textContent = newContent;
    });
  }
});

async function editNote(id, newContent) {
  await fetch(`/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newContent }),
  });
}
