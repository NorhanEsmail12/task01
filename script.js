let div = document.getElementById("usernames");
async function feachUser(){
    let users = await (await fetch("https://jsonplaceholder.typicode.com/users")).json();
    return users;
}
function displayAllUser(){
feachUser().then(users => {
    users.forEach(element => {
        let userNameElement = document.createElement("button");
        userNameElement.classList.add("user");
        userNameElement.textContent = element.username;
        div.appendChild(userNameElement); 
    });
    if (users.length > 0) {
        displayAllPosts(1);
      }

    }).catch(()=>{
        console.log('error when user name fatch');
    })
}
displayAllUser();

async function feachpost(userId){
    let posts = await (await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)).json();
    return posts;
}
// console.log(feachpost(1));

async function displayAllPosts(index){
    let contanirer = document.getElementById("mainContant");
    contanirer.innerHTML='';
    let userId = index;
    try{
        let posts = await feachpost(userId);
        posts.forEach(post =>{
            let Title = document.createElement('p');
            Title.textContent = post.title;
            // console.log(Title);
            contanirer.appendChild(Title);
        })
    }catch(e){
        console.log('error when user post fatch');
    }
}
// console.log(displayAllPosts(1));
  
  document.getElementById('usernames').addEventListener('click', async (event) => {
    if (event.target.classList.contains('user')) {
      const userButton = event.target;
  
      document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
      });
  
      userButton.classList.add('active');
  

      const userId = Array.from(userButton.parentNode.children).indexOf(userButton) + 1;
  
      await displayAllPosts(userId);
    }

    
  });