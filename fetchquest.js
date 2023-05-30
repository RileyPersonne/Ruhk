// JavaScript Document
// use fetch to retrieve the products and pass them to init
// report any errors that occur in the fetch operation
// once the products have been successfully loaded and formatted as a JSON object
// using response.json(), run the initialize() function
fetch('menu.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => initialize(json))
    .catch(err => console.error(`Fetch problem: ${err.message}`));

// sets up the app logic, declares required variables, contains all the other functions
let main = 0
let category = 0
function initialize(products) {
    // grab the UI elements that we need to manipulate
    const category = document.querySelector('#category');
    const main = document.querySelector('main');

    // keep a record of what the last category and search term entered were
    let lastCategory = category.value;

    // these contain the results of filtering by category, and search term
    // finalGroup will contain the products that need to be displayed after
    // the searching has been done. Each will be an array containing objects.
    // Each object will represent a product
    let categoryGroup;
    let finalGroup;

    // To start with, set finalGroup to equal the entire products database
    // then run updateDisplay(), so ALL products are displayed initially.
    finalGroup = products;
    updateDisplay();

    // Set both to equal an empty array, in time for searches to be run
    categoryGroup = [];
    finalGroup = [];

    // Once we have the final group, update the display
    updateDisplay();
}

// start the process of updating the display with the new set of products
function updateDisplay() {
    // remove the previous contents of the <main> element
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }

// fetchBlob uses fetch to retrieve the image for that product, and then sends the
// resulting image display URL and product object on to showProduct() to finally
// display it
function fetchBlob(product) {
    // construct the URL path to the image file from the product.image property
    const url = `images/${product.image}`;
    // Use fetch to fetch the image, and convert the resulting response to a blob
    // Again, if any errors occur we report them in the console.
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.blob();
        })
        .then(blob => showProduct(blob, product))
        .catch(err => console.error(`Fetch problem: ${err.message}`));
}

// Display a product inside the <main> element
function showProduct(blob, product) {
    // Convert the blob to an object URL — this is basically an temporary internal URL
    // that points to an object stored inside the browser
    const objectURL = URL.createObjectURL(blob);
    // create <section>, <h2>, <p>, and <img> elements
    const section = document.createElement('article');
    section.classList.add('productInfo');
    const image = document.createElement('img');
    const para = document.createElement('p');
    para.classList.add('price');
    const heading = document.createElement('p');
    heading.classList.add('productContent');



    // give the <section> a classname equal to the product "type" property so it will display the correct icon
    section.setAttribute('class', product.type);

    // Give the <h2> textContent equal to the product "name" property, but with the first character
    // replaced with the uppercase version of the first character
    heading.textContent = product.name.replace(product.name.charAt(0), product.name.charAt(0).toUpperCase());

    // Give the <p> textContent equal to the product "price" property, with a $ sign in front
    // toFixed(2) is used to fix the price at 2 decimal places, so for example 1.40 is displayed
    // as 1.40, not 1.4.
    para.textContent = `$${product.price.toFixed(2)}`;

    // Set the src of the <img> element to the ObjectURL, and the alt to the product "name" property
    image.src = objectURL;
    image.alt = product.name;

    // append the elements to the DOM as appropriate, to add the product to the UI
    main.appendChild(section);
    section.appendChild(heading);
    section.appendChild(para);
    section.appendChild(image);
}
}