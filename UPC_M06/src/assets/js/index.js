
document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener("mousemove", function (e) {
        var width = window.innerWidth,
            height = window.innerHeight,
            positionX = (e.clientX / width) - 0.55,
            positionY = (e.clientY / height) - 0.55;
    
        // gsap.to(".image_box img", {
        //     rotationY: positionX * 90,
        //     rotationX: positionY * 90,
        //     ease: "none"
        // })
    })
});