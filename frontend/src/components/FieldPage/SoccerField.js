import styles from './SoccerField.module.css';
import field from '../../assets/field.jpg';

function SoccerField() {
  return (
    <section className={styles.section}>
      <div className={styles.pitch}>
        <img src={field} className={styles.field_img} />
      </div>
    </section>
  );
}
export default SoccerField;
