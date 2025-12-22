import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

const ScrollToTop: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.pageYOffset > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);

        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <>
            {isVisible && (
                <button
                    onClick={scrollToTop}
                    className="scroll-to-top-btn"
                    aria-label="Nach oben scrollen"
                    title="Nach oben"
                >
                    <ArrowUp size={24} />
                </button>
            )}
            <style>{`
                .scroll-to-top-btn {
                    position: fixed;
                    bottom: 2rem;
                    left: 2rem;
                    z-index: 1000;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #EBD297 0%, #d4b56a 100%);
                    border: 2px solid #EBD297;
                    color: #000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(235, 210, 151, 0.4);
                    animation: fadeIn 0.3s ease-in-out;
                }

                .scroll-to-top-btn:hover {
                    background: linear-gradient(135deg, #fcebbb 0%, #EBD297 100%);
                    transform: translateY(-3px);
                    box-shadow: 0 6px 20px rgba(235, 210, 151, 0.6);
                }

                .scroll-to-top-btn:active {
                    transform: translateY(-1px);
                }

                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @media (max-width: 768px) {
                    .scroll-to-top-btn {
                        bottom: 1.5rem;
                        left: 1.5rem;
                        width: 45px;
                        height: 45px;
                    }
                }
            `}</style>
        </>
    );
};

export default ScrollToTop;
