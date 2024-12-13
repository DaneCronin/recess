import styles from './style.module.css'
import { projects } from '../MouseScaleGallery/data';
import MouseScale from '../MouseScaleGallery/MouseScale';

export default function MouseScaleMain() {
  return (
    <main className={styles.main}>
      <h1>We use design and technology to create brands and products that perform, delight, and scale.</h1>
      <div className={styles.gallery}>
        <MouseScale projects={[projects[0], projects[1]]}/>
        <MouseScale  projects={[projects[4], projects[5]]} reversed={true}/>
        <MouseScale  projects={[projects[2], projects[3]]} />
      </div>
    </main>
  )
}