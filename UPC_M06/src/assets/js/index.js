
document.addEventListener("DOMContentLoaded", function () {
    // console.log(window.location.pathname)
    if (window.location.pathname == '/~DAWUPC2201/upc-m06/home' || window.location.pathname == '/~DAWUPC2201/upc-m06/') {
        document.addEventListener("mousemove", function (e) {
            var width = window.innerWidth,
                height = window.innerHeight,
                positionX = (e.clientX / width) - 0.55,
                positionY = (e.clientY / height) - 0.55;

            gsap.to(".image_box img", {
                rotationY: positionX * 90,
                rotationX: positionY * 90,
                ease: "none"
            });
        })
    }
    
    if (window.location.pathname == '/~DAWUPC2201/upc-m06/ranking_results'){
        gsap.to('#img-titulo', {
            duration: 2.5,
            ease: "power2.out",
            x: 300
        });
    }
   
});