import { useEffect } from 'react';
import React, { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from '../../utils/gsapConfig';
import styles from './ClientLogos.module.css';
// NOTE: replace these import paths with your actual assets
import bhhs from '../../assets/ClientLogos/bhhs.png';
import century from '../../assets/ClientLogos/century.png';
import coldwell from '../../assets/ClientLogos/coldwell.png';
import compass from '../../assets/ClientLogos/compass.png';
import exp from '../../assets/ClientLogos/exp.png';
import pacific from '../../assets/ClientLogos/pacific.png';
import reimax from '../../assets/ClientLogos/reimax.png';
import towne from '../../assets/ClientLogos/towne.png';
import whissel from '../../assets/ClientLogos/whissel.png';
import willis from '../../assets/ClientLogos/willis.png';
// Add your building PNG here
import buildingSrc from '../../assets/images/building.png';

// GSAP plugins are now registered in App.js, so we don't need to register here again

const ClientLogos = () => {
  const logos = [
    { src: bhhs , alt: 'BHHS', accentColor: '#004B93' },
    { src: century, alt: 'Century', accentColor: '#FF6B6B' },
    { src: coldwell, alt: 'Coldwell', accentColor: '#00A86B' },
    { src: compass, alt: 'Compass', accentColor: '#7C4DFF' },
    { src: exp, alt: 'EXP', accentColor: '#FF8A00' },
    { src: pacific, alt: 'Pacific', accentColor: '#00AEEF' },
    { src: reimax, alt: 'Re/Max', accentColor: '#E11D48' },
    { src: towne, alt: 'Towne', accentColor: '#0EA5A4' },
    { src: whissel, alt: 'Whissel', accentColor: '#F59E0B' },
    { src: willis, alt: 'Willis', accentColor: '#3B82F6' },
  ];

  // Duplicate logos for seamless marquee
  const dup = [...logos, ...logos, ...logos]; // tripled

  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const logoNodes = useRef([]);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buildingRef = useRef(null);
  const sectionRef = useRef(null);

  // helper to register hover animations per node
  const registerHover = (node, color) => {
    if (!node) return;
    const hoverIn = () =>
      gsap.to(node, {
        scale: 1.22,
        y: -14,
        boxShadow: `0 20px 36px ${color}44`,
        duration: 0.45,
        ease: 'power3.out',
      });
    const hoverOut = () =>
      gsap.to(node, {
        scale: 1,
        y: 0,
        boxShadow: '0 8px 16px rgba(0,0,0,0.16)',
        duration: 0.55,
        ease: 'power3.out',
      });
    node.addEventListener('mouseenter', hoverIn);
    node.addEventListener('mouseleave', hoverOut);
    // cleanup
    return () => {
      node.removeEventListener('mouseenter', hoverIn);
      node.removeEventListener('mouseleave', hoverOut);
    };
  };

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const wrapper = wrapperRef.current;
    const track = trackRef.current;
    if (!wrapper || !track || !section) return;

    // make sure logos are visible and measure width
    gsap.set(track, { x: 0 });
    const getTrackWidth = () => track.scrollWidth / 3;
    let trackWidth = getTrackWidth();

    // Main infinite marquee timeline (slowed down)
    const marqueeTl = gsap.timeline({ repeat: -1, defaults: { ease: 'none' } });
    const speed = Math.max(38, Math.round(trackWidth / 70)); // slower
    marqueeTl.to(track, { x: () => `-=${trackWidth}`, duration: speed, ease: 'linear' });
    marqueeTl.to(track, { x: 0, duration: 0 });

    // Pause marquee on hover of the whole wrapper
    const onEnter = () => marqueeTl.pause();
    const onLeave = () => marqueeTl.play();
    wrapper.addEventListener('mouseenter', onEnter);
    wrapper.addEventListener('mouseleave', onLeave);

    // small gentle vertical float (more prominent)
    const floatTl = gsap.timeline({ repeat: -1, yoyo: true });
    floatTl.to(logoNodes.current, {
      y: '+=14',
      duration: 3.5,
      stagger: 0.1,
      ease: 'sine.inOut',
    });

    // Scroll-triggered reveal for decorative rings
    const ctx = gsap.context(() => {
      // Add null check for the ring element
      const ringElement = document.querySelector(`.${styles.ring}`);
      if (ringElement) {
        gsap.to(ringElement, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        });
      }
    }, wrapper);

    // TITLE: animation from right side
    const title = titleRef.current;
    if (title) {
      gsap.set(title, { autoAlpha: 0, x: 100 });
      gsap.to(title, {
        x: 0,
        autoAlpha: 1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 80%',
          end: 'top 40%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }

    // SUBTITLE: animation from right side
    const subtitle = subtitleRef.current;
    if (subtitle) {
      gsap.set(subtitle, { autoAlpha: 0, x: 100 });
      gsap.to(subtitle, {
        x: 0,
        autoAlpha: 1,
        duration: 0.7,
        delay: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 80%',
          end: 'top 40%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }

    // BUILDING IMAGE animation - show on mobile too
    const buildingNode = buildingRef.current;
    if (buildingNode) {
      gsap.set(buildingNode, { scale: 0.8, autoAlpha: 0, x: 100 });
      gsap.to(buildingNode, {
        scale: 1,
        autoAlpha: 1,
        x: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top 85%',
          end: 'top 50%',
          toggleActions: 'play reverse play reverse',
        },
      });
    }

    // keep widths reactive
    const handleResize = () => {
      trackWidth = getTrackWidth();
      marqueeTl.clear();
      const newSpeed = Math.max(38, Math.round(trackWidth / 70));
      marqueeTl.to(track, { x: () => `-=${trackWidth}`, duration: newSpeed, ease: 'linear' });
      marqueeTl.to(track, { x: 0, duration: 0 });
    };
    window.addEventListener('resize', handleResize);

    // register hover handlers
    const unsubHover = [];
    logoNodes.current.forEach((n, i) => {
      if (n) {
        unsubHover.push(registerHover(n, logos[i % logos.length].accentColor || '#000000'));
      }
    });

    // cleanup
    return () => {
      marqueeTl.kill();
      floatTl.kill();
      ctx.revert();
      ScrollTrigger.getAll().forEach(st => st.kill());
      window.removeEventListener('resize', handleResize);
      wrapper.removeEventListener('mouseenter', onEnter);
      wrapper.removeEventListener('mouseleave', onLeave);
      unsubHover.forEach(u => u && u());
    };
  }, [logos]);

  return (
    <section ref={sectionRef} className={styles.section} aria-label="Trusted clients">
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title} ref={titleRef}>
            Trusted by Industry Leaders
          </h2>
          <p className={styles.subtitle} ref={subtitleRef}>
            Join 1,000+ brands that trust our product
          </p>
        </div>

        <div className={styles.ring} aria-hidden></div>
        <div className={styles.ring2} aria-hidden></div>

        <img
          ref={buildingRef}
          src={buildingSrc}
          alt="Building decorative"
          className={styles.buildingImg}
          loading="lazy"
          aria-hidden="true"
        />

        <div className={styles.marqueeContainer} ref={wrapperRef}>
          <div className={styles.marqueeTrack} ref={trackRef}>
            {dup.map((logo, idx) => (
              <div
                key={`${logo.alt}-${idx}`}
                className={styles.logoCard}
                ref={el => (logoNodes.current[idx] = el)}
                tabIndex={0}
                role="img"
                aria-label={logo.alt}
              >
                <div
                  className={styles.logoBg}
                  style={{ background: `${logo.accentColor}10` }}
                />
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className={styles.logoImg}
                  loading="lazy"
                  width={160}
                  height={80}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogos;