const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-title").value.trim();
  const content = document.querySelector("#post-desc").value.trim();

  if (title && content) {
    console.log(title, content);
    const response = await fetch(`/api/posts`, {
      method: "POST",
      body: JSON.stringify({ title: title, content: content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      window.location.reload();
    } else {
      alert("Failed to create post");
    }
  }
};

const delButtonHandler = async (event) => {
  const id = event.target.getAttribute("data-id");
  const response = await fetch(`/api/posts/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    window.location.reload();
  } else {
    alert("Failed to delete project");
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

const deleteButton = document.querySelector(".post-list");

if (deleteButton) {
  deleteButton.addEventListener("click", delButtonHandler);
}
