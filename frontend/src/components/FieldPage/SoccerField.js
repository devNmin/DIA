import styles from './SoccerField.module.css';
import field_img from '../../assets/field_img.jpeg';
function SoccerField() {
  return (
    <section className={styles.section}>
      <img src={field_img} className={styles.pitch} />
    </section>
  );
}
export default SoccerField;
