<div id="top"></div>

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]

![html-badge]
![python-badge]
![django-badge]
![javascript-badge]
![material-badge]
![redux-badge]
![postgresql-badge]

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/francinv/schmell-admin-panel/">
    <img src="docs/img/assetlogo.png" alt="Logo" width="200" height="80">
  </a>

<h3 align="center">Schmell Admin Panel</h3>

  <p align="center">
    This is an admin-panel. The panel will be used to administer a mobile application. 
    <br />
    <a href="https://github.com/francinv/schmell-admin-panel/wiki"><strong>Explore the docs »</strong> (the wiki is not complete) </a>
    <br />
    <br />
    <a href="https://www.figma.com/proto/JRefmkvvkehRxD8ErPDeIx/Admin-Web-APP?node-id=4%3A80&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=4%3A80">View Demo</a>
    ·
    <a href="https://github.com/francinv/schmell-admin-panel/issues">Report Bug</a>
    ·
    <a href="https://github.com/francinv/schmell-admin-panel/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://www.figma.com/proto/JRefmkvvkehRxD8ErPDeIx/Admin-Web-APP?node-id=4%3A80&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=4%3A80)

### Built With

* [React.js](https://reactjs.org/)
* [Django](https://www.djangoproject.com/)
* [Material UI](https://mui.com/)

<p align="right">(<a href="#top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Here you will get information about how you can run the app both locally and remote. The app is deployed on heroku now: [https://schmell-dev.up.railway.app/](https://schmell-dev.up.railway.app/). 

### Prerequisites

This is what you need before you start to install the app.
* npm
  ```sh
  npm install npm@latest -g
  ```
* django
  ```sh
  pip install django
  ```


### Installation

**Clone the repo**
* Clone the repo
   ```sh
   git clone https://github.com/francinv/schmell-admin-panel.git
   ```
#### Run server
1. go into server directory
    ```sh
    cd server
    ```
2. launch shell
  ```sh
  pipenv shell
  ```
5. install requirements
    ```sh
    pipenv install
    ```
3. run server
    ```sh
    python manage.py runserver
    ```

**The server should now be running, and the latest compiled version will be displayed when accessing the port.**

<p align="right">(<a href="#top">back to top</a>)</p>


<!-- USAGE EXAMPLES -->
## Usage

You will find examples of how you can use the application and some screenshots in the wiki. I recommend using the figma prototype for better understanding of the app. I will set-up a demo app in the near future. The app we are using right now is deployed to heroku. 

_I recommend to use Figma to see how the app should work and examples [Prototype](https://www.figma.com/proto/JRefmkvvkehRxD8ErPDeIx/Admin-Web-APP?node-id=4%3A80&scaling=min-zoom&page-id=0%3A1&starting-point-node-id=4%3A80)_

<a href="https://github.com/francinv/schmell-admin-panel/wiki"><strong>Explore the wiki »</strong> (the wiki is not complete) </a>
<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap
This section will show the ongoing issues and issues that must be completed for the application to be ready for production (v1.0.1).

- [ ] API Key Authentication
- [ ] Background tasks
- [ ] Settings page

**I am aiming to release the first version: v1.0.1 soon.** 

See the [open issues](https://github.com/francinv/schmell-admin-panel/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License][cc-by-nc-sa]. See `LICENSE` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Francin Vincent - [@francinvincent](https://www.facebook.com/francinvincent/) - francin.vinc@gmail.com

Project Link: [https://github.com/francinv/schmell-admin-panel/](https://github.com/francinv/schmell-admin-panel/)

<p align="right">(<a href="#top">back to top</a>)</p>



[product-screenshot]: docs/img/schmelladmin.png
[cc-by-nc-sa]: http://creativecommons.org/licenses/by-nc-sa/4.0/
[cc-by-nc-sa-image]: https://licensebuttons.net/l/by-nc-sa/4.0/88x31.png
[cc-by-nc-sa-shield]: https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg
[html-badge]: https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white
[python-badge]: https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white
[django-badge]:https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white
[javascript-badge]: https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black
[material-badge]: https://img.shields.io/badge/Material--UI-0081CB?style=for-the-badge&logo=material-ui&logoColor=white
[redux-badge]: https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white
[postgresql-badge]: https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white
