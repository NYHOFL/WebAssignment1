const xhr = new XMLHttpRequest()


window.onload = loadJson = () => {
    xhr.open('GET', 'assets/json/sedaninfo.json', true)
    xhr.onload = () => {
        if(xhr.status === 200) {
            let text = "<table><th>Preview:</th><th>Car Model:   </th><th>Cost in NZD:   </th><th>Output in HP:   </th><th>Product Review   </th></tr><tbody>";
            const sedaninfo = JSON.parse(xhr.responseText)
            sedaninfo.forEach(p => {
                const {image, modelName, mssrp, horsePower} = p
                text += `<tr><td><img src= "${p["image"]}"></td>`
                text += `<td>${p.modelName}`
                text += `<td>${p.mssrp}`
                text += `<td>${p.horsePower}`
                text += `<td><form class="rating" id="product1">
                <button type="submit" class="star" data-star="1">
                    &#9733;
                    <span class="screen-reader">1 Star</span>
                </button>
            
                <button type="submit" class="star" data-star="2">
                    &#9733;
                    <span class="screen-reader">2 Stars</span>
                </button>
            
                <button type="submit" class="star" data-star="3">
                    &#9733;
                    <span class="screen-reader">3 Stars</span>
                </button>
            
                <button type="submit" class="star" data-star="4">
                    &#9733;
                    <span class="screen-reader">4 Stars</span>
                </button>
            
                <button type="submit" class="star" data-star="5">
                    &#9733;
                    <span class="screen-reader">5 Stars</span>
                </button>
            </form></td>`
                
            })
            text += "</tbody></table>"
            document.getElementById("review-table").innerHTML += text;
        
    
        } else if (xhr.status === 404) {
            console.log('error 404 file not found')
        }
    }
    xhr.send()
    document.getElementById('comment-data').addEventListener('click', addComment)
    
}

/* The resource that helped me tweak this for my own use: https://gomakethings.com/setting-a-star-rating-on-click-or-enter-with-vanilla-js/#highlighting-our-selected-star */

// Listen for form submissions
document.addEventListener('submit', function (event) {

	// Only run our code on .rating forms
	if (!event.target.matches('.rating')) return;

	// Prevent form from submitting
	event.preventDefault();

	// Get the selected star
	var selected = document.activeElement;
	if (!selected) return;
	var selectedIndex = parseInt(selected.getAttribute('data-star'), 10);

	var stars = Array.from(event.target.querySelectorAll('.star'));

	// Loop through each star, and add or remove the `.selected` class to toggle highlighting
	stars.forEach(function (star, index) {
		if (index < selectedIndex) {
			// Selected star or before it
			// Add highlighting
			star.classList.add('selected');
		} else {
			// After selected star
			// Remove highlight
			star.classList.remove('selected');
		}
	});

}, false);



  const addComment = () => {  
    var node = document.createElement("LI");   
    var textnode = document.createElement('p')
    const commentVal = document.getElementById('comment-input').value
    const nameVal = document.getElementById('name-input').value
    
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    textnode.innerHTML = `${nameVal}: ${commentVal} Posted: ${dateTime}`
    node.appendChild(textnode); 
    document.getElementById("commentdivs").appendChild(node);
  }
