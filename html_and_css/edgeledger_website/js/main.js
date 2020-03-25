var map;

function initMap() {
  const loc = {
    lat: 63.413820,
    lng: 10.416650
  };

  map = new google.maps.Map(document.querySelector('.map'), {
    zoom: 14,
    center: loc
  });

  const marker = new google.maps.Marker({
      position: loc,
      map: map
  });
}

// Sticky menu background
window.addEventListener('scroll', function() {
  if (window.scrollY > 150) {
    this.document.querySelector('#navbar').style.opacity = 0.75;
  } else {
    this.document.querySelector('#navbar').style.opacity = 1.0;
  }
});

// Smooth Scrolling
$('#navbar a, .btn').on('click', function(event) {
  if (this.hash !== '') {
    event.preventDefault();

    const hash = this.hash;

    $('html, body').animate(
      {
        scrollTop: $(hash).offset().top - 60.9943
      },
      800
    );
  }
});