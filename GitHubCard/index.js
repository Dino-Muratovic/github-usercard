/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

axios.get('https://api.github.com/users/Dino-Muratovic')
//Promise one -- fetching data from the link above github
.then(response =>{
  //if the data runs properly console the whole data piece
  // console.log(`this is response `, response);

  //append here instead of the bottom of the page
  //call the function inside () and pass in the data you need
  cardsContainer.append(personCard(response.data));  
})

//Promise two -- if there's an existing error
.catch(error => {
  //if data was not sucessfully fetched. Show an error printed below
  console.log(`This data was not found:`, error);
})

axios.get('https://api.github.com/users/Dino-Muratovic/followers')
.then(response => {
  // cardsContainer.append(personCard(response.data));
  console.log(`this is 1st axio response `, response);
  response.data.forEach(function(item){
    // console.log(`this is the item`, item);
    // console.log(`This is location `, item.location);

// another axios inside the axios -- accessing the api again    
axios.get(`https://api.github.com/users/${item.login}`)
  .then(res => {
    console.log(`this is 2nd axio response`, res)
    cardsContainer.append(personCard(res.data));
  })
  .catch(error => {
    //if data was not sucessfully fetched. Show an error printed below
    console.log(`This data was not found:`, error);
  })     
    

  })

})
.catch(error => {
  //if data was not sucessfully fetched. Show an error printed below
  console.log(`This data was not found:`, error);
})

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
create a new component and add it to the DOM as a child of .cards
*/





/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = [];
// console.log(followersArray);

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">

  <img src={image url of user} />

  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>

    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>

    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>

</div>
*/

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

function personCard(person){

  //create all the elements, define them and add classes if needed
  const card = document.createElement('div');
  card.classList.add('card');
  

  const image = document.createElement('img');
  //image does not have a class
  image.src = person.avatar_url;

  const info = document.createElement('div');
  info.classList.add('card-info');
    

  const name = document.createElement('h3');
  name.classList.add('name');
  name.textContent = person.name;

  const username = document.createElement('p');
  username.classList.add('username');
  username.textContent = person.login;

  const location = document.createElement('p');
  //location does not have any class
  location.textContent = `Location: ${person.location}`;

  const profile = document.createElement('p'); 
  //profile does not have any class
  profile.textContent = `Github profile: `;
  

  const githubLink = document.createElement('a');
  // githubLink does not have any class BUT NEEDS src link
  githubLink.textContent = person.html_url;

  const followers = document.createElement('p');
  //follower does not have any class
  followers.textContent =`Followers: ${person.followers_url.length}`;
    

  const following = document.createElement('p');
  //following does not have any class
  following.textContent = `Following: ${person.following_url.length}`;

  const bio = document.createElement('p');
  //bio does not have any class
  bio.textContent = person.bio;

  //------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // appending to card here
  card.append(image, info);

  // appending to cardInfo here
  info.append(name, username, location, profile, followers, following, bio);

  //appending to profile
  profile.append(githubLink);

  return card;
}

// create and define the parent element thas is going to hold the cards you create
const cardsContainer = document.querySelector('.cards');




