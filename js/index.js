githubForm = document.querySelector("#github-form");
searchInput = document.querySelector("#search");
userList = document.querySelector("#user-list");
repositoryList = document.querySelector("#repos-list");
submitbtn = document.querySelector("#submit");

async function getGithubData(username) {
  let response = await fetch(`https://api.github.com/search/users?q=${username}`);
  let data = await response.json();

  if (data.items && data.items.length > 0) {
    // Clearing the previous search results
    userList.innerHTML = "";

    data.items.forEach((user) => {
      // Creating a list item for each user
      let listItem = document.createElement("li");
      listItem.style.textAlign="center";
      listItem.style.fontSize="30px ";
      listItem.style.fontWeight="600";
      listItem.style.padding="40px";
      // Creating  an anchor element to represent the username
      let userLink = document.createElement("a");
      userLink.href = user.html_url;
      userLink.target = "_blank";
      userLink.textContent = user.login;

      // Creating an image element for the user's avatar
      let avatarImg = document.createElement("img");
      avatarImg.src = user.avatar_url;
      avatarImg.style.width = "150px";
      avatarImg.style.height = "150px";
      avatarImg.style.display = "block";
      avatarImg.style.borderRadius = "50%"; 
      
      // Appending the username and avatar to the list item
      listItem.appendChild(userLink);
      listItem.appendChild(avatarImg);

      // Appending the list item to the user list
      userList.appendChild(listItem);
    });
  } else {
    userList.innerHTML = "No users found.";
  }
}

function handleFormSubmit(event) {
  event.preventDefault();
  let name = searchInput.value;
  if (name) {
    getGithubData(name);
  } else {
    userList.innerHTML = "Please enter a name to search.";
  }
}

githubForm.addEventListener("submit", handleFormSubmit);

// styling the submit button 
submitbtn.style.backgroundColor = "red";
submitbtn.style.width = "150px";
submitbtn.style.height = "30px";
submitbtn.style.display = "flex";
submitbtn.style.marginTop = "30px";
submitbtn.style.marginLeft = "30px";


