gsap.registerPlugin(ScrollTrigger);

// lenis scrool basic setup -------------------------------------------

const lenis = new Lenis();

lenis.on('scroll', (e) => {
  console.log(e);
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// navbar burger toggle mobile version -------------------------------------------

const menuBurger = document.querySelector('.burger');

let menuStatus = false;

const menuTL = gsap.timeline({
  default: { duration: 0.5, ease: 'power4.inOut' },
});

menuTL.to('.menu-navbar', {
  scaleY: 1,
  stagger: 0.5,
});

menuTL.to('.line1', { rotateZ: '35deg' }, '<');
menuTL.to('.line3', { rotateZ: '-35deg', y: '-10px' }, '<');
menuTL.to('.line2', { opacity: 0, onComplete: fadeIn }, '<');

function fadeIn() {
  menuTL.to('.menu-navbar li', { opacity: 1, duration: 0.5 });
}

menuTL.paused(true);

menuBurger.addEventListener('click', () => {
  if (!menuStatus) {
    menuTL.play();
    menuStatus = true;
  } else {
    menuTL.reverse();
    menuStatus = false;
  }
});

// matchmedia responsive --------------------------------------------------

const matchMediaResponsive = gsap.matchMedia();

matchMediaResponsive.add(
  {
    isDesktop: '(min-width: 1025px)',
    isMobile: '(max-width: 1024px)',
  },
  (context) => {
    console.log(context.conditions);
    const { isDesktop, isMobile } = context.conditions;

    // navbar closed ---------------------------------------------------------------

    const showAnim = gsap
      .from('nav', {
        yPercent: -100,
        paused: true,
        duration: 0.2,
      })
      .progress(1);

    ScrollTrigger.create({
      start: 'top top',
      end: 99999,
      onUpdate: (self) => {
        self.direction === -1 ? showAnim.play() : showAnim.reverse();
      },
    });

    // home opening animation ---------------------------------------------------------------

    // scene 1 ----------------------------------------------------

    const textPembuka = new SplitType('.title-animation-1 h1');
    const textPembuka2 = new SplitType('.title-animation-2 h1');

    const tl = gsap.timeline({
      defaults: { duration: 0.75, ease: 'power4.inOut' },
    });

    gsap.set('.title-animation-1 h1', { autoAlpha: 1 });
    gsap.set('.title-animation-2 h1', { autoAlpha: 1 });

    tl.to(['#motto', '#service', '#booking'], {
      display: isMobile ? 'block' : 'none',
    });

    if (isDesktop) {
      tl.from(
        textPembuka.chars,
        {
          y: 40,
          opacity: 0,
          skewX: 30,
          stagger: 0.03,
          duration: 1.5,
        },
        '<'
      );

      tl.to(textPembuka.chars, {
        y: -40,
        opacity: 0,
        skewX: -10,
        stagger: 0.03,
        duration: 0.5,
      });

      tl.to('.title-animation-2 h1', { display: 'block' });

      tl.from(textPembuka2.chars, {
        y: 40,
        opacity: 0,
        skewX: 30,
        stagger: 0.03,
        duration: 1.5,
      }).to(textPembuka2.chars, {
        y: -40,
        opacity: 0,
        skewX: -10,
        stagger: 0.03,
        duration: 0.5,
      });

      tl.to('.title-animation-3 h1', { display: 'block' });

      tl.to('.title-animation-3 h1', {
        opacity: 1,
        duration: 1,
      }).to('.title-animation-3 h1', {
        opacity: 0,
        duration: 1,
      });
    } else {
      gsap.set(
        ['.title-animation-1', '.title-animation-2', '.title-animation-3'],
        { display: 'none' }
      );
    }

    // scene 2 ----------------------------------------------------

    if (isDesktop) {
      tl.to(
        '.background-video',
        {
          scaleX: 1,
          delay: 1,
          duration: 1,
        },
        '-=.2'
      )
        .to(
          '.background-video',
          {
            height: '100vh',
            bottom: 0,
            top: 0,
            delay: 1,
            duration: 1,
          },
          '-=.5'
        )
        .to('.background-video', { border: 'none' }, '-=.5');

      tl.to(
        '.main-title-mask h2',
        {
          x: isMobile ? 1 : 0,
          opacity: 1,
          duration: 1.5,
        },
        '<'
      ).to(
        '.sub-title-mask h3',
        { y: isMobile ? 1 : 0, opacity: 1, duration: 1.5 },
        '<'
      );

      tl.to(
        '.main-title-mask h2',
        { scale: isMobile ? 1 : 0.9, transformOrigin: 'center' },
        '-=.5'
      );
      tl.to(
        '.sub-title-mask h3',
        { scale: isMobile ? 1 : 0.9, transformOrigin: 'center' },
        '<'
      );
      tl.to('.main-home button', { scaleY: 1, duration: 0.5 }, '-=.9');
      tl.from(
        '.logo-navbar',
        {
          x: isMobile ? 0 : '-100%',
          opacity: isMobile ? 1 : 0.5,
          duration: 0.5,
        },
        '-=.7'
      );
      tl.to('.menu-navbar', { y: 0 }, '-=.7');
      tl.to('.fade-container', { display: 'none' }, '-=.7');

      tl.to(['#motto', '#service', '#booking'], { display: 'block' });
    } else {
      gsap.set('.background-video', {
        height: '100vh',
        top: 0,
        bottom: 0,
        scaleX: 1,
      });
      gsap.set('.main-home h2', {
        x: 0,
        transformOrigin: 'left',
        opacity: 1,
      });
      gsap.set('.main-home h3', {
        y: 0,
        opacity: 1,
      });
      gsap.set('.main-home button ', {
        scaleY: 1,
      });
    }

    // Description sections -----------------------------------------

    const mainTextMottoSections = new SplitType('.highlight');
    const mainText2MottoSections = new SplitType('.highlight1');
    const paragraphMottoSections = new SplitType('.motto-container p');

    const tlMottoSections = gsap.timeline({
      scrollTrigger: {
        trigger: '#motto',
        start: '0%',
        end: '10%',
        // markers: true,
      },
      default: { ease: 'power3.out', duration: 1 },
    });

    gsap.set('.highlight', { autoAlpha: 1 });
    gsap.set('.highlight1', { autoAlpha: 1 });
    gsap.set('.motto-container p', { autoAlpha: 1 });

    tlMottoSections.from(mainTextMottoSections.chars, {
      y: isMobile ? 0 : 40,
      opacity: isMobile ? 1 : 0,
      skewX: isMobile ? 0 : 30,
      stagger: 0.03,
      duration: 0.8,
    });

    tlMottoSections.from(
      mainText2MottoSections.chars,
      {
        y: isMobile ? 0 : 40,
        opacity: isMobile ? 1 : 0,
        skewX: isMobile ? 0 : 30,
        stagger: 0.03,
        duration: 0.9,
      },
      '-=.8'
    );

    tlMottoSections.from(
      paragraphMottoSections.lines,
      {
        y: isMobile ? 0 : 40,
        opacity: isMobile ? 1 : 0,
        skewX: isMobile ? 0 : 30,
        stagger: 0.03,
        duration: 0.4,
      },
      '-=.8'
    );

    // service sections -----------------------------------------

    const imgServiceSections = gsap.utils.toArray('#service img');
    const mainTitleServiceSections = gsap.utils.toArray('#service h1');
    const paragraphServiceSections = gsap.utils.toArray('#service p');
    const buttonServiceSections = gsap.utils.toArray('#service button');

    // main title

    imgServiceSections.forEach((img) => {
      const tlService = gsap.timeline({
        scrollTrigger: {
          trigger: img,
          start: '-50%',
          end: 'bottom center',

          // the 4 states of toggle actions

          // onEnter - this actions happens when you scrool into specific sections or element for the first time. scroolling down
          // onLeave - this actions happens when you scrool out of a specific sections or element for the frist time. scrooling down
          // onEnterBack - this actions happens when you scrool back into a specific sections or element for the first time.  scrooling up
          // onLeaveBack - this actions happens when you scrool back out of a specific sections or elemetn for the first time . scrolling up
          // value: "play", "resume", "reset", "restart", complete, "reverse", and "none"

          // toggleActions: 'play play none reverse',
          // markers: true,
        },
      });

      tlService.from(img, {
        duration: isMobile ? 0 : 1,
        x: isMobile ? 0 : '-50',
        opacity: isMobile ? 1 : 0,
        stagger: 0.005,
        ease: 'power2.out',
      });
    });

    // main title

    mainTitleServiceSections.forEach((text) => {
      const splitType = new SplitType(text);

      const tlService = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: '-300%',
          end: 'bottom center',

          // the 4 states of toggle actions

          // onEnter - this actions happens when you scrool into specific sections or element for the first time. scroolling down
          // onLeave - this actions happens when you scrool out of a specific sections or element for the frist time. scrooling down
          // onEnterBack - this actions happens when you scrool back into a specific sections or element for the first time.  scrooling up
          // onLeaveBack - this actions happens when you scrool back out of a specific sections or elemetn for the first time . scrolling up
          // value: "play", "resume", "reset", "restart", complete, "reverse", and "none"

          // toggleActions: 'play play none reverse',
          // markers: true,
        },
      });

      tlService.from(splitType.chars, {
        duration: 1,
        y: isMobile ? 0 : 50,
        opacity: isMobile ? 1 : 0,
        stagger: 0.005,
        ease: 'power2.out',
      });
    });

    // paragraph title

    paragraphServiceSections.forEach((text) => {
      const splitType = new SplitType(text);

      const tlService = gsap.timeline({
        scrollTrigger: {
          trigger: text,
          start: '-220%',
          end: 'bottom center',

          // the 4 states of toggle actions

          // onEnter - this actions happens when you scrool into specific sections or element for the first time. scroolling down
          // onLeave - this actions happens when you scrool out of a specific sections or element for the frist time. scrooling down
          // onEnterBack - this actions happens when you scrool back into a specific sections or element for the first time.  scrooling up
          // onLeaveBack - this actions happens when you scrool back out of a specific sections or elemetn for the first time . scrolling up
          // value: "play", "resume", "reset", "restart", complete, "reverse", and "none"

          // toggleActions: 'play play none reverse',
          // markers: true,
        },
      });

      tlService.from(splitType.chars, {
        duration: 1,
        y: isMobile ? 0 : 50,
        opacity: isMobile ? 1 : 0,
        stagger: 0.005,
        ease: 'power2.out',
      });
    });

    // button

    buttonServiceSections.forEach((button) => {
      const tlService = gsap.timeline({
        scrollTrigger: {
          trigger: button,
          start: '-1000%',
          end: 'bottom center',

          // the 4 states of toggle actions

          // onEnter - this actions happens when you scrool into specific sections or element for the first time. scroolling down
          // onLeave - this actions happens when you scrool out of a specific sections or element for the frist time. scrooling down
          // onEnterBack - this actions happens when you scrool back into a specific sections or element for the first time.  scrooling up
          // onLeaveBack - this actions happens when you scrool back out of a specific sections or elemetn for the first time . scrolling up
          // value: "play", "resume", "reset", "restart", complete, "reverse", and "none"

          // toggleActions: 'play play none reverse',
          // markers: true,
        },
      });

      tlService.from(button, {
        duration: 0.5,
        scaleX: isMobile ? 1 : 0,
        opacity: isMobile ? 1 : 0.5,
        ease: 'power2.out',
      });
    });
  }
);
