
const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Declaring the array of image filenames */
let filenames = ['images/pic1.jpg','images/pic2.jpg','images/pic3.jpg','images/pic4.jpg','images/pic5.jpg'];
/* Declaring, the alternative text for each image file */
let alt_filenames = ['Closeup of a human eye','Colorful Stone','Purple flowers','Ancient Egypt painting','Butterfly in sunlight'];

/* Looping through images */
for(let i = 0; i < filenames.length; i++){
    const newImage = document.createElement('img');
    newImage.setAttribute('src', filenames[i]);
    newImage.setAttribute('alt', alt_filenames[i]);
    thumbBar.appendChild(newImage);
    // click event listener to the new image
    newImage.addEventListener('click', function() {
        // Update the displayed image's src and alt attributes
        displayedImage.setAttribute('src', filenames[i]);
        displayedImage.setAttribute('alt', alt_filenames[i]);
    });
}

/* Wiring up the Darken/Lighten button */
