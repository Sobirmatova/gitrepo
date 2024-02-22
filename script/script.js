// Function to get elements
const elem = (x) => document.querySelector(x);

// Menu function
const menu_btn = elem(".menu_btn");
const menu = elem("#menu");
const styleElem = document.head.appendChild(document.createElement("style"));

const toggleMenu = () => {
  const isOpen = menu_btn.innerHTML.includes("fa-bars");
  
  menu_btn.innerHTML = `<p onclick="toggleMenu()"><i class="fa ${isOpen ? 'fa-times' : 'fa-bars'}"></i></p>`;
  
  styleElem.innerHTML = `
    @media (max-width: 800px) {
      .menu_box {
        display: ${isOpen ? 'none' : 'block'};
        background-color: var(--Dark-Violet);
        margin-top: 2rem;
        padding: 2rem;
        border-radius: 10px;
        position: absolute;
        top: 10%;
        left: 8%;
        width: 85%;
        text-align: center;
        z-index: 20000;
      }
    }
    @media (max-width: 375px) {
      .menu_box {
        display: ${isOpen ? 'none' : 'block'};
        background-color: var(--Dark-Violet);
        margin-top: 2rem;
        padding: 2rem;
        border-radius: 10px;
        position: absolute;
        top: 10%;
        left: 8%;
        width: 85%;
        text-align: center;
        z-index: 20000;
      }
    }
  `;
};

// Shortening function
const result_part = elem("#result_part");
let count = 0; // To give each copy button a value so that it can be clickable itself;

const shortenUrl = () => {
  const url_input = elem("#url");

  if (url_input.value !== "") {
    styleElem.innerHTML = `
      input {
        border: none;
      }
      input::placeholder {
        color: var(--Grayish-Violet);
      }
      .error_text {
        display: none;
        color: var(--Red);
        position: absolute;
        top: 73%;
        left: 4%;
      }
      @media (max-width: 800px) {
        .error_text {
          display: none;
          color: var(--Red);
          position: absolute;
          top: 60%;
          left: 4%;
        }
      }
      @media (max-width: 375px) {
        .error_text {
          display: none;
          color: var(--Red);
          position: absolute;
          top: 60%;
          left: 4%;
        }
      }
    `;

    // Fetching the API results
    const api = `https://api.shrtco.de/v2/shorten?url=${url_input.value}`;

    fetch(api)
      .then(res => res.json())
      .then(data => {
        if (data.ok === true) {
          result_part.innerHTML += `
            <div class="results">
              <div>
                <p>${url_input.value}</p>
              </div>
              <div>
                <p class="shortened_url">${data.result.full_short_link3}</p>
                <button class="btn copy_btn" onclick="copy(${count++})">Copy</button>
              </div>
            </div>
          `;
        } else {
          if (data.error_code === 2) {
            result_part.innerHTML += `
              <div class="results" style="background-color: var(--Red)">
                <p style="color: black; text-align: center;">Invalid URL, Please try again!</p>
              </div>
            `;
          }
        }
      });
  } else {
    styleElem.innerHTML = `
      input {
        border: 2px solid var(--Red);
      }
      input::placeholder {
        color: var(--Red);
      }
      .error_text {
        display: block;
        color: var(--Red);
        position: absolute;
        top: 73%;
        left: 4%;
      }
      @media (max-width: 800px) {
        .error_text {
          display: block;
          color: var(--Red);
          position: absolute;
          top: 45%;
          left: 3%;
        }
      }
      @media (max-width: 375px) {
        .error_text {
          display: block;
          color: var(--Red);
          position: absolute;
          top: 40%;
          left: 6%;
        }
      }
    `;
  }
};

// Copy function for each button clicked
const copy = (i) => {
  const copy_btn = document.querySelectorAll(".copy_btn");
  const shortened_url = document.querySelectorAll(".shortened_url");

  navigator.clipboard.writeText(shortened_url[i].textContent);

  copy_btn[i].innerText = "Copied!";
  copy_btn[i].style.background = "var(--Dark-Violet)";
};
