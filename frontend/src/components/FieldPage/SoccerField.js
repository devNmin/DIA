import styles from './SoccerField.module.css';
import field1 from '../../assets/field2.jpg';

function SoccerField() {
  return (
    <section className={styles.section}>
      <div className={styles.pitch}>
        <img src={field1} className={styles.field_img} />
      </div>
    </section>
  );
}
export default SoccerField;
