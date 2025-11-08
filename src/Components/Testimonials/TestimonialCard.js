import React, { useEffect, useRef } from 'react';
import styles from './Testimonials.module.css';

const TestimonialCard = ({ testimonial, index }) => {
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <div 
      ref={cardRef}
      className={styles.testimonialCard}
      style={{
        opacity: 0,
        transform: 'translateY(50px)',
        transitionDelay: `${index * 0.15}s`
      }}
    >
      <div className="d-flex align-items-center mb-4">
        <img 
          src={testimonial.image} 
          alt={testimonial.name} 
          className={styles.clientImage}
        />
        <div className="ms-3">
          <h4 className={styles.clientName}>{testimonial.name}</h4>
          <p className={styles.clientRole}>{testimonial.role}</p>
        </div>
      </div>
      <p className={styles.testimonialText}>{testimonial.message}</p>
      <div className="mt-3">
        {[...Array(testimonial.rating)].map((_, i) => (
          <span key={i} className="text-warning">★</span>
        ))}
      </div>
    </div>
  );
};

export default TestimonialCard;