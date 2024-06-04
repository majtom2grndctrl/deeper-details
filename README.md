# Deeper Details
`deeper-details` is a web component built using the Lit library. It provides an expandable/collapsible section of content, allowing users to toggle visibility with custom buttons. This component is designed to be easily integrated into any web project.

## Features
* Expand and collapse content with a toggle button.
* Customizable button labels and styles.
* Smooth transition animations.
* Built with Lit, ensuring high performance and ease of use.

## Installation
You can install deeper-details via npm or yarn.

```sh
npm install deeper-details
```

or

```sh
yarn add deeper-details
```

## Usage
First, import the component in your JavaScript or TypeScript file:

```javascript
import 'deeper-details';
```

Then, use the component in your HTML:

```html
<deeper-details
  expandButtonLabel="Show more"
  closeButtonLabel="Show less">
  <button slot="toggler-button">Show more</button>
  <div>Content to be toggled</div>
  <button slot="close-button">Show less</button>
</deeper-details>
```


### Properties
* `expandButtonLabel`: The label for the expand button. Default is "Show more".
* `closeButtonLabel`: The label for the close button. Default is "Show less".

### Slots
toggler-button: Slot for the button that toggles the content visibility.
close-button: Slot for the button that hides the content.

### Development
To start developing with deeper-details, clone the repository and install the dependencies:

```sh
git clone https://github.com/your-username/deeper-details.git
cd deeper-details
yarn install
```

### Scripts
* `dev`: Start the development server using Vite.
* `build`: Compile TypeScript and bundle the project using Vite.
* `preview`: Preview the built project using Vite.

You can run these scripts using:

```sh
yarn dev
yarn build
yarn preview
```

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

## Author
Dan Hiester

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.
