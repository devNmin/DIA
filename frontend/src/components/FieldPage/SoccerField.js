import styles from './SoccerField.module.css';
import field_img from '../../assets/field_img.jpeg';
function SoccerField() {
  return (
    <section className={styles.section}>
      <div className={styles.pitch}>
        <img src={field_img} className={styles.field_img} />
        <div className={styles.field_img}></div>
      </div>
    </section>
  );
}
export default SoccerField;
