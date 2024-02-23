const Navi = () => {
  return `
  <nav>
    <div class="nav">
      <div class="nav-left">
        <div class="nav-bd">
          <i class="fas fa-bars"></i>
        </div>
        <div class="nav-search">
          <input type="text" placeholder="Search for anything" />
        </div>
      </div>
      <div class="nav-right">
        <div class="nav-icons">
          <a href="#!" class="nav-icon">
            <ion-icon
              name="settings-outline"
              role="img"
              class="md hydrated"
            ></ion-icon>
          </a>
          <a href="#!" class="nav-icon">
            <ion-icon
              name="cube-outline"
              role="img"
              class="md hydrated"
            ></ion-icon>
          </a>
          <a href="#!" class="nav-icon">
            <ion-icon
              name="planet-outline"
              role="img"
              class="md hydrated"
            ></ion-icon>
          </a>
          <a href="#!" class="nav-icon">
            <ion-icon
              name="notifications-outline"
              role="img"
              class="md hydrated"
            ></ion-icon>
          </a>
          <a href="#!" class="nav-icon">
            <div class="img">
              <img
                src="https://i1.sndcdn.com/artworks-CObf3MDw5P89zaeg-flzN8g-t500x500.jpg"
                alt=""
              />
            </div>
          </a>
        </div>
      </div>
    </div>
  </nav>
  `;
};

export default Navi;
