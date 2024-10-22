import { gsap } from "gsap";
import SplitType from "split-type";

import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// navbar burger toggle mobile version -------------------------------------------

const navbarBurger = () => {
  const menuBurger = document.querySelector(".burger");
  const nav = document.querySelector(".menu-navbar");
  const links = nav.querySelectorAll(".menu-navbar li a");

  let menuStatus = false;

  const menuTLOpen = gsap.timeline({
    default: { duration: 0.5, ease: "power4.inOut" },
  });

  menuTLOpen.to(".menu-navbar", {
    scaleY: 1,
    stagger: 0.5,
  });

  menuTLOpen.to(".line1", { rotateZ: "35deg" }, "<");
  menuTLOpen.to(".line3", { rotateZ: "-35deg", y: "-10px" }, "<");
  menuTLOpen.to(".line2", { opacity: 0, onComplete: fadeIn }, "<");

  function fadeIn() {
    menuTLOpen.to(".menu-navbar li", { opacity: 1, duration: 0.5 });
  }

  menuTLOpen.paused(true);

  menuBurger.addEventListener("click", () => {
    if (!menuStatus) {
      menuTLOpen.play();
      menuStatus = true;
    } else {
      menuTLOpen.reverse();
      menuStatus = false;
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      if (!menuStatus) {
        menuTLOpen.play();
        menuStatus = true;
      } else {
        menuTLOpen.reverse();
        menuStatus = false;
      }
    });
  });
};

// smooth scrool -------------------------------------------

const smoothScroolSnap = () => {
  // smooth scrool ---------------------------------------------------

  const container = document.querySelector(".main-content");
  const items = document.querySelectorAll("section");

  container.addEventListener("wheel", (event) => {
    event.preventDefault();
    const delta = event.deltaY;

    container.scrollBy({
      top: delta,
      behavior: "smooth",
    });
  });
};

document.addEventListener("DOMContentLoaded", () => {
  navbarBurger();
  smoothScroolSnap();
});

// matchmedia responsive --------------------------------------------------

const matchMediaResponsive = gsap.matchMedia();

matchMediaResponsive.add(
  {
    isDesktop: "(min-width: 1025px)",
    isMobile: "(max-width: 1024px)",
  },
  (context) => {
    console.log(context.conditions);
    const { isDesktop, isMobile } = context.conditions;

    smoothScroolSnap();

    // home opening animation ---------------------------------------------------------------

    const tl = gsap.timeline({
      defaults: { duration: 0.75, ease: "power4.inOut" },
    });

    if (isDesktop) {
      tl.to(".main-home h1", {
        y: 0,
        opacity: 1,
        duration: 1.5,
      })
        .to(".sub-title-mask p", { y: 0, opacity: 1, duration: 2.5 }, "<")

        .to(
          ".main-home button",
          { scale: 1, ease: "bounce.out", duration: 2, delay: 0.5 },
          "<"
        )
        .to(
          ".logo-navbar",
          {
            x: "0%",
            duration: 2,
            opacity: 1,
          },
          "<"
        );

      tl.to(".menu-navbar li", { y: 0, stagger: 0.2, duration: 2 }, "<");
    } else {
      gsap.set(".logo-navbar", {
        opacity: 1,
        x: "0%",
      });

      gsap.set(".background-video", {
        height: "100vh",
        top: 0,
        bottom: 0,
        scaleX: 1,
      });
      gsap.set(".main-home h1", {
        y: 0,
        opacity: 1,
      });
      gsap.set(".main-home p", {
        y: 0,
        opacity: 1,
      });
      gsap.set(".main-home button ", {
        scale: 1,
      });
      gsap.set(".menu-navbar li", {
        y: 0,
      });
    }

    // Description sections -----------------------------------------

    const tlMottoSections = gsap.timeline({
      scrollTrigger: {
        trigger: "#motto",
        scroller: ".main-content",
        start: "center 55%",

        // the 4 states of toggle actions

        // onEnter - this actions happens when you scrool into specific sections or element for the first time. scroolling down
        // onLeave - this actions happens when you scrool out of a specific sections or element for the frist time. scrooling down
        // onEnterBack - this actions happens when you scrool back into a specific sections or element for the first time.  scrooling up
        // onLeaveBack - this actions happens when you scrool back out of a specific sections or elemetn for the first time . scrolling up
        // value: "play", "resume", "reset", "restart", complete, "reverse", and "none"

        toggleActions: "play complete none none",

        // markers: true,
      },
      default: { ease: "power3.out", duration: 2 },
    });

    tlMottoSections
      .from(".grid-2-main-title", {
        duration: 1,
        opacity: isMobile ? 1 : 0.5,
      })
      .from(
        ".grid-2-discount h1",
        {
          y: isMobile ? 0 : "100%",
          stagger: 0.5,
          duration: 1,
          opacity: isMobile ? 1 : 0,
        },
        "<"
      )
      .from(
        ".grid-2-discount p",
        {
          y: isMobile ? 0 : "40%",
          opacity: isMobile ? 1 : 0,
          duration: 1.5,
        },
        "<"
      )
      .from(
        ".grid-1-main-title h1",
        {
          y: isMobile ? 0 : "40%",
          opacity: isMobile ? 1 : 0,
          duration: 1.5,
        },
        "<"
      )
      .from(
        ".grid-1-main-title p",
        {
          y: isMobile ? 0 : "50%",
          opacity: isMobile ? 1 : 0,
          duration: 1.2,
        },
        "<"
      )
      .from(
        ".line-discount",
        {
          width: isMobile ? "100%" : "0%",
          duration: 1.5,
          opacity: isMobile ? 1 : 0,
          delay: 1,
        },
        "<"
      );

    // service sections -----------------------------------------

    const tlService = gsap.timeline({
      scrollTrigger: {
        trigger: "#service1",
        scroller: ".main-content",
        start: "center 55%",

        // the 4 states of toggle actions

        // onEnter - this actions happens when you scrool into specific sections or element for the first time. scroolling down
        // onLeave - this actions happens when you scrool out of a specific sections or element for the frist time. scrooling down
        // onEnterBack - this actions happens when you scrool back into a specific sections or element for the first time.  scrooling up
        // onLeaveBack - this actions happens when you scrool back out of a specific sections or elemetn for the first time . scrolling up
        // value: "play", "resume", "reset", "restart", complete, "reverse", and "none"

        toggleActions: "play complete none none",
        // markers: true,
      },
    });

    tlService
      .from(".service-1 img", {
        duration: isMobile ? 0 : 1,
        opacity: isMobile ? 1 : 0,
        x: isMobile ? 0 : "-10%",
      })
      .from(
        ".service-1 h1",
        {
          duration: isMobile ? 0 : 1.5,
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : "20%",
        },
        "<"
      )
      .from(
        ".service-1 p",
        {
          duration: isMobile ? 0 : 1.5,
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : "20%",
        },
        "<"
      )
      .from(
        ".service-1-description button",
        {
          duration: isMobile ? 0 : 1.5,
          opacity: isMobile ? 1 : 0,
          scale: 0,
          ease: "bounce.out",
        },
        "<"
      );

    // service 2

    const tlService2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#service2",
        scroller: ".main-content",
        start: "center 55%",

        // the 4 states of toggle actions

        // onEnter - this actions happens when you scrool into specific sections or element for the first time. scroolling down
        // onLeave - this actions happens when you scrool out of a specific sections or element for the frist time. scrooling down
        // onEnterBack - this actions happens when you scrool back into a specific sections or element for the first time.  scrooling up
        // onLeaveBack - this actions happens when you scrool back out of a specific sections or elemetn for the first time . scrolling up
        // value: "play", "resume", "reset", "restart", complete, "reverse", and "none"

        toggleActions: "play complete none none",
        // markers: true,
      },
    });

    tlService2
      .from(".service-2 img", {
        duration: isMobile ? 0 : 1,
        opacity: isMobile ? 1 : 0,
        x: isMobile ? 0 : "10%",
      })
      .from(
        ".service-2 h1",
        {
          duration: isMobile ? 0 : 1.5,
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : "20%",
        },
        "<"
      )
      .from(
        ".service-2 p",
        {
          duration: isMobile ? 0 : 1.5,
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : "20%",
        },
        "<"
      )
      .from(
        ".service-2-description button",
        {
          duration: isMobile ? 0 : 1.5,
          opacity: isMobile ? 1 : 0,
          scale: 0,
          ease: "bounce.out",
        },
        "<"
      );

    // service 3

    const tlService3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#service3",
        scroller: ".main-content",
        start: "center 55%",

        // the 4 states of toggle actions

        // onEnter - this actions happens when you scrool into specific sections or element for the first time. scroolling down
        // onLeave - this actions happens when you scrool out of a specific sections or element for the frist time. scrooling down
        // onEnterBack - this actions happens when you scrool back into a specific sections or element for the first time.  scrooling up
        // onLeaveBack - this actions happens when you scrool back out of a specific sections or elemetn for the first time . scrolling up
        // value: "play", "resume", "reset", "restart", complete, "reverse", and "none"

        toggleActions: "play complete none none",
        // markers: true,
      },
    });

    tlService3
      .from(".service-3 img", {
        duration: isMobile ? 0 : 1,
        opacity: isMobile ? 1 : 0,
        x: "-10%",
      })
      .from(
        ".service-3 h1",
        {
          duration: isMobile ? 0 : 1.5,
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : "20%",
        },
        "<"
      )
      .from(
        ".service-3 p",
        {
          duration: isMobile ? 0 : 1.5,
          opacity: isMobile ? 1 : 0,
          y: isMobile ? 0 : "20%",
        },
        "<"
      )
      .from(
        ".service-3-description button",
        {
          duration: isMobile ? 0 : 1.5,
          opacity: isMobile ? 1 : 0,
          scale: 0,
          ease: "bounce.out",
        },
        "<"
      );

    // closing sections -----------------------------------------

    const textClosingTitle = new SplitType(".main-booking h1");

    gsap.set(".main-booking h1", { autoAlpha: 1 });

    const tlClosing = gsap.timeline({
      scrollTrigger: {
        trigger: "#booking",
        scroller: ".main-content",
        start: "center 65%",

        // the 4 states of toggle actions

        // onEnter - this actions happens when you scrool into specific sections or element for the first time. scroolling down
        // onLeave - this actions happens when you scrool out of a specific sections or element for the frist time. scrooling down
        // onEnterBack - this actions happens when you scrool back into a specific sections or element for the first time.  scrooling up
        // onLeaveBack - this actions happens when you scrool back out of a specific sections or elemetn for the first time . scrolling up
        // value: "play", "resume", "reset", "restart", complete, "reverse", and "none"

        toggleActions: "play complete restart reverse",
        // markers: true,
      },
    });

    tlClosing.from(textClosingTitle.chars, {
      y: isMobile ? 0 : 40,
      opacity: isMobile ? 1 : 0,
      skewX: isMobile ? 0 : 30,
      stagger: 0.03,
      duration: 1.5,
    });

    tlClosing.from(
      ".main-booking p",
      {
        y: isMobile ? 0 : 40,
        opacity: isMobile ? 1 : 0,
        duration: 1.5,
      },
      "<"
    );

    tlClosing.from(
      ".main-booking button",
      {
        scale: isMobile ? 1 : 0,
        ease: "bounce.out",
        duration: 1,
        delay: 0.5,
      },
      "<"
    );
  }
);
