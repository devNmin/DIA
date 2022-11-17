import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Record.module.css';

function Record({ gameId, gameYear, gameMonth, gameDay, gameTime }) {
  return (
    <div>
      <div class="col-md-4">
        <div class="card-flip">
          <div class="frontCard invCard">
            <div class="card-container">
              <i class="fa fa-tachometer"></i>
              <h2 class="textshadow">See Our Vehicles</h2>
              <h3 class="textshadow">
                View our online showroom. City's finest pre-owned vehicles.
              </h3>
            </div>
          </div>

          <div class="backCard invCard2">
            <div class="card-container2">
              <a
                class="boxshadow flip-button"
                href="/newandusedcars.aspx?clearall=1"
              >
                View Inventory
              </a>
            </div>
          </div>
        </div>
      </div>

      <img
        src="https://www.phinational.org/wp-content/uploads/2017/07/fb-test-image-470x246.jpg"
        alt={'test'}
        className={styles.record__img}
      />
      <Link to={`/detail/${gameId}`}>
        <div>
          <h2 className={styles.record__title}>
            <p>{gameId}</p>
            <p>{gameYear}</p>
            <p>{gameMonth}</p>
            <p>{gameDay}</p>
            <p>{gameTime}</p>
          </h2>
        </div>
      </Link>
    </div>
  );
}

export default Record;
