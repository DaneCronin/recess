import React, { Suspense, lazy } from 'react';
import styles from './styles.module.css'; // Adjust the path to your CSS file

const Scene = lazy(() => import('../components/Scene/Index')); // Adjust the path as needed

function WebDesign() {
  return (
    <main className={styles.main}>
      <Suspense fallback={<div>Loading...</div>}>
        <Scene />
      </Suspense>
    </main>
  );
}

export default WebDesign;
