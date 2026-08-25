"use strict";

/*
 * This app.js file loads the list of available modules and displays the entry point user interface.
 * It is also an example for the app.js file for the website layout template.
 */

// import the additional stylesheet
import styles from '../stylesheets/modules-list.css' with { type: 'css' };
document.adoptedStyleSheets.push(styles);

// get content from modules.json to load user interface dynamically
fetch('modules.json', {method: 'GET'})
	// check if the response was successful and return content of the response body
	.then(response => (response.ok)? response.json() : Promise.reject(`HTTP error! status: ${response.status}`))
	// evaluate the content of modules.json
	.then((data) => {
		const DomContainer = document.querySelector('main');
		data.forEach((item) => {
			// parse all entries and create reference DOM entry
			if(!item.enabled || !item.type)
				return
			// add all entries to the Dom container by their type
			switch(item.type) {
				// h1 header to group the modules
				case 'heading':
					DomContainer.appendChild(Object.assign(document.createElement('h1'), {
						innerHTML: item.name,
					}));
					break;
				// references to the modules with icons
				case 'module':
					const link = Object.assign(document.createElement('a'), {
						innerHTML: item.name,
						href: (item.path.endsWith('/'))?item.path:`${item.path}/`,
					});
					const header = document.createElement('h2');
					const img = Object.assign(document.createElement('img'), {
						src: Object.hasOwn(item, 'icon')?item.icon:"",
						alt: "",
					});
					// assemble DOM Entry
					if(Object.hasOwn(item, 'icon')) // add icon if specified
						header.appendChild(img);
					header.appendChild(link);
					DomContainer.appendChild(header);
					break;
				default:
					console.warn(`Unknown type "${item.type}" in modules.json`);
			}
		});
	})
	.catch(console.error);
