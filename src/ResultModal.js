import React from 'react';
import { motion } from 'framer-motion';
import './ResultModal.css';

const ResultModal = ({ isOpen, toggle, result }) => {
    const modalAnimation = {
        initial: { opacity: 0, scale: 0.5 },
        animate: { opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.5 },
        transition: { duration: 0.2 },
    };

    const handleContainerClick = (e) => {
        if (e.target === e.currentTarget) {
            toggle();
        }
    };

    return (
        <motion.div className="animated-modal-container" onClick={handleContainerClick} variants={modalAnimation} initial="initial" animate="animate">
            <motion.div className="animated-modal" variants={modalAnimation}>
                <div className="modal-header">
                    <button type="button" className="close" onClick={handleContainerClick}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    {result && (
                        <>
                            <p>ID: {result.id}</p>
                            <p>URL: {result.url}</p>
                            <p>Result: {JSON.stringify(result.result)}</p>
                        </>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ResultModal;