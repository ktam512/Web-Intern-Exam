### Start with ChatGPT
- I entered this prompt into ChatGPT:
"Create an interactive image gallery with HTML, CSS, and JavaScript.
Requirement:
- Display a grid of shrunk images
- Clicking on a shrunk image will open a web modal that displays the full-size image
- The modal will have "previous" and "next" buttons to navigate to other images in the grid
- Each time the user hovers the mouse over a single shrunk image, blur all other shrunk image
About the Code:
- Use a CSS grid for the layout of the shrunk image
- Use JS to handle the modal
- Use media query of CSS to handle the blurring
Note: 
- "Shrunk" image here means that the image is displayed at a particular size (not their full size)"
- It returns 3 file that mostly do the work. Three problem: The "previous" button in the modal appeared at the center of the webpage. When hover over an image, only images at its right side got blurred. Finally, the size of the "shrunk" image is not the same. To make it simple, I demand for all of them to be squared-size.
- After tailoring its CSS for my liking, we're done.
