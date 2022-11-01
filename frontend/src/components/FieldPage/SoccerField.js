import styles from './SoccerField.module.css';
// import field from '../../assets/soccer_field.jpg';
function SoccerField() {
  return (
    <section>
      <div className={styles.pitch}>
        <div className={`${styles.field} ${styles.left}`}>
          <div className={styles.penalty_area}></div>
        </div>
        <div className={`${styles.field} ${styles.right}`}>
          <div className={styles.penalty_area}></div>
        </div>
        <div className={styles.center_circle}></div>
      </div>
    </section>
  );
}
export default SoccerField;
