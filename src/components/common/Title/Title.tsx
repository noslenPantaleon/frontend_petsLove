import { FC } from 'react';
import { motion } from 'framer-motion';
import styles from './title.module.scss';

interface Props {
  text: string;
}

const Title: FC<Props> = ({ text }) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ ease: 'easeOut', delay: 0.8 }}
    >
      <div className={styles.title}>{text}</div>
    </motion.div>
  );
};

export default Title;