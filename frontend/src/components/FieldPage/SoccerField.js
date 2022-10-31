import styles from './SoccerField.module.css';
import field from '../../assets/soccer_field.jpg';
function SoccerField() {
  return (
    <section>
      <img src={field} alt="field" className={styles.img_size} />
    </section>
  );
}
export default SoccerField;
